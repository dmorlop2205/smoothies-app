# BlendUs 🍹 - Guía de Inicio

¡Hola! Bienvenido a **BlendUs**, la red social definitiva para amantes de los smoothies. Aquí tienes todo lo necesario para poner el proyecto a funcionar en un segundo.

## Lanzamiento (Dockerizado) 🐳

El proyecto (Frontend, Backend, Base de Datos e IA) corre dentro de contenedores.

**Paso Único - Arrancar todo:**
```bash
cd David
docker compose up -d
```

**Configuración Inicial (Solo la primera vez):**
Si es la primera vez que lo lanzas o quieres resetear los datos, ejecuta esto:

```bash
# Migrar y sembrar datos
docker exec blendus-backend php artisan migrate:fresh --seed

# Descargar los modelos de IA (puede tardar unos minutos según tu internet)
docker exec ollama ollama pull llama3.2:1b
docker exec ollama ollama pull nomic-embed-text

# Generar vectores para el sistema de recomendación
docker exec blendus-backend php artisan smoothies:generate-embeddings
```

## Entrada al sitio
*   **Frontend:** [http://localhost:4321](http://localhost:4321)
*   **API / Backend:** [http://localhost:8000](http://localhost:8000)

---

## ⚠️ Si cambias de PC

El **código** viaja contigo via Git. Lo que **no** viene:

| Qué | Dónde vive | Cómo recuperarlo |
|-----|-----------|-----------------|
| Datos de la BD | Docker volume `postgres_data` | `migrate:fresh --seed` (datos de prueba) o exportar con `pg_dump` |
| Modelos de IA | Docker volume `ollama_data` | `ollama pull llama3.2:1b` y `ollama pull nomic-embed-text` |
| Dependencias | `node_modules`, `vendor/` | Se instalan automáticamente al hacer `docker compose up` |

---

## Cuentas de Prueba
Para que no tengas que crear una desde cero (aunque puedes hacerlo en `/register`), aquí tienes unas cuantas:

| Nombre | Usuario | Email | Contraseña |
|------|----------|-------|----------|
| Usuario Test | testuser | test@example.com | password |
| Nico | nico | nico@test.com | password123 |
| Paco | paco | paco@test.com | password123 |

> **Nota:** La base de datos también cuenta con otros 12 usuarios adicionales generados aleatoriamente (con nombres y correos ficticios) que interactúan con las publicaciones dando likes y dejando comentarios, pero sus credenciales cambian cada vez que se reinicia la base de datos, por lo que te recomendamos usar siempre estas 3 cuentas principales.

---

## ¿Qué puedes hacer en BlendUs? (Features)

Hemos puesto mucho cariño en los detalles. Esto es lo que ya está programado:

*   **Comunidad de Smoothies:** Explora un feed infinito con fotos espectaculares y recetas reales.
*   **Interacción Total:** Dale a "Like" a tus favoritos, guarda recetas para verlas luego y comenta para compartir tu opinión.
*   **Perfil Personalizado:** Gestiona tus propias creaciones, mira tus posts guardados y las fotos que te han gustado, todo organizado por pestañas.
*   **Explorar (Explore):** Grid estilo Instagram con buscador de recetas y panel de filtros por etiquetas.
*   **Descubrimiento Inteligente:** Filtra por categorías (Verde, Tropical, Proteico...) y recibe sugerencias de usuarios a los que seguir.
*   **Modo Invitado:** Cualquiera puede navegar y ver las recetas sin necesidad de registrarse.
*   **Edición Avanzada:** Sube tus fotos, añade ingredientes detallados, pasos de preparación y etiquetas. ¡Y si te equivocas, tienes un botón para revertir los cambios!
*   **Ranking Personalizado (IA):** Tu feed "For You" se adapta a tus gustos. Cuanto más interactúes (likes/guardados), mejor entenderá la IA qué smoothies te gustan.
*   **AI Sommelier 🍷:** Describe tu estado de ánimo y Chef Enrique te recomendará el smoothie perfecto del catálogo. Accesible desde la página Explore.
*   **AI Recipe Generator ✨:** Al crear un post, puedes escribir una idea y la IA genera la receta completa automáticamente (nombre, ingredientes, pasos, etiquetas).
*   **AI Cooking Assistant 👨‍🍳:** En la vista de un post, abre el asistente paso a paso para cocinar con ayuda de Chef Enrique en tiempo real.
*   **Hub de Mensajería 💬:** Chats directos y grupos. Actualizaciones en tiempo real mediante polling automático. Accesible desde cualquier página con el widget lateral.

---

## Activación de Pagos con Stripe 💳

Para que las compras del **Marketplace** funcionen en tu entorno local (y así poder procesar y verificar los pagos correctamente), necesitas enlazar tu ordenador con Stripe siguiendo estos 3 rápidos pasos:

1. **Inicia sesión en Stripe CLI:**
   Abre una terminal y ejecuta:
   ```bash
   stripe login
   ```
   *(Sigue el enlace que aparece en pantalla para autorizar tu cuenta).*

2. **Abre el túnel (Listener):**
   En esa misma terminal, conecta Stripe con tu backend local ejecutando:
   ```bash
   stripe listen --forward-to localhost:8000/api/stripe/webhook
   ```

3. **Configura tu Secreto:**
   El comando anterior te imprimirá un mensaje diciendo: `Ready! Your webhook signing secret is whsec_...`
   Copia ese código `whsec_...` y pégalo en tu archivo `.env` (dentro de `smoothies-api/`):
   ```dotenv
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

> **Importante:** Debes dejar la terminal del Listener (paso 2) abierta mientras estés probando la tienda. Si la cierras, los pagos se procesarán en Stripe pero tu base de datos local nunca se enterará.