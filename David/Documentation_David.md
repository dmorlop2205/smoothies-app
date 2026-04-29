# BlendUs — David's Integration Documentation 🚀

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Why We Moved Away From WordPress](#2-why-we-moved-away-from-wordpress)
3. [Tech Stack & Architecture](#3-tech-stack--architecture)
4. [Infrastructure: Docker Setup](#4-infrastructure-docker-setup)
5. [Backend API Reference](#5-backend-api-reference)
6. [Frontend Pages & Components](#6-frontend-pages--components)
7. [Data Synchronization (Frontend ↔ Backend)](#7-data-synchronization-frontend--backend)
8. [Real-Time Messaging System](#8-real-time-messaging-system)
9. [AI Features](#9-ai-features)
10. [Tag System: Feed vs. Explore](#10-tag-system-feed-vs-explore)
11. [Vector-Based Recommendation System](#11-vector-based-recommendation-system)
12. [Guest Mode](#12-guest-mode)
13. [Testing with Playwright](#13-testing-with-playwright)
14. [Known Technical Challenges & Solutions](#14-known-technical-challenges--solutions)
15. [Running the Project Locally](#15-running-the-project-locally)

---

## 1. Project Overview

**BlendUs** is a smoothie-focused social network — think Instagram, but exclusively for smoothie recipes. Users can share their creations with photos, ingredients, and preparation steps, interact with each other through likes, comments, saves, and direct messages, and receive AI-powered recipe suggestions tailored to their personal taste profile.

The project is split into three areas, each owned by a different team member:

| Member | Role | Stack |
|--------|------|-------|
| **Paco** | UI/UX Design & Visual Identity | Figma → HTML/CSS mockup |
| **Nico** | Backend API & Database | Laravel 11 + PostgreSQL + pgvector |
| **David** | Integration, Frontend Logic & Infrastructure | Astro + React + Docker |

**David's core responsibility** is to act as the bridge between Paco's visual designs and Nico's API, turning two separate prototypes into a single, cohesive, production-like application.

---

## 2. Why We Moved Away From WordPress

The project initially planned to use **WordPress as a frontend** that would consume the Laravel API. This approach was quickly abandoned due to three key problems:

| Problem | Explanation |
|---------|-------------|
| **Session incompatibility** | WordPress manages users through its own cookie-based session system, which conflicts with Laravel's token-based authentication (Laravel Sanctum). Bridging the two was complex and insecure. |
| **Unnecessary overhead** | Using a full CMS just to render data from an external API wastes significant server resources and makes the app slow. |
| **Rigid templating** | Adapting WordPress themes to display modern interactive components (React islands, dynamic feeds) is cumbersome and fights against how WordPress is designed to work. |

### The Solution: Astro

We adopted **Astro** as our frontend framework. Its advantages in this context:

- **True separation of concerns** — Laravel owns the backend entirely; Astro purely consumes the API.
- **Performance by default** — Astro ships plain HTML/CSS, making pages load very fast.
- **Astro Islands** — For highly interactive areas (like the Like button or the AI form), Astro lets us embed isolated **React components** without slowing down the rest of the page.
- **Native SSR & secure cookies** — Astro runs on the server, which allows storing Laravel Sanctum tokens in **httpOnly cookies** securely, rather than exposing them in `localStorage`.

> **UX Design Reference:** The overall UI/UX draws heavy inspiration from Instagram and Facebook. Users are already familiar with these patterns (feed, profiles, explore grid, DMs), so adopting them lowers the learning curve and makes the app feel immediately intuitive.

---

## 3. Tech Stack & Architecture

```
┌─────────────────────────────────────────────────────┐
│                    USER BROWSER                     │
│                                                     │
│   Astro (SSR) + React Islands  →  localhost:4321    │
└────────────────────┬────────────────────────────────┘
                     │ HTTP / REST (JSON)
┌────────────────────▼────────────────────────────────┐
│              Laravel 11 API (Sanctum)               │
│                   localhost:8000                    │
└──────────┬──────────────────────┬───────────────────┘
           │                      │
┌──────────▼──────────┐  ┌────────▼────────────────────┐
│  PostgreSQL 15      │  │   Ollama (AI Inference)     │
│  + pgvector         │  │   localhost:11434           │
│  localhost:5432     │  │   Model: llama3.2:1b        │
└─────────────────────┘  └─────────────────────────────┘
```

All four services run inside **Docker containers** orchestrated by a single `docker-compose.yml`.

---

## 4. Infrastructure: Docker Setup

The entire stack — frontend, backend, database, and AI — is containerized. A single command starts everything.

### `docker-compose.yml` Services

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| `ollama` | `ollama/ollama:latest` | `11434` | AI inference engine |
| `postgres` | `ankane/pgvector:latest` | `5432` | PostgreSQL with vector extension |
| `backend` | Custom Dockerfile (Laravel) | `8000` | REST API |
| `frontend` | Custom Dockerfile (Astro) | `4321` | SSR frontend |

### Key environment variables (backend container)

```dotenv
DB_HOST=postgres
DB_CONNECTION=pgsql
DB_DATABASE=blendus
DB_USERNAME=blendus
DB_PASSWORD=password
OLLAMA_HOST=http://ollama:11434
OLLAMA_URL=http://ollama:11434
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
```

> The `OLLAMA_HOST` variable uses the Docker service name `ollama` as the hostname (not `localhost`), because within the Docker network, containers communicate by service name.

---

## 5. Backend API Reference

The API is built with **Laravel 11** and uses **Laravel Sanctum** for token-based authentication. All endpoints are under `/api`.

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and receive a Bearer token |
| `POST` | `/api/auth/logout` | ✅ | Invalidate the current token |

### Posts

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/posts` | ❌ | Paginated list of all posts (public feed) |
| `GET` | `/api/posts/personalized` | ✅ | AI-ranked feed based on user taste vector |
| `GET` | `/api/posts/{id}` | ❌ | Single post details |
| `POST` | `/api/posts` | ✅ | Create a new post (multipart/form-data) |
| `PUT` | `/api/posts/{id}` | ✅ | Update a post |
| `DELETE` | `/api/posts/{id}` | ✅ | Delete a post |
| `POST` | `/api/posts/{id}/save` | ✅ | Toggle save/unsave a post |

### Comments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/posts/{id}/comments` | ❌ | List comments for a post |
| `POST` | `/api/posts/{id}/comments` | ✅ | Add a comment |
| `DELETE` | `/api/posts/{id}/comments/{commentId}` | ✅ | Delete a comment |

### Likes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/likes` | ✅ | Toggle like (body: `{ likeable_type, likeable_id }`) |

### Tags

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/tags` | ❌ | List all tags |
| `GET` | `/api/tags/{slug}/posts` | ❌ | Posts filtered by tag |

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/users/suggested` | ❌ | 3 random suggested users |
| `GET` | `/api/users/{id}` | ❌ | User profile + counts |
| `PUT` | `/api/users/{id}` | ✅ | Update profile (name, bio, avatar) |
| `GET` | `/api/users/{id}/saved-posts` | ✅ | User's saved posts |
| `GET` | `/api/users/{id}/liked-posts` | ✅ | User's liked posts |
| `POST` | `/api/users/{id}/follow` | ✅ | Follow a user |
| `DELETE` | `/api/users/{id}/follow` | ✅ | Unfollow a user |

### Conversations & Messages

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/conversations` | ✅ | All conversations for current user |
| `POST` | `/api/conversations` | ✅ | Start a DM or group chat |
| `DELETE` | `/api/conversations/{id}` | ✅ | Delete/leave a conversation |
| `GET` | `/api/conversations/{id}/messages` | ✅ | Messages in a conversation |
| `POST` | `/api/conversations/{id}/messages` | ✅ | Send a message |

### AI Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/ai/generate-smoothie` | ✅ | Generate a full smoothie recipe from a prompt |
| `POST` | `/api/ai/sommelier` | ✅ | Match existing recipes to the user's mood |
| `POST` | `/api/ai/extract-steps` | ✅ | Parse raw instructions into structured cooking steps |
| `POST` | `/api/ai/cooking-help` | ✅ | Ask Chef Enrique a question about the current step |

---

## 6. Frontend Pages & Components

The frontend is an **Astro SSR** application. Interactive parts are **React** components embedded as Astro Islands.

### Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.astro` | Main feed (Latest / For You tabs + category filters) |
| `/explore` | `explore.astro` | Instagram-style grid with search and tag filters |
| `/create` | `create.astro` | Post creation form with AI recipe generator |
| `/edit/{id}` | `edit/[id].astro` | Post edit form |
| `/post/{id}` | `post/[id].astro` | Full post detail view with comments |
| `/profile/{id}` | `profile/[id].astro` | User profile (Posts / Saved / Liked tabs) |
| `/messages` | `messages.astro` | Direct messages & group chats |
| `/sommelier` | `sommelier.astro` | AI mood-based smoothie recommender |
| `/login` | `login.astro` | Login page |
| `/register` | `register.astro` | Registration page |

### Key React Components

| Component | Description |
|-----------|-------------|
| `Feed.tsx` | Main feed with tab switcher (Latest / For You), category filters, infinite load |
| `PostCard.tsx` | Card displaying a post with like, save, and comment actions |
| `PostDetails.tsx` | Full post view with inline comments and AI cooking assistant |
| `CreatePostForm.tsx` | Multi-step form with AI recipe autofill section |
| `EditPostForm.tsx` | Edit form with discard-changes button |
| `ExplorePage.tsx` | Grid search with collapsible tag filter panel |
| `ProfilePage.tsx` | Tabbed profile view (Posts / Saved / Liked) |
| `MessagesPage.tsx` | Full messaging UI (conversation list + message thread) |
| `ChatDrawer.tsx` | Slide-in chat panel accessible from any page |
| `ChatPreviewWidget.tsx` | Floating widget showing unread message count |
| `AiCookingAssistant.tsx` | Interactive step-by-step cooking guide with AI chat |
| `SommelierPage.tsx` | Mood input form + AI-recommended posts grid |
| `SuggestedUsers.tsx` | Sidebar widget with 3 random users to follow |

---

## 7. Data Synchronization (Frontend ↔ Backend)

### The API Client (`api.ts`)

All communication between the frontend and the Laravel API goes through a single centralized file: `src/lib/api.ts`. This file:

- Reads the API URL from the `PUBLIC_API_URL` environment variable (defaults to `http://localhost:8000`).
- Automatically attaches the `Authorization: Bearer <token>` header on every request if the user is logged in.
- Handles `401 Unauthorized` responses globally by clearing local storage and redirecting to `/login?expired=1`.
- For file uploads, it skips the `Content-Type: application/json` header to let the browser set the correct `multipart/form-data` boundary.
- For PUT requests with file uploads (which PHP/Laravel handles poorly), it sends a `POST` with an `_method=PUT` override (the "method spoofing" pattern).

### TypeScript Types

The types in `api.ts` are kept in strict alignment with Nico's Laravel API Resources (`PostResource`, `UserResource`, etc.):

```typescript
interface Post {
  id: number; title: string; description: string;
  preparation_steps: string; image_url: string | null;
  author: User; ingredients: Ingredient[]; tags: Tag[];
  likes_count: number; comments_count: number;
  has_liked: boolean; has_saved: boolean;
}

interface User {
  id: number; name: string; username: string; email: string;
  bio?: string | null; avatar?: string | null;
  posts_count?: number; followers_count?: number;
  following_count?: number; is_following?: boolean;
}
```

---

## 8. Real-Time Messaging System

BlendUs supports both **direct messages (DM)** and **group chats**.

### How it works

- The backend stores conversations (`Conversation` model) with a `type` field: `'dm'` or `'group'`.
- For DMs, the system first checks if a conversation between the two users already exists before creating a new one — preventing duplicate DM threads.
- The frontend fetches conversations and messages through polling (periodic `fetch` calls) since a full WebSocket implementation (e.g. Laravel Echo + Pusher) was out of scope for this project stage.

### Why polling instead of WebSockets

Implementing a full real-time WebSocket server would have required additional infrastructure (Pusher, Soketi, or Laravel Reverb) and significantly more setup complexity. Polling at reasonable intervals provides a functional messaging experience that fits the current project scope.

### Key UX behaviours

- Conversations are sorted by the timestamp of their last message.
- The `ChatPreviewWidget` shows a floating unread message badge from any page.
- Group chat owners can add/remove members via dedicated API endpoints.

---

## 9. AI Features

BlendUs integrates **three distinct AI-powered features**, all running locally via **Ollama** with the `llama3.2:1b` model.

### 9.1 AI Recipe Generator (in `CreatePostForm`)

The user types a short prompt (e.g. *"a tropical smoothie with mango and coconut"*) and the AI returns a complete recipe pre-filled into the form.

**How the context enrichment works:**
The `AiController::generateSmoothie()` method queries the database to fetch:
- The **3 most recent posts** created by the user.
- The **3 most recently liked posts** by the user.

Both sets are injected into the system prompt so the model understands the user's preferences and style, generating more relevant results.

**Strict JSON output schema:**
```json
{
  "name": "string",
  "description": "string",
  "ingredients": [{ "name": "string", "amount": "string" }],
  "tags": ["string"],
  "category": "green | tropical | berry | protein | detox | dessert",
  "preparation_steps": "string"
}
```

The model is forced to respond with this exact JSON structure using Ollama's `format` parameter. The frontend (`CreatePostForm.tsx`) reads this JSON and autofills all form fields automatically.

### 9.2 AI Sommelier (`/sommelier` page)

The user describes their **current mood or situation** (e.g. *"just finished a heavy workout"*) and the AI selects 4 matching smoothies from the database and explains why.

**Flow:**
1. Laravel fetches the 20 most recent posts from the DB as an "inventory".
2. The inventory + user's mood are sent to Ollama.
3. Ollama returns `{ explanation: string, recommended_ids: number[] }`.
4. Laravel fetches the full `PostResource` objects for those IDs (preserving AI-suggested order) and returns them.
5. The frontend renders them as standard `PostCard` components.

### 9.3 AI Cooking Assistant (`AiCookingAssistant.tsx`)

When viewing a post, the user can open the Cooking Assistant which:

1. **Parses the raw preparation steps** (via `POST /api/ai/extract-steps`) into a structured array of `{ instruction, tip }` objects, each with a 💡 tip.
2. **Allows the user to ask questions** about the current step (via `POST /api/ai/cooking-help`). The persona is "Chef Enrique", a friendly AI assistant.

The cooking help endpoint uses a smaller context window (`num_ctx: 1024`) since the chat responses are intentionally brief (≤ 3 sentences).

### Why not a chatbot for recommendations?

An early suggestion was to use a chatbot to recommend posts. This was rejected for two reasons:

1. **Latency** — A chat round-trip with the local Ollama model takes 10–20 seconds. A chatbot waiting time would be unacceptable as a UX pattern.
2. **Industry standard** — Modern social networks (Instagram, TikTok, Twitter) do not use chatbots for content recommendation. They use vector similarity search, which we implemented instead (see Section 11).

---

## 10. Tag System: Feed vs. Explore

Tags work differently depending on which page you are on:

### Main Feed (`/`)
- The 6 tags with the **most posts** are fetched via `GET /api/tags` and displayed as visual category filters with icons (green smoothie, pineapple, berries, etc.).
- Clicking a filter fetches posts for that tag via `GET /api/tags/{slug}/posts`.
- Only the top 6 are shown to avoid visual clutter: `tags.slice(0, 6)`.

### Explore Page (`/explore`)
- **All tags** are fetched and shown in a collapsible filter panel (toggled by clicking the filter icon).
- The user can also **search by text** across post titles and descriptions simultaneously.
- Filtering is done client-side from the already-loaded posts array (no extra API call per filter change).

---

## 11. Vector-Based Recommendation System

The "For You" feed uses **pgvector** (a PostgreSQL extension) to rank posts by semantic similarity to the user's taste profile.

### How it works

**Step 1 — Post Embeddings**
Every time a post is created or updated, `EmbeddingService::updatePostEmbedding()` calls Ollama's `/api/embeddings` endpoint using the `nomic-embed-text` model. It converts the post's text (title + description + ingredients + tags) into a **768-dimensional vector** stored in the `posts.embedding` column.

**Step 2 — User Preference Vector**
When a user **likes** or **saves** a post, `EmbeddingService::updateUserPreference()` is triggered. It:
1. Fetches all posts the user has liked or saved that have an embedding.
2. Computes the **element-wise average** of all their embedding vectors.
3. Stores the result in `users.preference_embedding`.

This averaged vector represents the user's "centre of gravity" in the semantic space of all smoothie content.

**Step 3 — Personalized Feed Query**
`PostService::getPersonalizedFeed()` runs:
```sql
SELECT *, (embedding <=> ?) AS distance
FROM posts
WHERE user_id != ?
ORDER BY distance ASC
```
The `<=>` operator is pgvector's **cosine distance** — posts whose embedding is closest to the user's preference vector appear first.

**Seeding embeddings manually:**
```bash
docker exec blendus-backend php artisan smoothies:generate-embeddings
```

---

## 12. Guest Mode

Users who are not logged in can **fully browse** BlendUs without an account:

- The public feed (`GET /api/posts`) and post details (`GET /api/posts/{id}`) require no authentication.
- `GET /api/tags`, `GET /api/users/suggested`, and `GET /api/users/{id}` are also public.
- Attempting to like, comment, save, or create a post redirects to `/login`.
- The `api.ts` client handles this by attempting the request without a token; if the server returns `401`, it redirects to `/login?expired=1`.

---

## 13. Testing with Playwright

Automated end-to-end tests are written with **Playwright** and live in:
```
David/Prototipo-version/blendus-frontend/playwright/
```

Tests cover key user flows including authentication, post creation, likes/saves, and navigation. The test suite reads its configuration from a `variables.yml` file (credentials, base URL, etc.) and is designed to run against the Dockerised app at `http://localhost:4321`.

To run the tests manually:
```bash
cd David/Prototipo-version/blendus-frontend
npx playwright test
```

A GitLab CI pipeline has also been configured to run the Playwright suite automatically on the `develop` branch, with a database reset stage before tests execute.

---

## 14. Known Technical Challenges & Solutions

| Challenge | Problem | Solution Implemented |
|-----------|---------|----------------------|
| **IPv6 vs IPv4 conflict** | Laravel resolved `localhost` to IPv6 (`::1`), but Docker only exposed Ollama on IPv4 (`0.0.0.0:11434`), causing "Connection Refused". | Set `OLLAMA_HOST=http://127.0.0.1:11434` to force IPv4. |
| **Missing php-curl extension** | Laravel's HTTP facade (Guzzle) failed silently with HTTP 500 when no cURL was present in the PHP container. | Installed `php8.4-curl` in the backend Dockerfile. |
| **AI generation too slow** | Using `gemma3:4b` took 40–60 seconds per recipe, which destroyed UX. | Switched to `llama3.2:1b` and capped context window to `num_ctx: 2048`, reducing generation to 10–20 seconds. |
| **AI hallucinating non-food ingredients** | The 1B model sometimes returned strings like `"ingredient name"` or `"category"` as ingredient values. | Added a server-side filter in `AiController` that strips any ingredient whose name matches a list of known bad-words before returning the response. |
| **PUT + file upload incompatibility** | PHP/Laravel does not parse `multipart/form-data` on `PUT` requests. Updating a post's image was broken. | Used the **method spoofing** pattern: send a `POST` request with `_method=PUT` in the form data. |
| **Duplicate DM threads** | Creating a conversation between the same two users multiple times generated duplicate threads. | Before creating a DM, `ConversationController` checks if a DM already exists between the two participants and returns the existing one. |

---

## 15. Running the Project Locally

### Prerequisites
- Docker & Docker Compose installed.

### Start everything

```bash
cd David
docker compose up -d
```

### First-time setup (run once)

```bash
# Run database migrations and seed with sample data
docker exec blendus-backend php artisan migrate:fresh --seed

# Generate vector embeddings for all seeded posts
docker exec blendus-backend php artisan smoothies:generate-embeddings
```

### Access the app

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:4321 |
| **Backend API** | http://localhost:8000 |

### Test accounts

| Name | Username | Email | Password |
|------|----------|-------|----------|
| Test User | testuser | test@example.com | password |
| Nico | nico | nico@test.com | password123 |
| Paco | paco | paco@test.com | password123 |

You can also create a new account at `/register`.
