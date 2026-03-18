<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {
    }

    public function show(User $user): JsonResponse
    {
        return (new UserResource($user))->response();
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $this->authorize('update', $user);

        $data = $request->only(['name', 'username', 'bio', 'avatar']);

        $updated = $this->userService->updateProfile($user, $data);

        return (new UserResource($updated))->response();
    }

    public function follow(Request $request, User $user): JsonResponse
    {
        $this->userService->follow($request->user(), $user);

        return response()->json([
            'message' => 'Followed',
        ]);
    }

    public function unfollow(Request $request, User $user): JsonResponse
    {
        $this->userService->unfollow($request->user(), $user);

        return response()->json([
            'message' => 'Unfollowed',
        ]);
    }

    public function followers(User $user): JsonResponse
    {
        $followers = $this->userService->getFollowers($user);

        return UserResource::collection($followers)->response();
    }

    public function following(User $user): JsonResponse
    {
        $following = $this->userService->getFollowing($user);

        return UserResource::collection($following)->response();
    }
}

