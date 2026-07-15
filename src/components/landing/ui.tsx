import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto max-w-6xl px-6", className)}>{children}</div>;
}

export type SectionScene =
  | "default"
  | "mesh"
  | "pink"
  | "blue"
  | "dual"
  | "grid"
  | "muted"
  | "aurora"
  | "contact";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  scene?: SectionScene;
  divider?: boolean;
  fullWidth?: boolean;
};

export function Section({
  id,
  children,
  className,
  scene = "default",
  divider = true,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("section", `section--${scene}`, divider && "section--divider", className)}
    >
      <div className="section__bg" aria-hidden />
      {fullWidth ? (
        <div className="section__inner section__inner--wide">{children}</div>
      ) : (
        <Container className="section__inner">{children}</Container>
      )}
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  className,
}: {
  label: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="label">{label}</p>
      <h2 className="title mt-3">{title}</h2>
      {description ? <p className="desc mt-4">{description}</p> : null}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("card", className)}>{children}</div>;
}

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <a className={cn(variant === "primary" ? "btn-primary" : "btn-outline", className)} {...props}>
      {children}
    </a>
  );
}
