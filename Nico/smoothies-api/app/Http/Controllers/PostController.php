<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Services\PostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(
        protected PostService $postService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);

        $posts = $this->postService->getFeed($perPage);

        return (new PostCollection($posts))->response();
    }

    public function store(StorePostRequest $request): JsonResponse
    {
        $post = $this->postService->store($request->user(), $request->validated());

        return (new PostResource($post))->response()->setStatusCode(201);
    }

    public function show(Post $post): JsonResponse
    {
        $post->load(['user', 'ingredients', 'tags'])
            ->loadCount(['likes', 'comments']);

        if ($userId = auth()->id()) {
            $post->load(['likes' => fn ($q) => $q->where('user_id', $userId)]);
        }

        return (new PostResource($post))->response();
    }

    public function update(UpdatePostRequest $request, Post $post): JsonResponse
    {
        $this->authorize('update', $post);

        $updated = $this->postService->update($post, $request->validated());

        return (new PostResource($updated))->response();
    }

    public function destroy(Request $request, Post $post): JsonResponse
    {
        $this->authorize('delete', $post);

        $this->postService->delete($post);

        return response()->json([
            'message' => 'Post deleted',
        ]);
    }

    public function byTag(Request $request, string $tag): JsonResponse
    {
        $perPage = (int) $request->query('per_page', 15);

        $posts = $this->postService->getByTag($tag, $perPage);

        return (new PostCollection($posts))->response();
    }
}

