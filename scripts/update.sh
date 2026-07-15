#!/bin/bash
# Actualización en producción — SerPro Technology (landing)
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "=== Actualizando serpro-web ==="

sed -i 's/\r$//' scripts/*.sh 2>/dev/null || true
chmod +x scripts/*.sh 2>/dev/null || true

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Se creo .env desde .env.example — configure CLOUDFLARE_TUNNEL_TOKEN si usa tunel."
fi

docker compose build app
docker compose up -d app

if [ -f .env ] && grep -q '^CLOUDFLARE_TUNNEL_TOKEN=.\+' .env 2>/dev/null; then
  docker compose --profile tunnel up -d cloudflared 2>/dev/null || true
fi

sleep 4
curl -sf http://127.0.0.1:3000/ >/dev/null && echo "Sitio OK en :3000" || docker compose logs --tail=40 app

echo "Actualizacion completada."
