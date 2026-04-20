# BlendUs 🍹 - Guía de Inicio

¡Hola! Bienvenido a **BlendUs**, la red social definitiva para amantes de los smoothies. Aquí tienes todo lo necesario para poner el proyecto a funcionar en un segundo.

## Lanzamiento Rápido (Recomendado)

Antes de iniciar el servidor, asegúrate de encender el motor de Inteligencia Artificial (Ollama) para que funcione el creador y el sommelier.

**Paso 1 - Motor de IA (Ollama):**
```bash
cd David
docker compose up -d
```

**Paso 2 - Servidores Backend y Frontend:**
Para arrancar tanto el servidor de datos como la interfaz a la vez, ejecuta:
```bash
cd David/Prototipo-version
./dev.sh
```
Esto abrirá todo automáticamente. Cuando quieras parar, simplemente pulsa `Ctrl+C`.

---

## Lanzamiento Manual (Por separado)
Si prefieres un lanzado manual, recuerda arrancar siempre primero el Docker y luego abrir el resto en terminales distintos:

**Terminal 1 — Motor de IA (Docker):**
```bash
cd David
docker compose up -d
```

**Terminal 2 — El Backend (Laravel):**
```bash
cd David/Prototipo-version/smoothies-api
php artisan serve 
```

**Terminal 3 — El Frontend (Astro/React):**
```bash
cd David/Prototipo-version/blendus-frontend
npm run dev
```

## Entrada al sitio
Una vez encendido, abre tu navegador en: **http://localhost:4321**

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