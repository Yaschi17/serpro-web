import { process } from "@/content/landing";
import { Card, Section, SectionHeader } from "@/components/landing/ui";

export function Process() {
  return (
    <Section id="proceso" scene="aurora">
      <SectionHeader label={process.label} title={process.title} description={process.description} />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step) => (
          <Card key={step.step} className="p-5">
            <span className="text-xs font-mono text-primary">{step.step}</span>
            <h3 className="mt-2 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
