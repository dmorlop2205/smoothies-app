# BlendUs Prototipo: Estado y Progreso 🚀

Este documento resume el progreso actual de la integración entre la API v2 (Nico) y el Frontend v1.1 (Paco) en la rama `Prototipo-version`.

## ✅ Lo que ya está hecho (Componentes Finales 100% Equipo)
El núcleo de la aplicación ya está perfectamente integrado, enrutado y funcionando con código nativo del equipo:
- **Backend API:** Toda la API, recursos, roles, autenticación con Laravel Sanctum (tokens), base de datos relacional y migraciones (`ingredients`, `tags`, `posts`, `users`, `comments`, `likes`). Todo funcionando sin errores.
- **Cliente API:** El archivo `api.ts` está sincronizado 100% con los endpoints de Nico, soportando peticiones protegidas y paginación.
- **Navegación:** Barra superior, diseño estructural (`Layout`) y enrutamiento por páginas (Astro + TSX).
- **Smoothies (Feed y Explorar):** Renderizado de las tarjetas (`PostCard.tsx`), filtros por etiquetas (`ExplorePage.tsx`), arrastre de imágenes, parseo de ingredientes, y publicación en la base de datos a través de `FormData`.
- **Interacciones:** Dar y quitar likes, expandir listas de ingredientes dinámicos y cargar comentarios bajo demanda.

---

## 🚧 Brechas Actuales y Tareas Pendientes
Para convertir el prototipo actual en el producto final al 100%, existen discrepancias entre lo que ofrece la API y lo que tiene el Frontend. Actualmente usamos algunos componentes funcionales temporales para rellenar vacíos.

### 1. Perfiles y Relaciones Sociales
- **Progreso:** La vista individual del perfil (`/profile/[id]`) funciona integrando el feed final de Paco.
- **Brecha Frontend:** Faltan vistas para **Editar Perfil** (`PUT /users/{user}`) y listar el volumen de Seguidores/Siguiendo (`GET /users/{user}/followers`). 
- **Brecha Backend:** El panel derecho (`SuggestedUsers.tsx`) usa datos simulados o pide `GET /api/users/suggested`, endpoint que el backend aún no implementa.

### 2. Moderación de Contenido
- **Brecha Frontend:** Aunque el backend lo permite mediante su SDK de endpoints (`DELETE /posts/{post}` y `DELETE /posts/{post}/comments/{comment}`), la interfaz de Paco **no tiene aún botones diseñados de "Borrar"** en las tarjetas ni en los detalles.

### 3. Autenticación, Roles y Auth
- **Progreso:** El sistema inyecta el token y bloquea la navegación de forma nativa.
- **Brecha Visual:** (RESUELTA) Paco y el backend terminaron la integración! Diseños separados de Login y Registro implementados y conectados con `api.ts`.

### 4. Recetas e Inteligencia de Búsqueda
- **Progreso:** El sistema de comentarios se carga directamente bajo la imagen en la vista individual.
- **Brecha Backend:** La barra de búsqueda de la sección Explorar actualmente filtra resultados en vivo desde el navegador. Para que scale a miles de recetas, **el Backend deberá crear un motor de búsqueda** para parámetros como `GET /posts?search=...`. 