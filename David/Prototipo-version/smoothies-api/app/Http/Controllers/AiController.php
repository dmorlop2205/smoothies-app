<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\EmbeddingService;
use App\Http\Resources\PostResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiController extends Controller
{
    public function __construct(
        protected EmbeddingService $embeddingService
    ) {
    }
    /**
     * Generate a smoothie recipe using Ollama AI.
     * Enriches the prompt with the user's latest and liked posts for context.
     */
    public function generateSmoothie(Request $request): JsonResponse
    {
        $request->validate([
            'prompt' => 'required|string|max:500',
        ]);

        $user = $request->user();
        $userPrompt = $request->input('prompt');

        // ── Gather context from user's history ──

        // Latest posts by the user (last 5)
        $latestPosts = $user->posts()
            ->with('ingredients', 'tags')
            ->latest()
            ->take(3)
            ->get()
            ->map(fn(Post $p) => [
                'title' => $p->title,
                'description' => $p->description,
                'ingredients' => $p->ingredients->pluck('name')->toArray(),
                'tags' => $p->tags->pluck('name')->toArray(),
            ]);

        // Posts the user has liked (last 5)
        $likedPosts = $user->likedPosts()
            ->with('ingredients', 'tags')
            ->latest('likes.created_at')
            ->take(3)
            ->get()
            ->map(fn(Post $p) => [
                'title' => $p->title,
                'description' => $p->description,
                'ingredients' => $p->ingredients->pluck('name')->toArray(),
                'tags' => $p->tags->pluck('name')->toArray(),
            ]);

        // ── Build the system prompt ──
        $systemPrompt = <<<EOT
# Role
You are a specialized smoothie recipe generator. 

# Task
Create a complete smoothie recipe based on the user's prompt. 

# Formatting Rules
- You MUST output VALID JSON.
- DO NOT include comments or extra text.
- 'ingredients' MUST be an array of objects with "name" and "amount".
- 'preparation_steps' MUST be a simple array of strings.
- 'tags' MUST be a simple array of single-word strings.

# Content Rules
- 'name': Creative name for the smoothie.
- 'description': Appetizing description (2 sentences).
- 'category': Must be one of: green, tropical, berry, protein, detox, dessert.
EOT;

        // Add user context if available
        if ($latestPosts->isNotEmpty()) {
            $systemPrompt .= "\n\nUser History (Latest): " . json_encode($latestPosts->toArray());
        }

        if ($likedPosts->isNotEmpty()) {
            $systemPrompt .= "\n\nUser Favorites: " . json_encode($likedPosts->toArray());
        }

        // ── Call Ollama ──
        $ollamaHost = env('OLLAMA_HOST', 'http://ollama:11434');

        try {
            $response = Http::connectTimeout(10)->timeout(120)->post("{$ollamaHost}/api/generate", [
                'model' => 'llama3.2:1b',
                'system' => $systemPrompt,
                'prompt' => $userPrompt,
                'format' => [
                    'type' => 'object',
                    'properties' => [
                        'name' => ['type' => 'string'],
                        'description' => ['type' => 'string'],
                        'ingredients' => [
                            'type' => 'array',
                            'items' => [
                                'type' => 'object',
                                'properties' => [
                                    'name' => ['type' => 'string'],
                                    'amount' => ['type' => 'string'],
                                ],
                                'required' => ['name', 'amount'],
                            ],
                        ],
                        'tags' => ['type' => 'array', 'items' => ['type' => 'string']],
                        'category' => ['type' => 'string'],
                        'preparation_steps' => ['type' => 'array', 'items' => ['type' => 'string']],
                    ],
                    'required' => ['name', 'description', 'ingredients', 'tags', 'category', 'preparation_steps'],
                ],
                'stream' => false,
                'options' => [
                    'num_ctx' => 2048,
                    'temperature' => 0.2, // Lower temperature for more stable JSON
                    'num_predict' => 600,
                ],
            ]);

            if (!$response->successful()) {
                return response()->json([
                    'error' => 'AI service returned an error: ' . $response->body(),
                ], 502);
            }

            $recipe = json_decode($response->json('response'), true);

            if (!$recipe || !isset($recipe['name'])) {
                return response()->json([
                    'error' => 'AI returned an invalid response. Please try again.',
                ], 500);
            }

            // Ensure preparation_steps is an array for consistency
            if (isset($recipe['preparation_steps']) && is_string($recipe['preparation_steps'])) {
                $recipe['preparation_steps'] = explode('. ', $recipe['preparation_steps']);
            }

            // Fallback: Strip out hallucinated ingredients if the 1B model gets confused
            if (isset($recipe['ingredients']) && is_array($recipe['ingredients'])) {
                $badWords = ['preparation steps', 'category', 'tags', 'creative smoothie', 'ingredient name'];
                $recipe['ingredients'] = array_values(array_filter($recipe['ingredients'], function ($ing) use ($badWords) {
                    $name = strtolower($ing['name'] ?? '');
                    foreach ($badWords as $bw) {
                        if (str_contains($name, $bw))
                            return false;
                    }
                    return true;
                }));
            }

            return response()->json($recipe);
        } catch (\Illuminate\Http\Client\ConnectionException $e) {
            return response()->json([
                'error' => 'Could not connect to AI service. Make sure Ollama is running. (' . $e->getMessage() . ')',
            ], 503);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate smoothie: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * AI Sommelier: Matches a user's mood to 3 existing smoothies.
     */
    public function sommelier(Request $request): JsonResponse
    {
        $request->validate([
            'mood' => 'required|string|max:500',
        ]);

        $mood = $request->input('mood');

        // 1. Hybrid Search: Keyword Search + Vector Search

        // A. Keyword Search (for specific ingredients or terms)
        $keywords = explode(' ', strtolower($mood));
        $keywordResults = Post::query()
            ->with('tags')
            ->where(function ($q) use ($mood, $keywords) {
                $q->where('title', 'ILIKE', "%$mood%")
                    ->orWhere('description', 'ILIKE', "%$mood%")
                    ->orWhereHas('ingredients', fn($iq) => $iq->where('name', 'ILIKE', "%$mood%"))
                    ->orWhereHas('tags', fn($tq) => $tq->where('name', 'ILIKE', "%$mood%"));

                foreach ($keywords as $word) {
                    if (strlen($word) >= 3) {
                        $q->orWhere('title', 'ILIKE', "%$word%")
                            ->orWhereHas('ingredients', fn($iq) => $iq->where('name', 'ILIKE', "%$word%"));
                    }
                }
            })
            ->take(6)
            ->get();

        // B. Vector Search
        $moodEmbedding = $this->embeddingService->generateEmbedding($mood);
        $vectorResults = collect();
        if ($moodEmbedding) {
            $vectorResults = Post::query()
                ->select(['id', 'title', 'description', 'embedding'])
                ->with('tags')
                ->selectRaw('embedding <=> ? AS distance', [json_encode($moodEmbedding)])
                ->orderBy('distance', 'asc')
                ->take(10)
                ->get();
        }

        // C. Merge and Prioritize
        $inventory = $keywordResults->merge($vectorResults)
            ->unique('id')
            ->take(10)
            ->map(fn(Post $p) => [
                'id' => $p->id,
                'title' => $p->title,
                'description' => $p->description,
                'tags' => $p->tags->pluck('name')->toArray(),
            ]);

        if ($inventory->isEmpty()) {
            return response()->json(['error' => 'No smoothies available in inventory.'], 404);
        }

        $systemPrompt = <<<EOT
# Role
You are the BlendUs AI Sommelier. Match the user's mood with the perfect smoothies.

# Instructions
1. Select EXACTLY 3-4 smoothies from the provided list.
2. Be extremely concise. Write a VERY short explanation (max 2 sentences).
3. If the user mentions a specific ingredient (e.g. "kiwi"), PRIORITIZE smoothies containing it.

# Output Format
JSON ONLY:
{
  "explanation": "Short friendly message...",
  "recommended_ids": [ids]
}
EOT;

        $userPrompt = "Mood: {$mood}\nInventory: " . json_encode($inventory->toArray());
        $ollamaHost = env('OLLAMA_HOST', 'http://ollama:11434');

        try {
            $response = Http::connectTimeout(5)->timeout(60)->post("{$ollamaHost}/api/generate", [
                'model' => 'llama3.2:1b',
                'system' => $systemPrompt,
                'prompt' => $userPrompt,
                'format' => [
                    'type' => 'object',
                    'properties' => [
                        'explanation' => ['type' => 'string'],
                        'recommended_ids' => [
                            'type' => 'array',
                            'items' => ['type' => 'integer']
                        ],
                    ],
                    'required' => ['explanation', 'recommended_ids'],
                ],
                'stream' => false,
                'options' => [
                    'num_ctx' => 2048,
                    'temperature' => 0.4,
                    'num_predict' => 256
                ],
            ]);

            if (!$response->successful()) {
                return response()->json(['error' => 'AI service error.'], 502);
            }

            $aiResult = json_decode($response->json('response'), true);

            if (!$aiResult || !isset($aiResult['recommended_ids'])) {
                return response()->json(['error' => 'Invalid AI response format.'], 500);
            }

            // Fetch the full post objects with all relations needed for the frontend PostCards
            $userId = auth('sanctum')->id();
            $posts = Post::with(['user', 'ingredients', 'tags'])
                ->withCount(['likes', 'comments'])
                ->when($userId, fn($q) => $q->with([
                    'likes' => fn($lq) => $lq->where('user_id', $userId),
                    'savedBy' => fn($sq) => $sq->where('user_id', $userId),
                ]))
                ->whereIn('id', $aiResult['recommended_ids'])
                ->get();

            // Order posts exactly as the AI suggested
            $sortedPosts = $posts->sortBy(function ($post) use ($aiResult) {
                return array_search($post->id, $aiResult['recommended_ids']);
            })->values();

            return response()->json([
                'explanation' => $aiResult['explanation'],
                'posts' => PostResource::collection($sortedPosts),
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to reach AI Sommelier: ' . $e->getMessage()], 500);
        }
    }

    /**
     * AI Cooking Assistant: Extract structured steps from a raw recipe.
     */
    public function extractSteps(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'ingredients' => 'required|array',
            'preparation_steps' => 'required|string',
        ]);

        $title = $request->input('title');
        $ingredients = json_encode($request->input('ingredients'));
        $prep = $request->input('preparation_steps');

        $systemPrompt = <<<EOT
# Role
You are an expert AI Cooking Assistant for the BlendUs app.

# Instructions
1. You will receive the raw 'preparation_steps' and 'ingredients' of a smoothie named "{$title}".
2. Break the preparation down into a logical, sequential array of distinct cooking steps. 
3. For EACH step, you MUST invent a creative, helpful tip about doing that step.
4. You MUST base your steps ONLY on the provided Ingredients and Raw Instructions. DO NOT hallucinate or copy placeholder text.
5. Do NOT include step numbers at the beginning of the text.

# Fields to Generate
- steps: An array of objects.
  - instruction: The actual cooking step.
  - tip: A useful tip starting with "💡 Tip: ".
EOT;

        $userPrompt = "Ingredients: {$ingredients}\nRaw Instructions: {$prep}";
        $ollamaHost = env('OLLAMA_HOST', 'http://ollama:11434');

        try {
            $response = Http::connectTimeout(10)->timeout(120)->post("{$ollamaHost}/api/generate", [
                'model' => 'llama3.2:1b',
                'system' => $systemPrompt,
                'prompt' => $userPrompt,
                'format' => [
                    'type' => 'object',
                    'properties' => [
                        'steps' => [
                            'type' => 'array',
                            'items' => [
                                'type' => 'object',
                                'properties' => [
                                    'instruction' => ['type' => 'string'],
                                    'tip' => ['type' => 'string']
                                ],
                                'required' => ['instruction', 'tip']
                            ]
                        ],
                    ],
                    'required' => ['steps'],
                ],
                'stream' => false,
                'options' => ['num_ctx' => 2048],
            ]);

            return response()->json(json_decode($response->json('response'), true));
        } catch (\Exception $e) {
            return response()->json(['error' => 'AI Cooking Assistant failed (Parse Steps).'], 500);
        }
    }

    /**
     * AI Cooking Assistant: Contextual help for the current step.
     */
    public function cookingHelp(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'current_step' => 'required|string',
            'question' => 'required|string|max:500',
        ]);

        $title = $request->input('title');
        $step = $request->input('current_step');
        $question = $request->input('question');

        $systemPrompt = <<<EOT
# Role
You are Chef Enrique, the friendly AI Cooking Assistant for the BlendUs app. 

# Instructions
1. The user is currently making the smoothie "{$title}". 
2. They are on this specific step: "{$step}".
3. They have asked a question or asked for help.
4. Give a brief, friendly, and highly relevant answer. Keep it under 3 sentences for a chat interface.

# Output Format
Return ONLY valid JSON with this exact structure:
{
  "answer": "Your reply here"
}
EOT;

        $ollamaHost = env('OLLAMA_HOST', 'http://ollama:11434');

        try {
            $response = Http::connectTimeout(5)->timeout(30)->post("{$ollamaHost}/api/generate", [
                'model' => 'llama3.2:1b',
                'system' => $systemPrompt,
                'prompt' => $question,
                'format' => [
                    'type' => 'object',
                    'properties' => [
                        'answer' => ['type' => 'string'],
                    ],
                    'required' => ['answer'],
                ],
                'stream' => false,
                'options' => ['num_ctx' => 1024],
            ]);

            return response()->json(json_decode($response->json('response'), true));
        } catch (\Exception $e) {
            return response()->json(['error' => 'AI Cooking Assistant failed (Help Chat).'], 500);
        }
    }
}
