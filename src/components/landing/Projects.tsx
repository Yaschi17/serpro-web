import heroBg from "@/assets/hero-bg.jpg";
import { projects } from "@/content/landing";
import { Card, Section, SectionHeader } from "@/components/landing/ui";

export function Projects() {
  return (
    <Section id="proyectos" scene="grid">
      <SectionHeader label={projects.label} title={projects.title} description={projects.description} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.items.map((project) => (
          <Card key={project.title} className="overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = heroBg;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-md bg-background/85 px-2 py-1 text-xs font-medium text-primary">
                {project.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold">{project.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{project.location}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
