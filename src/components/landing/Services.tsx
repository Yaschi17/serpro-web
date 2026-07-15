import { services } from "@/content/landing";
import { Section, SectionHeader, Card } from "@/components/landing/ui";

export function Services() {
  return (
    <Section id="servicios" scene="blue">
      <SectionHeader label={services.label} title={services.title} description={services.description} />

      <div className="mt-14 space-y-12">
        {services.groups.map((group) => (
          <div key={group.title}>
            <div className="mb-5 border-b border-border pb-5">
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((item) => (
                <Card key={item.title} className="p-5">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
