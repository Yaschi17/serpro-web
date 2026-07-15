#!/bin/bash
# Primera instalación en el servidor (una sola vez)
set -e

REPO_URL="${1:-https://github.com/Yaschi17/serprotechno-web.git}"
TARGET="${2:-/home/serpro/serprotechno-web}"

echo "=== Instalando serprotechno-web en $TARGET ==="

if [ -d "$TARGET/.git" ]; then
  echo "Ya existe el repo. Usa: cd $TARGET && bash scripts/update.sh"
  exit 0
fi

git clone "$REPO_URL" "$TARGET"
cd "$TARGET"
cp -n .env.example .env || true
sed -i 's/\r$//' scripts/*.sh 2>/dev/null || true
chmod +x scripts/*.sh
bash scripts/update.sh

echo
echo "Listo. Configure Cloudflare Tunnel (docs/DESPLIEGUE-SERVIDOR.md)"
echo "Luego: edite .env con CLOUDFLARE_TUNNEL_TOKEN y:"
echo "  docker compose --profile tunnel up -d"
