<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiController extends Controller
{
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
            ->map(fn (Post $p) => [
                'title'       => $p->title,
                'description' => $p->description,
                'ingredients' => $p->ingredients->pluck('name')->toArray(),
                'tags'        => $p->tags->pluck('name')->toArray(),
            ]);

        // Posts the user has liked (last 5)
        $likedPosts = $user->likedPosts()
            ->with('ingredients', 'tags')
            ->latest('likes.created_at')
            ->take(3)
            ->get()
            ->map(fn (Post $p) => [
                'title'       => $p->title,
                'description' => $p->description,
                'ingredients' => $p->ingredients->pluck('name')->toArray(),
                'tags'        => $p->tags->pluck('name')->toArray(),
            ]);

        // ── Build the system prompt ──
        $systemPrompt = <<<EOT
# Role
You are an expert smoothie chef AI. Your ONLY purpose is to create smoothie recipes.

# Constraints & Security
1. You must ONLY generate smoothies. Do NOT generate recipes for other foods, and do NOT engage in general conversation.
2. If the user's prompt is completely unrelated to smoothies (e.g. asking to write code, solve math, or political questions), you MUST ignore it and generate a random creative smoothie instead. DO NOT refuse or apologize via text, because your output MUST strictly be the JSON format for a smoothie.

# Output Format
Return ONLY valid JSON with this exact structure:
{
  "name": "Creative Smoothie Name",
  "description": "A short, appetizing description (2-3 sentences)",
  "ingredients": [
    { "name": "Ingredient name", "amount": "quantity with unit, e.g. 200 g" }
  ],
  "tags": ["tag1", "tag2"],
  "category": "one of: green, tropical, berry, protein, detox, dessert",
  "preparation_steps": "Step-by-step instructions for making the smoothie"
}
Use between 4 and 8 ingredients. Use between 2 and 4 tags (single words, no #). Be creative and detailed.
EOT;

        // Add user context if available
        if ($latestPosts->isNotEmpty()) {
            $systemPrompt .= "\n\nHere are smoothies this user has recently created (use as inspiration for their style and preferences):\n"
                . json_encode($latestPosts->toArray(), JSON_PRETTY_PRINT);
        }

        if ($likedPosts->isNotEmpty()) {
            $systemPrompt .= "\n\nHere are smoothies this user has liked (they enjoy these flavors and styles):\n"
                . json_encode($likedPosts->toArray(), JSON_PRETTY_PRINT);
        }

        // ── Call Ollama ──
        $ollamaHost = env('OLLAMA_HOST', 'http://127.0.0.1:11434');

        try {
            $response = Http::connectTimeout(10)->timeout(120)->post("{$ollamaHost}/api/generate", [
                'model'  => 'llama3.2:1b',
                'system' => $systemPrompt,
                'prompt' => $userPrompt,
                'format' => [
                    'type'       => 'object',
                    'properties' => [
                        'name'              => ['type' => 'string'],
                        'description'       => ['type' => 'string'],
                        'ingredients'       => [
                            'type'  => 'array',
                            'items' => [
                                'type'       => 'object',
                                'properties' => [
                                    'name'   => ['type' => 'string'],
                                    'amount' => ['type' => 'string'],
                                ],
                                'required' => ['name', 'amount'],
                            ],
                        ],
                        'tags'              => ['type' => 'array', 'items' => ['type' => 'string']],
                        'category'          => ['type' => 'string'],
                        'preparation_steps' => ['type' => 'string'],
                    ],
                    'required' => ['name', 'description', 'ingredients', 'tags', 'category', 'preparation_steps'],
                ],
                'stream'  => false,
                'options' => ['num_ctx' => 2048],
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

        // Fetch 20 recent posts as inventory
        $inventory = Post::with('tags')
            ->latest()
            ->take(20)
            ->get()
            ->map(fn (Post $p) => [
                'id'          => $p->id,
                'title'       => $p->title,
                'description' => $p->description,
                'tags'        => $p->tags->pluck('name')->toArray(),
            ]);

        if ($inventory->isEmpty()) {
            return response()->json(['error' => 'No smoothies available in inventory.'], 404);
        }

        $systemPrompt = <<<EOT
# Role
You are the BlendUs AI Sommelier. Your job is to match a user's mood with the perfect smoothies from our available inventory.

# Instructions
1. You will receive the user's mood and a JSON array of available smoothies (each has an 'id', 'title', 'description', and 'tags').
2. Select EXACTLY 4 smoothies from the inventory array that best match the user's mood. You must ONLY select smoothies that exist in the inventory.
3. Write a friendly, 2-to-3 sentence explanation directly addressing the user about why these 4 smoothies are perfect for their current mood.

# Output Format
Return ONLY valid JSON with this exact structure:
{
  "explanation": "Your personalized message explaining the choices...",
  "recommended_ids": [12, 45, 8]
}
EOT;

        $userPrompt = "My mood is: {$mood}\n\nInventory:\n" . json_encode($inventory->toArray(), JSON_PRETTY_PRINT);
        $ollamaHost = env('OLLAMA_HOST', 'http://127.0.0.1:11434');

        try {
            $response = Http::connectTimeout(10)->timeout(120)->post("{$ollamaHost}/api/generate", [
                'model'  => 'llama3.2:1b',
                'system' => $systemPrompt,
                'prompt' => $userPrompt,
                'format' => [
                    'type'       => 'object',
                    'properties' => [
                        'explanation'     => ['type' => 'string'],
                        'recommended_ids' => [
                            'type'  => 'array',
                            'items' => ['type' => 'integer']
                        ],
                    ],
                    'required' => ['explanation', 'recommended_ids'],
                ],
                'stream'  => false,
                'options' => ['num_ctx' => 2048],
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
                ->when($userId, fn ($q) => $q->with([
                    'likes'   => fn ($lq) => $lq->where('user_id', $userId),
                    'savedBy' => fn ($sq) => $sq->where('user_id', $userId),
                ]))
                ->whereIn('id', $aiResult['recommended_ids'])
                ->get();

            // Order posts exactly as the AI suggested
            $sortedPosts = $posts->sortBy(function ($post) use ($aiResult) {
                return array_search($post->id, $aiResult['recommended_ids']);
            })->values();

            return response()->json([
                'explanation' => $aiResult['explanation'],
                'posts'       => \App\Http\Resources\PostResource::collection($sortedPosts),
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
            'title'             => 'required|string|max:255',
            'ingredients'       => 'required|array',
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
3. For EACH step, you MUST invent a creative, helpful tip about doing that step. Append the tip to the end of the text, starting with "💡 Tip: ".
4. Do NOT include step numbers at the beginning of the text (e.g. write "Chop the kiwi" not "1. Chop the kiwi").

# Output Format
Return ONLY valid JSON with this exact structure:
{
  "steps": [
    {
      "instruction": "Chop the kiwi.",
      "tip": "Use a serrated knife for an easier cut."
    }
  ]
}
EOT;

        $userPrompt = "Ingredients: {$ingredients}\nRaw Instructions: {$prep}";
        $ollamaHost = env('OLLAMA_HOST', 'http://127.0.0.1:11434');

        try {
            $response = Http::connectTimeout(10)->timeout(120)->post("{$ollamaHost}/api/generate", [
                'model'  => 'llama3.2:1b',
                'system' => $systemPrompt,
                'prompt' => $userPrompt,
                'format' => [
                    'type'       => 'object',
                    'properties' => [
                        'steps' => [
                            'type'  => 'array',
                            'items' => [
                                'type' => 'object',
                                'properties' => [
                                    'instruction' => ['type' => 'string'],
                                    'tip'         => ['type' => 'string']
                                ],
                                'required' => ['instruction', 'tip']
                            ]
                        ],
                    ],
                    'required' => ['steps'],
                ],
                'stream'  => false,
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
            'title'        => 'required|string|max:255',
            'current_step' => 'required|string',
            'question'     => 'required|string|max:500',
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

        $ollamaHost = env('OLLAMA_HOST', 'http://127.0.0.1:11434');

        try {
            $response = Http::connectTimeout(5)->timeout(30)->post("{$ollamaHost}/api/generate", [
                'model'  => 'llama3.2:1b',
                'system' => $systemPrompt,
                'prompt' => $question,
                'format' => [
                    'type'       => 'object',
                    'properties' => [
                        'answer' => ['type' => 'string'],
                    ],
                    'required' => ['answer'],
                ],
                'stream'  => false,
                'options' => ['num_ctx' => 1024],
            ]);

            return response()->json(json_decode($response->json('response'), true));
        } catch (\Exception $e) {
            return response()->json(['error' => 'AI Cooking Assistant failed (Help Chat).'], 500);
        }
    }
}
