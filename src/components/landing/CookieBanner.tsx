"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "serpro-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY);
      if (!accepted) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          Utilizamos cookies técnicas y de seguridad para el correcto funcionamiento del sitio. Al continuar navegando,
          acepta nuestro{" "}
          <Link to="/aviso-de-cookies" className="cookie-banner__link">
            aviso de cookies
          </Link>{" "}
          y nuestra{" "}
          <Link to="/politica-de-privacidad" className="cookie-banner__link">
            política de privacidad
          </Link>
          .
        </p>
        <div className="cookie-banner__actions">
          <Link to="/aviso-de-cookies" className="cookie-banner__secondary">
            Más información
          </Link>
          <button type="button" className="cookie-banner__accept" onClick={accept}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
