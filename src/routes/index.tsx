import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/landing/About";
import { Brands } from "@/components/landing/Brands";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PointOfSale } from "@/components/landing/PointOfSale";
import { Process } from "@/components/landing/Process";
import { Projects } from "@/components/landing/Projects";
import { Services } from "@/components/landing/Services";
import { Testimonials } from "@/components/landing/Testimonials";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { PageAtmosphere } from "@/components/landing/PageAtmosphere";
import { site } from "@/content/landing";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: `${site.name} — Infraestructura Tecnológica y Sistemas de Punto de Venta` },
      {
        name: "description",
        content: `${site.name}: instalaciones profesionales, seguridad electrónica, redes, soporte técnico y sistemas de punto de venta para empresas en Guatemala. PBX ${site.phone}.`,
      },
    ],
  }),
});

function HomePage() {
  return (
    <div className="page">
      <PageAtmosphere />
      <main className="page__content">
        <Header />
        <Hero />
        <Brands />
        <PointOfSale />
        <Services />
        <Projects />
        <Testimonials />
        <About />
        <Process />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </main>
    </div>
  );
}
