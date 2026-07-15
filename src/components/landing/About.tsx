import { about } from "@/content/landing";
import { ChevronRight, Clock } from "lucide-react";
import { Card, Section, SectionHeader } from "@/components/landing/ui";

export function About() {
  return (
    <Section id="nosotros" scene="dual">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeader label={about.label} title={about.title} />
          {about.paragraphs.map((p) => (
            <p key={p} className="desc mt-4">
              {p}
            </p>
          ))}
        </div>

        <Card className="p-8">
          <h3 className="text-lg font-semibold">Por qué confiar en SerPro</h3>
          <ul className="mt-5 space-y-3">
            {about.values.map((value) => (
              <li key={value} className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-primary" />
                {value}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/15">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{about.highlight.title}</p>
              <p className="text-sm text-muted-foreground">{about.highlight.description}</p>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
