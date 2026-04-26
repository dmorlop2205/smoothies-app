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
Si es la primera vez que lo lanzas o quieres resetear los datos, ejecuta esto dentro del contenedor:

```bash
# Migrar y sembrar datos
docker exec blendus-backend php artisan migrate:fresh --seed

# Generar vectores para el sistema de recomendación
docker exec blendus-backend php artisan smoothies:generate-embeddings
```

## Entrada al sitio
*   **Frontend:** [http://localhost:4321](http://localhost:4321)
*   **API / Backend:** [http://localhost:8000](http://localhost:8000)

---

## Cuentas de Prueba
Para que no tengas que crear una desde cero (aunque puedes hacerlo en `/register`), aquí tienes unas cuantas:

| Nombre | Usuario | Email | Contraseña |
|------|----------|-------|----------|
| Usuario Test | testuser | test@example.com | password |
| Nico | nico | nico@test.com | password123 |
| Paco | paco | paco@test.com | password123 |

---

## ¿Qué puedes hacer en BlendUs? (Features)

Hemos puesto mucho cariño en los detalles. Esto es lo que ya puedes esta programado:

*   **Comunidad de Smoothies:** Explora un feed infinito con fotos espectaculares y recetas reales.
*   **Interacción Total:** Dale a "Like" a tus favoritos, guarda recetas para verlas luego y comenta para compartir tu opinión.
*   **Perfil Personalizado:** Gestiona tus propias creaciones, mira tus posts guardados y las fotos que te han gustado, todo organizado por pestañas.
*   **Descubrimiento Inteligente:** Filtra por categorías (Verde, Tropical, Proteico...) y recibe sugerencias de usuarios a los que seguir.
*   **Modo Invitado:** Cualquiera puede navegar y ver las recetas sin necesidad de registrarse.
*   **Edición Avanzada:** Sube tus fotos, añade ingredientes detallados, pasos de preparación y etiquetas. ¡Y si te equivocas, tienes un botón para revertir los cambios!
*   **Ranking Personalizado (IA):** Tu feed se adapta a tus gustos. Cuanto más interactúes (likes/guardados), mejor entenderá la IA qué smoothies te gustan y los pondrá arriba.