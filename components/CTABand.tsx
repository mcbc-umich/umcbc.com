import Button from "./Button";
import Section from "./Section";

export interface CTABandProps {
  heading: string;
  label: string;
  href: string;
  id?: string;
}

export default function CTABand({ heading, label, href, id }: CTABandProps) {
  const headingId = id ?? "cta-heading";
  return (
    <Section background="ink" labelledBy={headingId}>
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <h2 id={headingId} className="text-display-lg">
          {heading}
        </h2>
        <Button href={href} variant="primary" onDark className="shrink-0">
          {label}
        </Button>
      </div>
    </Section>
  );
}
