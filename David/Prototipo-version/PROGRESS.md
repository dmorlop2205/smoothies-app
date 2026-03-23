# BlendUs Prototipo: Estado y Progreso 🚀

Este documento resume el progreso actual de la integración entre la API v2 (Nico) y el Frontend v1.1 (Paco) en la rama/carpeta `Prototipo-version`.

## ✅ Lo que ya está hecho (Trabajo 100% del Equipo)
El corazón de la aplicación ya está perfectamente integrado y funcionando:
- **Backend API:** Toda la API, servicios, recursos, roles, autenticación con Laravel Sanctum (tokens), base de datos relacional y migraciones (`ingredients`, `tags`, `posts`, `users`, `comments`, `likes`). Todo funcionando sin errores.
- **Cliente API :** Vínculo 100% exacto con los endpoints de Nico (`api.ts`). Soporta peticiones protegidas capturando el token automáticamente del `localStorage`.
- **Navegación:** Barra superior, menú lateral y diseño estructural (`NavComponent`).
- **Feed Principal:** El `Feed.tsx` renderiza tarjetas preciosas, filtra por etiquetas y maneja paginación (`meta.last_page`).
- **Creación y Edición de Smoothies:** Los formularios `CreatePostForm` y `EditPostForm` con arrastre de imágenes, parseo de ingredientes, y envío por `FormData` al backend.
- **Interacciones Básicas:** Dar likes a los posts y actualizar la interfaz instantáneamente.

---

## 🤖 Lo que es temporal (Hecho con IA para pruebas)
Para que el prototipo no rompa al navegar y se pueda probar la experiencia completa, se han añadido algunos componentes y páginas generados por IA. **Estos están listos para ser rediseñados en el futuro:**
- **Autenticación:** Las páginas de Login (`/login`) y Registro (`/register`), incluyendo su lógica de formulario (`AuthForm.tsx`).
- **Vista de Receta (Post):** La página individual de un smoothie (`/post/[id]`) y su motor de comentarios (`PostDetails.tsx`).
- **Perfiles de Usuario:** La página de perfil público (`/profile/[id]`) que muestra la información del usuario y su cuadrícula de batidos.
- **Explorar:** La pestaña de buscar/explorar del menú izquierdo (`/explore`).
- **Usuarios Sugeridos:** El panel lateral derecho (`SuggestedUsers.tsx`). Funciona con un endpoint simulado o datos estáticos, ya que la API no lo implementa aún.

---