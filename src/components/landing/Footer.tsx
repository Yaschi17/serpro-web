import logo from "@/assets/serpro-logo.png";
import { nav, site } from "@/content/landing";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
        <div>
          <img src={logo} alt={site.name} className="h-9 w-auto" />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{site.footer}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">Enlaces</p>
          <ul className="mt-3 space-y-2">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Contacto</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <a href={`tel:${site.phoneTel}`} className="hover:text-foreground">
              PBX {site.phone}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="hover:text-foreground">
              WhatsApp: +502 {site.phone}
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer" className="hover:text-foreground">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <p className="relative z-10 mx-auto mt-10 max-w-6xl px-6 text-center text-xs text-muted-foreground md:text-left">
        © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
