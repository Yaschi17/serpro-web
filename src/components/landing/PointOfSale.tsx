import { pos, site } from "@/content/landing";
import { Check, CreditCard } from "lucide-react";
import { Button, Card, Section, SectionHeader } from "@/components/landing/ui";

export function PointOfSale() {
  return (
    <Section id="punto-de-venta" scene="pink">
      <div className="grid items-start gap-14 lg:grid-cols-2">
        <div>
          <SectionHeader label={pos.label} title={pos.title} description={pos.description} />
          <ul className="mt-8 space-y-3">
            {pos.bullets.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={site.whatsappPos} target="_blank" rel="noreferrer" className="px-6 py-3">
              <CreditCard className="h-4 w-4" />
              Cotizar sistema POS
            </Button>
            <Button href="#contacto" variant="outline" className="px-6 py-3">
              Agendar demostración
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {pos.features.map((feature) => (
            <Card key={feature.title} className="p-5">
              <h3 className="text-sm font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
