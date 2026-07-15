import { testimonials } from "@/content/landing";
import { Quote } from "lucide-react";
import { Card, Section, SectionHeader } from "@/components/landing/ui";

export function Testimonials() {
  return (
    <Section id="testimonios" scene="muted">
      <SectionHeader
        label={testimonials.label}
        title={testimonials.title}
        description={testimonials.description}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {testimonials.items.map((item) => (
          <Card key={item.name} className="flex flex-col p-6">
            <Quote className="h-7 w-7 text-primary/70" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.business}</p>
              <p className="mt-1 text-xs text-primary">{item.service}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
