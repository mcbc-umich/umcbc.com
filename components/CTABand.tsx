import Image from "next/image";

import Button from "./Button";
import Section from "./Section";

export interface CTABandProps {
  heading: string;
  label: string;
  href: string;
  id?: string;
  /** Optional photo, anchored right under a left-to-right gradient. */
  image?: string;
}

export default function CTABand({
  heading,
  label,
  href,
  id,
  image,
}: CTABandProps) {
  const headingId = id ?? "cta-heading";

  if (!image) {
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

  return (
    // Laid out directly rather than through <Section> so the photo can sit
    // behind the full width of the band instead of inside the container.
    // Padding matches Section exactly (§5.3).
    <section
      aria-labelledby={headingId}
      className="bg-ink text-paper relative overflow-hidden py-20 md:py-32"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      {/* Ink at the left where the words are, clearing to the photo on the
          right. The second layer keeps the far edge from blowing out on very
          wide screens. */}
      <div
        aria-hidden="true"
        className="from-ink via-ink/85 absolute inset-0 bg-gradient-to-r to-transparent"
      />
      <div
        aria-hidden="true"
        className="from-ink/60 absolute inset-0 bg-gradient-to-t to-transparent"
      />

      <div className="max-w-site relative mx-auto w-full px-6 lg:px-12">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 id={headingId} className="text-display-lg max-w-[18ch]">
            {heading}
          </h2>
          <Button href={href} variant="primary" onDark className="shrink-0">
            {label}
          </Button>
        </div>
      </div>
    </section>
  );
}
