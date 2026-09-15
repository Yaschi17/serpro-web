import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { CookieBanner } from "@/components/landing/CookieBanner";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SerPro Technology — Infraestructura Tecnológica y Punto de Venta" },
      { name: "description", content: "SerPro Technology: seguridad electrónica, redes, soporte técnico y sistemas de punto de venta para empresas en Guatemala. PBX 5722-7118." },
      { name: "author", content: "SerPro Technology" },
      { property: "og:title", content: "SerPro Technology" },
      { property: "og:description", content: "Soluciones tecnológicas integrales para empresas: seguridad, redes, soporte y punto de venta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "SerPro Technology" },
      { name: "twitter:description", content: "Soluciones tecnológicas, redes, seguridad e instalaciones profesionales. PBX 5722-7118." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/28ab9b1b-3402-4e8a-8266-7e994a3cc990" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/28ab9b1b-3402-4e8a-8266-7e994a3cc990" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <CookieBanner />
    </>
  );
}
