# Despliegue — SerPro Technology (landing serprotechno.com)

Mismo flujo que **panel-control** y **abarroteria-pos**:

```
PC (cambios) → git push GitHub → publicar.bat → SSH servidor → docker rebuild → Cloudflare Tunnel → internet
```

| Proyecto | Carpeta servidor | Dominio |
|----------|------------------|---------|
| panel-control | `/home/serpro/panel-control` | `serprotechno.org` |
| Abarrotería POS | `/home/serpro/abarroteria` | `posserprotechno.org` |
| **Landing web** | `/home/serpro/serpro-web` | **`serprotechno.com`** |

Repo GitHub: `https://github.com/Yaschi17/serpro-web.git`

## 1. Una sola vez en esta PC

1. Copia `deploy.local.example.bat` → `deploy.local.bat`
2. Ajusta `SERVER_HOST` / `SERVER_PASS` (igual que el panel)
3. Ejecuta `configurar-acceso.bat` (si ya tienes llave del panel, la reutiliza)

## 2. Una sola vez en el servidor

```bash
cd /home/serpro
git clone https://github.com/Yaschi17/serpro-web.git serpro-web
cd serpro-web
cp .env.example .env
bash scripts/update.sh
```

El sitio queda en **http://127.0.0.1:3000** dentro del servidor.

## 3. Cloudflare Tunnel (serprotechno.com)

1. [Cloudflare Zero Trust](https://one.dash.cloudflare.com) → **Networks** → **Tunnels**
2. Usa el túnel existente de SerPro **o** crea uno: `serpro-web`
3. **Public Hostname** → Add:

| Campo | Valor |
|-------|--------|
| Subdomain | *(vacío)* o `www` |
| Domain | `serprotechno.com` |
| Service | `http://localhost:3000` |

Si el túnel corre **dentro de Docker** (perfil `tunnel`), el service debe ser:

`http://app:3000`

4. Copia el token del túnel a `.env` del servidor:

```env
CLOUDFLARE_TUNNEL_TOKEN=eyJ...
```

5. Arranca el túnel:

```bash
cd /home/serpro/serpro-web
docker compose --profile tunnel up -d
```

DNS del dominio ya debe estar en Cloudflare (nameservers). Con **Public Hostname** Cloudflare crea el registro automáticamente.

## 4. Publicar cambios (día a día)

En Windows, desde la carpeta del proyecto:

```
publicar.bat
```

Eso hace: commit → push GitHub → pull en servidor → `docker compose build` → listo.

## Puertos en el servidor

| App | Puerto local |
|-----|--------------|
| panel-control | (su puerto Docker) |
| abarroteria | `4000` |
| **landing web** | **`3000`** |
