<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Post $post)
    {
        $comments = $post->comments()->with('user')->latest()->get();
        return response()->json($comments);
    }

    public function store(Request $request, Post $post)
    {
        $data = $request->validate([
            'body' => 'required|string|max:500',
        ]);

        $comment = $post->comments()->create([
            'user_id' => $request->user()->id,
            'body'    => $data['body'],
        ]);

        $comment->load('user');
        return response()->json($comment, 201);
    }

    public function destroy(Request $request, Comment $comment)
    {
        if ($request->user()->id !== $comment->user_id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $comment->delete();
        return response()->json(['message' => 'Comment deleted.']);
    }
}
