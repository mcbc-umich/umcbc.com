import type { Prose } from "@/content/copy";

import Eyebrow from "./Eyebrow";
import Section from "./Section";

/**
 * The <h1> block that opens every page except the homepage, which uses Hero.
 */
export default function PageIntro({ prose }: { prose: Prose }) {
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
