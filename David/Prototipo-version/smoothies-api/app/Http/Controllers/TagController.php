<?php

namespace App\Http\Controllers;

use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Tag::query();

        if ($search = $request->query('search')) {
            $query->where('name', 'like', '%'.$search.'%');
        }

        $tags = $query
            ->withCount('posts')
            ->orderByDesc('posts_count')
            ->get();

        return TagResource::collection($tags)->response();
    }
}

