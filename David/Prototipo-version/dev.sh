#!/bin/bash

# This script launches both the Laravel Backend and Astro Frontend
# and ensures both are killed when you press Ctrl+C.

# Exit on error
set -e

# Kill background processes on exit
trap "kill 0" EXIT

echo "------------------------------------------------"
echo "🍧 Launching BlendUs Development Environment..."
echo "------------------------------------------------"

# 1. Start Laravel Backend (on port 8000 by default)
echo "📡 [Backend] Starting Laravel at http://localhost:8000"
(cd smoothies-api && php artisan serve) &

# 2. Give the backend a second to breathe
sleep 1

# 3. Start Astro Frontend (on port 4321 by default)
echo "🎨 [Frontend] Starting Astro at http://localhost:4321"
(cd blendus-frontend && npm run dev) &

echo "------------------------------------------------"
echo "🚀 Both servers are running!"
echo "➡️  Frontend: http://localhost:4321"
echo "➡️  Backend:  http://localhost:8000"
echo "💡 Press Ctrl+C to stop both servers."
echo "------------------------------------------------"

# Wait for background processes to finish (they won't until Ctrl+C)
wait
