import Image from "next/image";

import type { Prose } from "@/content/copy";

import Eyebrow from "./Eyebrow";
import Section from "./Section";

/**
 * The <h1> block that opens every page except the homepage, which uses Hero.
 *
 * With `image` set it renders as a short photo header under an ink overlay,
 * matching the page headers on the source site; without one it falls back to
 * type on paper.
 */
export default function PageIntro({ prose }: { prose: Prose }) {
  if (!prose.image) {
    return (
      <Section reveal={false} labelledBy="page-title">
        <Eyebrow>{prose.eyebrow}</Eyebrow>
        <h1 id="page-title" className="text-display-xl">
          {prose.heading}
        </h1>
        <div className="measure mt-8 space-y-5">
          {prose.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="text-slate text-body-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <section
      aria-labelledby="page-title"
      className="bg-ink text-paper relative overflow-hidden py-24 md:py-36"
    >
      <Image
        src={prose.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="bg-ink/70 absolute inset-0" />

      <div className="max-w-site relative mx-auto w-full px-6 lg:px-12">
        <Eyebrow onDark>{prose.eyebrow}</Eyebrow>
        <h1 id="page-title" className="text-display-xl">
          {prose.heading}
        </h1>
        <div className="measure mt-8 space-y-5">
          {prose.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="text-paper/90 text-body-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
