# BlendUs 🍹

> **The social network for smoothie lovers.** Share recipes, explore blends, like and comment on posts, and connect with the smoothie community.

Built with **Astro 5 + React** (frontend) and **Laravel 12 + Sanctum** (API backend), using SQLite for zero-config local development.

---

## Project Structure

```
David/
├── smoothies-api/       ← Laravel REST API  (port 8000)
└── blendus-frontend/    ← Astro + React app (port 4321)
```

---

## Setup — First Time (after cloning)

### 1. Backend — Laravel API

```bash
cd smoothies-api

# Install PHP dependencies
composer install

# Create your local environment file
cp .env.example .env

# Generate the application key
php artisan key:generate

# Create the SQLite database file
touch database/database.sqlite

# Run migrations and seed with sample data
php artisan migrate:fresh --seed
```

### 2. Frontend — Astro

```bash
cd blendus-frontend

# Install JS dependencies
npm install

# Create environment file
cp .env.example .env
# (PUBLIC_API_URL=http://localhost:8000 is already set)
```

---

## Running the App

You need **two terminals** running simultaneously:

**Terminal 1 — API:**
```bash
cd smoothies-api
php artisan serve --port=8000
```

**Terminal 2 — Frontend:**
```bash
cd blendus-frontend
npm run dev
```

Then open **http://localhost:4321** 🚀

---

## Default Accounts (from seeder)

| Email | Password |
|-------|----------|
| john@blendus.com | password |
| marie@blendus.com | password |
| julia@blendus.com | password |
| alex@blendus.com | password |
| robert@blendus.com | password |

Or register a new account at `/register`.

---


## Features

- 📰 Home feed with stories bar and category filters
- ❤️ Like / unlike posts
- 💬 Comment on posts
- 🔖 Save posts (local)
- 🔍 Explore & search recipes
- ✍️ Create smoothie posts with image URL + tags
- 🔐 Register, login, logout (Sanctum Bearer tokens)
- 👤 User profile pages
- 📱 Responsive layout

---