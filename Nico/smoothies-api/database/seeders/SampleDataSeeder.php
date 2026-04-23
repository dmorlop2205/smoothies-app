<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use App\Models\Like;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create a set of diverse users
        $users = User::factory()->count(12)->create()->each(function ($u) {
            $u->update([
                'bio' => Arr::random([
                    'Smoothie enthusiast 🍓 | Fitness lover 💪',
                    'Always mixing something new! 🍍',
                    'Green juice addict 🥬',
                    'Healthy living, one glass at a time.',
                    'Professional mixologist (of smoothies) 🍹',
                    null
                ]),
                'avatar' => 'https://api.dicebear.com/7.x/initials/svg?seed=' . $u->username,
            ]);
        });

        $allUsers = User::all();

        // 2. Curated Assets Pool (Local Assets for 100% reliability)
        $smoothiePool = [
            [
                'title' => 'Midnight Berry Bliss',
                'desc' => 'A deep, antioxidant-rich blend of wild berries and greek yogurt.',
                'img' => '/berry.webp',
                'tags' => ['berry', 'dessert']
            ],
            [
                'title' => 'Emerald Energy Boost',
                'desc' => 'Kickstart your day with fresh kiwi, spinach, and a touch of ginger.',
                'img' => '/greensmoothies.png',
                'tags' => ['green', 'detox']
            ],
            [
                'title' => 'Tropical Sunset Swirl',
                'desc' => 'Mango, pineapple, and coconut water for that vacation feeling 🏝️',
                'img' => '/pineaple.webp',
                'tags' => ['tropical']
            ],
            [
                'title' => 'Matcha Zen Morning',
                'desc' => 'Ceremonial grade matcha blended with oat milk and a hint of honey.',
                'img' => '/matchafuel.png',
                'tags' => ['green', 'detox']
            ],
            [
                'title' => 'Protein Power Pack',
                'desc' => 'Thick and creamy base topped with seeds and fresh fruit.',
                'img' => '/proteinshake.webp',
                'tags' => ['protein', 'detox']
            ],
            [
                'title' => 'Vibrant Detox',
                'desc' => 'Orange, ginger, and turmeric for a vibrant immune boost.',
                'img' => '/leaves.webp',
                'tags' => ['detox', 'green']
            ],
            [
                'title' => 'Island Paradise',
                'desc' => 'Fresh tropical vibes in a glass!',
                'img' => '/tropicalvibrations.webp',
                'tags' => ['tropical']
            ],
            [
                'title' => 'Icy Dessert Mix',
                'desc' => 'Cool down with this sweet and healthy dessert substitute.',
                'img' => '/ice-cream.webp',
                'tags' => ['dessert']
            ],
            [
                'title' => 'Secret Recipe (No Photo)',
                'desc' => 'A mysterious blend that tastes like magic but I forgot to take a photo!',
                'img' => null,
                'tags' => ['dessert']
            ]
        ];

        $allTags = Tag::all();
        $ingredientsList = ['Banana', 'Spinach', 'Blueberries', 'Almond Milk', 'Chia Seeds', 'Honey', 'Oats', 'Yogurt', 'Mango', 'Pineapple'];
        $commentPool = [
            'Wow, looks delicious! 😍',
            'I need to try this tomorrow morning.',
            'Can I use coconut milk instead of almond?',
            'The color is amazing! 🌈',
            'Perfect post-workout snack.',
            'My kids loved this one! Thanks for sharing.',
            'Added some extra ginger and it was perfect.',
            'Best smoothie ever! ⭐️⭐️⭐️⭐️⭐️',
        ];

        // 3. Create ~40 posts
        foreach (range(1, 40) as $i) {
            $poolItem = Arr::random($smoothiePool);
            $user = $allUsers->random();

            $post = Post::create([
                'user_id' => $user->id,
                'title' => $poolItem['title'] . ($i > 7 ? ' #' . $i : ''),
                'description' => $poolItem['desc'],
                'preparation_steps' => "1. Prep all ingredients. \n2. Place in blender. \n3. Blend for 60s until smooth. \n4. Pour and ENJOY! 🥤",
                'image_url' => '/assets/smoothie2.jpg',
            ]);

            $post->tags()->sync($allTags->whereIn('name', $poolItem['tags'])->pluck('id'));

            foreach (Arr::random($ingredientsList, rand(3, 5)) as $name) {
                $post->ingredients()->create([
                    'name' => $name,
                    'quantity' => rand(1, 100),
                    'unit' => Arr::random(['g', 'ml', 'unit', 'tbsp']),
                ]);
            }

            foreach ($allUsers->random(rand(2, 4)) as $commenter) {
                $post->comments()->create([
                    'user_id' => $commenter->id,
                    'body' => Arr::random($commentPool),
                ]);
            }
        }

        // 4. Social Simulation
        foreach ($allUsers as $u) {
            $u->following()->sync($allUsers->where('id', '!=', $u->id)->random(rand(3, 6))->pluck('id'));
        }

        $allPosts = Post::all();
        foreach ($allPosts as $p) {
            foreach ($allUsers->random(rand(2, 8)) as $liker) {
                Like::create([
                    'user_id' => $liker->id,
                    'likeable_id' => $p->id,
                    'likeable_type' => Post::class,
                ]);
            }
        }
    }
}
