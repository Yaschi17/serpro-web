import heroBg from "@/assets/hero-bg.jpg";
import { hero, site, stats } from "@/content/landing";
import { ArrowRight } from "lucide-react";
import { Button, Container } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

const PARTICLES = 14;

export function Hero() {
  return (
    <section id="inicio" className="section section--hero">
      <div className="section__bg" aria-hidden />
      <div className="hero__mesh" aria-hidden />
      <img src={heroBg} alt="" className="hero__image" aria-hidden />
      <div className="hero__orb hero__orb--pink" aria-hidden />
      <div className="hero__orb hero__orb--blue" aria-hidden />
      <div className="hero__orb hero__orb--rose" aria-hidden />
      <div className="hero__ring" aria-hidden />
      <div className="hero__ring hero__ring--blue" aria-hidden />
      <div className="hero__shimmer" aria-hidden />
      <div className="hero__scan" aria-hidden />
      <div className="hero__particles" aria-hidden>
        {Array.from({ length: PARTICLES }, (_, i) => (
          <span key={i} className="hero__particle" />
        ))}
      </div>

      <Container className="section__inner relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="hero__content max-w-3xl">
          <p className="label hero__reveal hero__reveal--1">{site.tagline}</p>
          <h1 className="hero__reveal hero__reveal--2 mt-4 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            {hero.title}{" "}
            <span className="gradient-text gradient-text--live">{hero.highlight}</span>
          </h1>
          <p className="desc hero__reveal hero__reveal--3 mt-6 max-w-2xl text-lg">{hero.description}</p>

          <div className="hero__reveal hero__reveal--4 mt-10 flex flex-wrap gap-3">
            <Button href={site.whatsapp} target="_blank" rel="noreferrer" className="hero__cta group px-6 py-3">
              Solicitar cotización
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href="#punto-de-venta" variant="outline" className="px-6 py-3">
              Conocer punto de venta
            </Button>
          </div>
        </div>

        <div className="hero__stats mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "card card--stat hero__stat px-5 py-4",
                i % 2 === 0 ? "card--accent-pink" : "card--accent-blue",
              )}
              style={{ animationDelay: `${0.5 + i * 0.12}s` }}
            >
              <p className="hero__stat-value text-2xl font-semibold md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
