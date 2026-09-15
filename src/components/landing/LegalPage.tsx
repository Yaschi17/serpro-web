import { Link } from "@tanstack/react-router";
import logo from "@/assets/serpro-logo.png";
import { site } from "@/content/landing";
import { legalLinks, legalMeta, type LegalDocument } from "@/content/legal";
import { Footer } from "@/components/landing/Footer";
import { PageAtmosphere } from "@/components/landing/PageAtmosphere";

type LegalPageProps = {
  document: LegalDocument;
};

export function LegalPage({ document }: LegalPageProps) {
  return (
    <div className="page">
      <PageAtmosphere />
      <main className="page__content">
        <header className="site-header fixed inset-x-0 top-0 z-50">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link to="/">
              <img src={logo} alt={site.name} className="h-12 w-auto md:h-14" />
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Volver al inicio
            </Link>
          </div>
        </header>

        <article className="legal-page">
          <div className="legal-page__inner">
            <p className="label">Información legal</p>
            <h1 className="legal-page__title">{document.title}</h1>
            <p className="legal-page__summary">{document.summary}</p>
            <p className="legal-page__meta">
              Última actualización: {legalMeta.lastUpdated} · {legalMeta.company}
            </p>

            <nav className="legal-page__nav" aria-label="Documentos legales">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={link.href === `/${document.slug}` ? "is-active" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="legal-page__sections">
              {document.sections.map((section) => (
                <section key={section.title} className="legal-section">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item.slice(0, 40)}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </article>

        <Footer />
      </main>
    </div>
  );
}
