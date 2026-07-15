import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Servidor propio (Docker + Cloudflare Tunnel), igual que panel-control y abarroteria-pos.
// Preset node-server para correr en el VPS; no Workers.
export default defineConfig({
  nitro: {
    preset: "node-server",
  },
});
