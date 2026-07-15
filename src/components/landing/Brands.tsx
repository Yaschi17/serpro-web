import { brandRows, brands } from "@/content/landing";
import { Container, Section, SectionHeader } from "@/components/landing/ui";

function markClass(name: string) {
  const len = name.length;
  if (len <= 4) return "brand-mark brand-mark--xl";
  if (len <= 7) return "brand-mark brand-mark--lg";
  if (len <= 10) return "brand-mark brand-mark--md";
  return "brand-mark brand-mark--sm";
}

function BrandMark({ name }: { name: string }) {
  return (
    <div className="brand-tile">
      <span className={markClass(name)}>{name}</span>
    </div>
  );
}

type MarqueeRowProps = {
  names: readonly string[];
  direction: "left" | "right";
  duration: number;
};

function MarqueeRow({ names, direction, duration }: MarqueeRowProps) {
  const track = [...names, ...names];

  return (
    <div className="brand-marquee">
      <div
        className={`brand-marquee__track brand-marquee__track--${direction}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((name, i) => (
          <BrandMark key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}

const rows: { direction: "left" | "right"; duration: number }[] = [
  { direction: "left", duration: 50 },
  { direction: "right", duration: 56 },
  { direction: "left", duration: 44 },
];

export function Brands() {
  return (
    <Section id="marcas" scene="mesh" divider fullWidth>
      <Container>
        <SectionHeader label="Tecnologías compatibles" title={brands.title} description={brands.description} />
      </Container>
      <div className="mt-10 space-y-3">
        {brandRows.map((row, i) => (
          <MarqueeRow key={i} names={row} direction={rows[i].direction} duration={rows[i].duration} />
        ))}
      </div>
    </Section>
  );
}
