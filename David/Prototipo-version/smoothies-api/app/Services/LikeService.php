<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use InvalidArgumentException;

class LikeService
{
    /**
     * @return array{liked: bool, count: int}
     */
    public function toggle(User $user, string $likeableType, int $likeableId): array
    {
        $allowedTypes = [
            Post::class,
            Comment::class,
        ];

        if (! in_array($likeableType, $allowedTypes, true)) {
            throw new InvalidArgumentException('Unsupported likeable type.');
        }

        /** @var \App\Models\Post|\App\Models\Comment $likeable */
        $likeable = $likeableType::query()->find($likeableId);

        if (! $likeable) {
            throw new ModelNotFoundException("Likeable entity not found.");
        }

        $existing = Like::query()
            ->where('user_id', $user->id)
            ->where('likeable_type', $likeableType)
            ->where('likeable_id', $likeableId)
            ->first();

        if ($existing) {
            $existing->delete();

            $liked = false;
        } else {
            Like::create([
                'user_id' => $user->id,
                'likeable_type' => $likeableType,
                'likeable_id' => $likeableId,
            ]);

            $liked = true;
        }

        $count = Like::query()
            ->where('likeable_type', $likeableType)
            ->where('likeable_id', $likeableId)
            ->count();

        return [
            'liked' => $liked,
            'count' => $count,
        ];
    }
}

