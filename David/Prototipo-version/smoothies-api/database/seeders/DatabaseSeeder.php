<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create users
        $users = [
            ['name' => 'John Smoothie',  'email' => 'john@blendus.com',   'password' => Hash::make('password')],
            ['name' => 'Marie Parker',   'email' => 'marie@blendus.com',  'password' => Hash::make('password')],
            ['name' => 'Julia Rivera',   'email' => 'julia@blendus.com',  'password' => Hash::make('password')],
            ['name' => 'Alex Green',     'email' => 'alex@blendus.com',   'password' => Hash::make('password')],
            ['name' => 'Robert Blend',   'email' => 'robert@blendus.com', 'password' => Hash::make('password')],
        ];
        $createdUsers = collect($users)->map(fn($u) => User::create($u));

        // Create tags matching Paco's UI categories
        $tags = [
            ['name' => 'Green',    'slug' => 'green'],
            ['name' => 'Tropical', 'slug' => 'tropical'],
            ['name' => 'Berry',    'slug' => 'berry'],
            ['name' => 'Protein',  'slug' => 'protein'],
            ['name' => 'Detox',    'slug' => 'detox'],
            ['name' => 'Dessert',  'slug' => 'dessert'],
        ];
        $createdTags = collect($tags)->map(fn($t) => Tag::create($t))->keyBy('slug');

        // Seed posts with realistic smoothie data
        $posts = [
            [
                'user' => $createdUsers[0],
                'title' => 'Ultimate Green Detox Smoothie',
                'description' => 'Start your morning with this incredible green detox blend! Spinach, cucumber, kiwi, and a touch of ginger. This recipe will leave you feeling energized all day long.',
                'preparation_time' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1638176067151-21ca72c3e7cd?w=800',
                'tags' => ['green', 'detox'],
            ],
            [
                'user' => $createdUsers[1],
                'title' => 'Tropical Paradise Mango Blast',
                'description' => 'Transport yourself to the tropics with this mango, pineapple, and coconut water blend. Refreshing and packed with vitamin C. Perfect post-workout fuel!',
                'preparation_time' => 7,
                'image_url' => 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800',
                'tags' => ['tropical'],
            ],
            [
                'user' => $createdUsers[2],
                'title' => 'Triple Berry Power Bowl',
                'description' => 'Strawberries, blueberries, and raspberries blended with Greek yogurt and a drizzle of honey. Antioxidant-rich and absolutely delicious. Top with granola for extra crunch!',
                'preparation_time' => 8,
                'image_url' => 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
                'tags' => ['berry', 'dessert'],
            ],
            [
                'user' => $createdUsers[3],
                'title' => 'Chocolate Protein Monster',
                'description' => 'Post-gym gains incoming! 2 scoops of chocolate whey protein, banana, almond milk, peanut butter, and oats. 45g of protein per serving. Build that muscle!',
                'preparation_time' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1561046785-22bcf7b07b42?w=800',
                'tags' => ['protein'],
            ],
            [
                'user' => $createdUsers[4],
                'title' => 'Matcha Morning Energy Shot',
                'description' => 'Ceremonial grade matcha, oat milk, dates, and a pinch of sea salt. A beautiful earthy flavour that wakes you up better than coffee. Sustained energy, no crash!',
                'preparation_time' => 6,
                'image_url' => 'https://images.unsplash.com/photo-1536147116438-62679a5e01f2?w=800',
                'tags' => ['green', 'detox'],
            ],
            [
                'user' => $createdUsers[0],
                'title' => 'Strawberry Banana Dream',
                'description' => 'A classic for a reason. Fresh strawberries, ripe banana, vanilla yogurt, and a splash of orange juice. Creamy perfection in a glass. Kids and adults love it!',
                'preparation_time' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800',
                'tags' => ['berry'],
            ],
            [
                'user' => $createdUsers[1],
                'title' => 'Coconut & Pineapple Colada Smoothie',
                'description' => 'All the flavours of a piña colada without the alcohol. Frozen pineapple, coconut cream, lime juice, and mint. Summer vibes all year round!',
                'preparation_time' => 10,
                'image_url' => 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
                'tags' => ['tropical', 'dessert'],
            ],
            [
                'user' => $createdUsers[2],
                'title' => 'Spinach & Apple Gut Cleanse',
                'description' => 'Great for digestion! Baby spinach, green apple, celery, lemon juice, and ginger. This alkalizing blend supports gut health and glowing skin.',
                'preparation_time' => 7,
                'image_url' => 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800',
                'tags' => ['green', 'detox'],
            ],
        ];

        $createdPosts = [];
        foreach ($posts as $postData) {
            $post = $postData['user']->posts()->create([
                'title'            => $postData['title'],
                'description'      => $postData['description'],
                'preparation_time' => $postData['preparation_time'],
                'is_premium'       => false,
            ]);

            $post->images()->create(['path' => $postData['image_url'], 'order' => 0]);

            $tagIds = collect($postData['tags'])->map(fn($slug) => $createdTags[$slug]->id)->toArray();
            $post->tags()->sync($tagIds);

            $createdPosts[] = $post;
        }

        // Add comments
        $comments = [
            ['post' => $createdPosts[0], 'user' => $createdUsers[1], 'body' => 'This is my go-to morning smoothie! I add a bit of lemon and it tastes even better 🍋'],
            ['post' => $createdPosts[0], 'user' => $createdUsers[2], 'body' => 'Tried it yesterday, absolutely amazing. So refreshing!'],
            ['post' => $createdPosts[1], 'user' => $createdUsers[0], 'body' => 'Pure tropical heaven 🌴 I added some coconut flakes on top!'],
            ['post' => $createdPosts[2], 'user' => $createdUsers[3], 'body' => 'Blueberries are the secret weapon here. Love the antioxidants!'],
            ['post' => $createdPosts[3], 'user' => $createdUsers[1], 'body' => 'Finally a protein shake that actually tastes good! 💪'],
            ['post' => $createdPosts[4], 'user' => $createdUsers[4], 'body' => 'Matcha is life. This is my daily ritual now ☕'],
        ];

        foreach ($comments as $c) {
            Comment::create([
                'post_id' => $c['post']->id,
                'user_id' => $c['user']->id,
                'body'    => $c['body'],
            ]);
        }

        // Add likes
        Like::create(['post_id' => $createdPosts[0]->id, 'user_id' => $createdUsers[1]->id]);
        Like::create(['post_id' => $createdPosts[0]->id, 'user_id' => $createdUsers[2]->id]);
        Like::create(['post_id' => $createdPosts[0]->id, 'user_id' => $createdUsers[3]->id]);
        Like::create(['post_id' => $createdPosts[1]->id, 'user_id' => $createdUsers[0]->id]);
        Like::create(['post_id' => $createdPosts[1]->id, 'user_id' => $createdUsers[4]->id]);
        Like::create(['post_id' => $createdPosts[2]->id, 'user_id' => $createdUsers[0]->id]);
        Like::create(['post_id' => $createdPosts[2]->id, 'user_id' => $createdUsers[3]->id]);
        Like::create(['post_id' => $createdPosts[3]->id, 'user_id' => $createdUsers[1]->id]);
        Like::create(['post_id' => $createdPosts[4]->id, 'user_id' => $createdUsers[0]->id]);
        Like::create(['post_id' => $createdPosts[4]->id, 'user_id' => $createdUsers[2]->id]);
        Like::create(['post_id' => $createdPosts[5]->id, 'user_id' => $createdUsers[3]->id]);
        Like::create(['post_id' => $createdPosts[6]->id, 'user_id' => $createdUsers[4]->id]);
    }
}
