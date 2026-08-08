import Image from "next/image";

import Button from "./Button";
import Eyebrow from "./Eyebrow";

export interface HeroProps {
  eyebrow: string;
  title: string;
  subhead: string;
  image: string;
  imageAlt: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export default function Hero({
  eyebrow,
  title,
  subhead,
  image,
  imageAlt,
  primary,
  secondary,
}: HeroProps) {
  return (
    // -mt-20 pulls the hero up under the fixed header so the header can be
    // transparent over it; the matching pt-20 keeps content clear of it.
    <section className="bg-ink text-paper relative -mt-20 flex min-h-svh items-center overflow-hidden pt-20">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Ink overlay at 55% (§7.1). */}
      <div aria-hidden="true" className="bg-ink/55 absolute inset-0" />

      <div className="max-w-site relative mx-auto w-full px-6 py-20 lg:px-12">
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <h1 className="text-display-xl max-w-[16ch]">{title}</h1>
        <p className="measure text-body-lg text-paper/90 mt-8">{subhead}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href={primary.href} variant="primary" onDark>
            {primary.label}
          </Button>
          <Button href={secondary.href} variant="secondary" onDark>
            {secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
