# Integración Stripe - Setup Rápido

## 1. Crear cuenta Stripe

Ve a [stripe.com](https://stripe.com), crea tu cuenta y asegúrate de estar en modo **Test**.

## 2. Obtener credenciales

Ve a **Developers > API Keys** en el dashboard de Stripe.

Copia tu `Secret Key` (sk_test_...) y `Publishable Key` (pk_test_...).

## 3. Configurar .env

Abre `.env` en la raíz de tu proyecto Laravel y agrega:

```dotenv
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:3000
```

Por ahora deja `STRIPE_WEBHOOK_SECRET` vacío, lo completarás en el paso 5.

## 4. Limpiar config

```bash
php artisan config:clear
```

## 5. Configurar Stripe CLI (local)

Descarga el CLI desde [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli).

al descargar el zip para windows, sadra un archivo stripe.exe
hay que ponerlo en alguna carpeta del windows y guardarlo como una variable de entorno (PATH)

si funciono correctamente desde un cmd puedes hacer

```bash
stripe --version
```

y si todo funciono bien deberia salir un mensaje asi: 

```bash
C:\Users\nicoe>stripe --version
stripe version 1.40.8
```

ahora autentica tu cuenta:

```bash
stripe login
```

Luego inicia el listener:

```bash
stripe listen --forward-to localhost:8000/api/stripe/webhook
```

Copia el `whsec_...` que te muestra y actualiza tu `.env`:

```dotenv
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 6. Probar

Mantén el listener activo en una terminal. En otra terminal corre tu API:

```bash
php artisan serve
```

Usa la tarjeta de prueba `4242 4242 4242 4242` (fecha futura, cualquier CVC) para hacer pagos de prueba.

Los webhooks deberían verse en tiempo real en la terminal del listener.

## Endpoints disponibles

```
GET  /api/marketplace/products              (público)
GET  /api/marketplace/products/{id}         (público)
POST /api/marketplace/products/{id}/checkout (requiere autenticación)
POST /api/stripe/webhook                    (recibe webhooks de Stripe)
```

## Notas

- El `STRIPE_WEBHOOK_SECRET` expira cada 90 días en modo test. Si no funciona, repite el paso 5.

- Los webhooks solo funcionan en local si tienes el Stripe CLI corriendo, hay que dejar el cmd abierto si quieren testearlo correctamente.