import type { Metadata } from "next";

import BulletList from "@/components/BulletList";
import CTABand from "@/components/CTABand";
import Eyebrow from "@/components/Eyebrow";
import LogoMarquee from "@/components/LogoMarquee";
import PageIntro from "@/components/PageIntro";
import PersonGrid from "@/components/PersonGrid";
import PhotoStrip from "@/components/PhotoStrip";
import Section, { Container } from "@/components/Section";
import { strategy } from "@/content/copy";
import { applyIfYouLike, engagements } from "@/content/engagements";
import { firms } from "@/content/firms";
import { projectManagers } from "@/content/people";

export const metadata: Metadata = {
  title: "Strategy",
  description:
    "MCBC Strategy places members on semester-long, client-facing consulting projects with local and national clients at the University of Michigan.",
  alternates: { canonical: "/strategy" },
};

export default function StrategyPage() {
  return (
    <>
      <PageIntro prose={strategy.intro} />

      <Section background="fog">
        <PhotoStrip photos={strategy.photoStrip} />
      </Section>

      <Section labelledBy="apply-if">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow />
            <h2 id="apply-if" className="text-display-lg">
              {strategy.applyIfHeading}
            </h2>
          </div>
          <BulletList items={applyIfYouLike.strategy} />
        </div>
      </Section>

      <Section background="fog" labelledBy="engagements">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow />
            <h2 id="engagements" className="text-display-lg">
              {strategy.engagementsHeading}
            </h2>
          </div>
          <BulletList items={engagements.strategy} />
        </div>
      </Section>

      <Section labelledBy="managers">
        <PersonGrid
          id="managers"
          heading={strategy.managersHeading}
          people={projectManagers}
        />
      </Section>

      <Section background="ink" bleed labelledBy="placement">
        <Container>
          <Eyebrow onDark />
          <h2 id="placement" className="text-display-lg">
            {strategy.placement.heading}
          </h2>
          <div className="measure mt-8">
            {strategy.placement.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-paper/80">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>

        <div className="mt-16">
          <LogoMarquee firms={firms} />
        </div>

        <Container>
          <p className="text-paper/80 font-display text-eyebrow mt-16 text-center uppercase">
            {strategy.placementSuffix}
          </p>
        </Container>
      </Section>

      <CTABand
        id="strategy-cta"
        heading={strategy.cta.heading}
        label={strategy.cta.label}
        href={strategy.cta.href}
      />
    </>
  );
}
