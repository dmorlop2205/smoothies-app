# Blendus API — Manual de uso rápido

Base URL: `http://localhost:8000/api`

Todos los requests deben incluir el header `Accept: application/json`. Los endpoints marcados con 🔒 requieren el header `Authorization: Bearer {token}`.

---

## Auth

### POST `/auth/register`

Crea una cuenta nueva. Devuelve el usuario y el token que se usa en todos los endpoints protegidos.

**Body:**
```json
{
    "name": "Nico Lopez",
    "username": "nicolopez",
    "email": "nico@test.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Respuesta `201`:**
```json
{
    "user": {
        "id": 1,
        "name": "Nico Lopez",
        "username": "nicolopez",
        "bio": null,
        "avatar": null,
        "followers_count": 0,
        "following_count": 0,
        "created_at": "2026-03-22T15:00:00.000000Z"
    },
    "token": "1|abc123xyz..."
}
```

---

### POST `/auth/login`

Autentica al usuario y devuelve un token nuevo.

**Body:**
```json
{
    "email": "nico@test.com",
    "password": "password123"
}
```

**Respuesta `200`:** igual que register, con `user` y `token`.

---

### POST `/auth/logout` 🔒

Invalida todos los tokens del usuario autenticado. No necesita body.

**Respuesta `200`:**
```json
{ "message": "Logged out" }
```

---

## Posts

### GET `/posts`

Devuelve el feed paginado de todos los posts, ordenados del más reciente al más antiguo. Acepta el query param `?per_page=15`.

**Respuesta `200`:**
```json
{
    "data": [
        {
            "id": 1,
            "title": "Batido verde energetico",
            "description": "Un batido lleno de nutrientes para empezar el dia",
            "preparation_steps": "1. Pela el platano...",
            "image_url": null,
            "created_at": "2026-03-22T15:00:00.000000Z",
            "author": {
                "id": 1,
                "name": "Nico Lopez",
                "username": "nicolopez",
                "bio": null,
                "avatar": null
            },
            "ingredients": [
                { "name": "Espinacas", "quantity": "50.00", "unit": "g" },
                { "name": "Platano", "quantity": "1.00", "unit": "unidad" }
            ],
            "tags": [
                { "id": 1, "name": "vegano" },
                { "id": 2, "name": "verde" }
            ],
            "likes_count": 0,
            "comments_count": 0,
            "has_liked": false
        }
    ],
    "meta": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 15,
        "total": 1
    }
}
```

---

### GET `/posts/{id}`

Devuelve un post individual con todos sus datos. Misma estructura que el objeto dentro de `data` del feed.

---

### POST `/posts` 🔒

Crea un post nuevo. El campo `ingredients` es obligatorio y debe tener al menos un elemento. `tags` es opcional.

**Body:**
```json
{
    "title": "Batido verde energetico",
    "description": "Un batido lleno de nutrientes para empezar el dia",
    "preparation_steps": "1. Pela el platano. 2. Aniade todo a la batidora. 3. Bate 60 segundos.",
    "image_url": null,
    "ingredients": [
        { "name": "Espinacas", "quantity": 50, "unit": "g" },
        { "name": "Platano", "quantity": 1, "unit": "unidad" },
        { "name": "Leche de almendras", "quantity": 200, "unit": "ml" }
    ],
    "tags": ["vegano", "verde", "energia"]
}
```

**Respuesta `201`:** el objeto del post completo (misma estructura que el feed).

---

### PUT `/posts/{id}` 🔒

Actualiza un post. Solo el autor puede editarlo. Todos los campos son opcionales, solo se actualizan los que se envíen. Si se envía `ingredients`, reemplaza todos los anteriores.

**Body (ejemplo parcial):**
```json
{
    "title": "Nuevo titulo",
    "ingredients": [
        { "name": "Agua", "quantity": 300, "unit": "ml" }
    ]
}
```

**Respuesta `200`:** el objeto del post actualizado.

---

### DELETE `/posts/{id}` 🔒

Elimina un post. Solo el autor puede borrarlo. Elimina también sus ingredientes, comentarios y likes en cascada.

**Respuesta `200`:**
```json
{ "message": "Post deleted" }
```

---

### GET `/tags/{tag}/posts`

Devuelve posts filtrados por nombre de tag. Paginado igual que el feed.

Ejemplo: `GET /tags/vegano/posts`

---

## Comments

### GET `/posts/{post_id}/comments`

Devuelve los comentarios de un post, paginados y ordenados del más reciente al más antiguo.

**Respuesta `200`:**
```json
{
    "data": [
        {
            "id": 1,
            "body": "Este batido esta increible!",
            "created_at": "2026-03-22T15:10:00.000000Z",
            "author": {
                "id": 1,
                "name": "Nico Lopez",
                "username": "nicolopez"
            },
            "likes_count": 0,
            "has_liked": false
        }
    ]
}
```

---

### POST `/posts/{post_id}/comments` 🔒

Crea un comentario en un post.

**Body:**
```json
{
    "body": "Este batido esta increible, lo hice esta maniana."
}
```

**Respuesta `201`:** el objeto del comentario creado.

---

### DELETE `/posts/{post_id}/comments/{comment_id}` 🔒

Elimina un comentario. Puede hacerlo el autor del comentario o el autor del post.

**Respuesta `200`:**
```json
{ "message": "Comment deleted" }
```

---

## Likes

### POST `/likes` 🔒

Funciona como toggle: si ya existe el like lo quita, si no existe lo añade. Sirve tanto para posts como para comentarios según el `likeable_type`.

**Body para like en un post:**
```json
{
    "likeable_type": "App\\Models\\Post",
    "likeable_id": 1
}
```

**Body para like en un comentario:**
```json
{
    "likeable_type": "App\\Models\\Comment",
    "likeable_id": 1
}
```

**Respuesta `200`:**
```json
{
    "liked": true,
    "count": 1
}
```

Si se llama dos veces seguidas: primera vez `liked: true`, segunda vez `liked: false`.

---

## Users

### GET `/users/{id}`

Devuelve el perfil público de un usuario.

**Respuesta `200`:**
```json
{
    "data": {
        "id": 1,
        "name": "Nico Lopez",
        "username": "nicolopez",
        "bio": "Amante de los batidos saludables",
        "avatar": null,
        "followers_count": 2,
        "following_count": 1,
        "created_at": "2026-03-22T15:00:00.000000Z"
    }
}
```

---

### PUT `/users/{id}` 🔒

Actualiza el perfil propio. Solo el propio usuario puede editarlo (devuelve `403` si se intenta editar a otro). Todos los campos son opcionales.

**Body:**
```json
{
    "name": "Nicolas Lopez",
    "username": "nicolaslopez",
    "bio": "Amante de los batidos saludables",
    "avatar": "https://ejemplo.com/mi-foto.jpg"
}
```

**Respuesta `200`:** el objeto del usuario actualizado.

---

### POST `/users/{id}/follow` 🔒

Sigue al usuario con el `id` indicado. Si ya lo sigues, no hace nada (idempotente).

**Respuesta `200`:**
```json
{ "message": "Followed" }
```

---

### DELETE `/users/{id}/follow` 🔒

Deja de seguir al usuario con el `id` indicado.

**Respuesta `200`:**
```json
{ "message": "Unfollowed" }
```

---

### GET `/users/{id}/followers`

Devuelve la lista de usuarios que siguen al usuario indicado.

**Respuesta `200`:** array de objetos `UserResource`.

---

### GET `/users/{id}/following`

Devuelve la lista de usuarios a los que sigue el usuario indicado.

**Respuesta `200`:** array de objetos `UserResource`.

---

## Tags

### GET `/tags`

Devuelve todos los tags ordenados alfabéticamente. Acepta `?search=texto` para filtrar por nombre (útil para autocompletado).

Ejemplo: `GET /tags?search=veg`

**Respuesta `200`:**
```json
{
    "data": [
        { "id": 1, "name": "vegano" },
        { "id": 2, "name": "verde" }
    ]
}
```

---

## Códigos de error comunes

| Código | Motivo |
|--------|--------|
| `401` | Token no enviado o inválido |
| `403` | Acción no permitida (ej: editar post de otro usuario) |
| `404` | Recurso no encontrado |
| `422` | Error de validación — el cuerpo de la respuesta incluye un objeto `errors` con el detalle por campo |