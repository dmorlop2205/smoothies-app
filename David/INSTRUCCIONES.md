# BlendUs 🍹


**Terminal 1 — API:**
```bash
cd Prototipo-version/smoothies-api
php artisan serve 
```

**Terminal 2 — Frontend:**
```bash
cd Prototipo-version/blendus-frontend
npm run dev
```

Then open **http://localhost:4321** 🚀

---

## Default Accounts (from seeder)

| Name | Username | Email | Password |
|------|----------|-------|----------|
| Test User | testuser | test@example.com | password |
| Nico | nico | nico@test.com | password123 |
| Paco | paco | paco@test.com | password123 |

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