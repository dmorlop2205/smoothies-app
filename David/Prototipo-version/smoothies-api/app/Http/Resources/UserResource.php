<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'bio' => $this->bio,
            'avatar' => $this->avatar,
            'followers_count' => $this->when(
                $this->offsetExists('followers_count'),
                $this->followers_count,
                fn () => $this->whenLoaded('followers', fn () => $this->followers->count())
            ),
            'following_count' => $this->when(
                $this->offsetExists('following_count'),
                $this->following_count,
                fn () => $this->whenLoaded('following', fn () => $this->following->count())
            ),
            'created_at' => $this->created_at,
        ];
    }
}

