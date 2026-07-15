"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/serpro-logo.png";
import { nav, site } from "@/content/landing";
import { Button } from "@/components/landing/ui";
import { MessageCircle, PhoneCall, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio">
          <img src={logo} alt={site.name} className="h-12 w-auto md:h-14" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneTel}`}
            className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground sm:flex"
          >
            <PhoneCall className="h-4 w-4" />
            {site.phone}
          </a>
          <Button href={site.whatsapp} target="_blank" rel="noreferrer" className="hidden sm:inline-flex">
            <MessageCircle className="h-4 w-4" />
            Contactar
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
            aria-label="Menú"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button href={site.whatsapp} target="_blank" rel="noreferrer" className="mt-4 w-full">
              Contactar por WhatsApp
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
