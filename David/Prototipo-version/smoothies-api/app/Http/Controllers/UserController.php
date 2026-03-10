<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'posts_count' => $user->posts()->count(),
        ]);
    }

    public function suggested(Request $request)
    {
        $users = User::when($request->user(), fn($q) => $q->where('id', '!=', $request->user()->id))
            ->withCount('posts')
            ->orderByDesc('posts_count')
            ->limit(5)
            ->get(['id', 'name', 'email']);

        return response()->json($users);
    }
}
