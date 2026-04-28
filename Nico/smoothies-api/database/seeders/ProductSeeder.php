<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name'        => 'Smoothie Lovers Poster A3',
                'description' => 'High-quality A3 poster with vibrant smoothie artwork. Perfect for kitchens and smoothie bars.',
                'price_cents' => 1299,
                'image_url'   => null,
            ],
            [
                'name'        => 'Green Power Poster A2',
                'description' => 'Large A2 motivational poster featuring our iconic green smoothie design.',
                'price_cents' => 1799,
                'image_url'   => null,
            ],
            [
                'name'        => 'Tropical Vibes Poster A3',
                'description' => 'Colorful A3 tropical-themed poster with mango, pineapple and coconut artwork.',
                'price_cents' => 1299,
                'image_url'   => null,
            ],
            [
                'name'        => 'Smoothie App Logo Sticker Pack',
                'description' => 'Pack of 10 premium vinyl stickers featuring app logos and smoothie icons. Waterproof.',
                'price_cents' => 499,
                'image_url'   => null,
            ],
            [
                'name'        => 'Fruit Icons Sticker Sheet',
                'description' => 'Sheet of 20 hand-drawn fruit stickers. Great for bottles, laptops, and notebooks.',
                'price_cents' => 399,
                'image_url'   => null,
            ],
            [
                'name'        => 'Green Smoothie Holographic Sticker',
                'description' => 'Single large holographic sticker with green smoothie design. 10cm diameter.',
                'price_cents' => 299,
                'image_url'   => null,
            ],
            [
                'name'        => 'Classic Logo T-Shirt (Unisex)',
                'description' => 'Comfortable 100% organic cotton t-shirt with embroidered app logo. Available in S-XL.',
                'price_cents' => 2499,
                'image_url'   => null,
            ],
            [
                'name'        => 'Smoothie Club T-Shirt (Unisex)',
                'description' => 'Premium cotton blend t-shirt with "Smoothie Club" print. Relaxed fit, S-XL.',
                'price_cents' => 2199,
                'image_url'   => null,
            ],
            [
                'name'        => 'Blend It! Hoodie',
                'description' => 'Warm and cozy hoodie with "Blend It!" slogan and fruit graphic on the back.',
                'price_cents' => 4499,
                'image_url'   => null,
            ],
            [
                'name'        => 'Smoothie Recipe Tote Bag',
                'description' => 'Canvas tote bag printed with a curated smoothie recipe on one side. 38x42cm.',
                'price_cents' => 1499,
                'image_url'   => null,
            ],
            [
                'name'        => 'Reusable Smoothie Cup 500ml',
                'description' => 'BPA-free reusable cup with lid and reusable straw. Branded with app logo.',
                'price_cents' => 1899,
                'image_url'   => null,
            ],
            [
                'name'        => 'Blender Bottle 700ml',
                'description' => 'Shaker-style blender bottle with mixing ball. Perfect for on-the-go smoothies.',
                'price_cents' => 2299,
                'image_url'   => null,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
