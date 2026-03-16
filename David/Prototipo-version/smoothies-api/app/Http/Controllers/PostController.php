<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['user', 'images', 'tags', 'likes'])
            ->withCount(['comments', 'likes']);

        if ($request->has('tag')) {
            $query->whereHas('tags', fn($q) => $q->where('slug', $request->tag));
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $posts = $query->latest()->paginate(10);

        // Attach isLiked for authenticated user
        if ($user = $request->user()) {
            $posts->getCollection()->transform(function ($post) use ($user) {
                $post->is_liked = $post->likes->contains('user_id', $user->id);
                return $post;
            });
        }

        return response()->json($posts);
    }

    public function show(Request $request, Post $post)
    {
        $post->load(['user', 'images', 'tags', 'comments.user', 'likes']);
        $post->loadCount(['comments', 'likes']);

        if ($user = $request->user()) {
            $post->is_liked = $post->likes->contains('user_id', $user->id);
        } else {
            $post->is_liked = false;
        }

        return response()->json($post);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'preparation_time' => 'nullable|integer|min:1',
            'is_premium'       => 'boolean',
            'tags'             => 'array',
            'tags.*'           => 'exists:tags,id',
            'image_url'        => 'nullable|string|url',
        ]);

        $post = $request->user()->posts()->create([
            'title'            => $data['title'],
            'description'      => $data['description'],
            'preparation_time' => $data['preparation_time'] ?? null,
            'is_premium'       => $data['is_premium'] ?? false,
        ]);

        if (!empty($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }

        if (!empty($data['image_url'])) {
            $post->images()->create(['path' => $data['image_url'], 'order' => 0]);
        }

        $post->load(['user', 'images', 'tags']);
        $post->loadCount(['comments', 'likes']);
        $post->is_liked = false;

        return response()->json($post, 201);
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        $data = $request->validate([
            'title'            => 'string|max:255',
            'description'      => 'string',
            'preparation_time' => 'nullable|integer|min:1',
            'is_premium'       => 'boolean',
            'tags'             => 'array',
            'tags.*'           => 'exists:tags,id',
        ]);

        $post->update($data);

        if (isset($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }

        $post->load(['user', 'images', 'tags']);
        $post->loadCount(['comments', 'likes']);

        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return response()->json(['message' => 'Post deleted.']);
    }

    public function like(Request $request, Post $post)
    {
        $user = $request->user();
        $existing = $post->likes()->where('user_id', $user->id)->first();

        if ($existing) {
            $existing->delete();
            $liked = false;
        } else {
            $post->likes()->create(['user_id' => $user->id]);
            $liked = true;
        }

        return response()->json([
            'liked'       => $liked,
            'likes_count' => $post->likes()->count(),
        ]);
    }

    public function userPosts(Request $request, $userId)
    {
        $posts = Post::where('user_id', $userId)
            ->with(['user', 'images', 'tags'])
            ->withCount(['comments', 'likes'])
            ->latest()
            ->get();

        return response()->json($posts);
    }
}
