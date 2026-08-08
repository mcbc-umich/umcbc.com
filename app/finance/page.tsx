import type { Metadata } from "next";

import BulletList from "@/components/BulletList";
import CTABand from "@/components/CTABand";
import Eyebrow from "@/components/Eyebrow";
import LogoMarquee from "@/components/LogoMarquee";
import PageIntro from "@/components/PageIntro";
import PersonGrid from "@/components/PersonGrid";
import PhotoStrip from "@/components/PhotoStrip";
import SectorCard from "@/components/SectorCard";
import Section, { Container } from "@/components/Section";
import { finance } from "@/content/copy";
import { applyIfYouLike, engagements } from "@/content/engagements";
import { firms } from "@/content/firms";
import { deskHeads } from "@/content/people";
import { sectors } from "@/content/sectors";

export const metadata: Metadata = {
  title: "Finance",
  description:
    "MCBC Finance trains members in financial analysis, valuation, and market research across seven investment sectors at the University of Michigan.",
  alternates: { canonical: "/finance" },
};

export default function FinancePage() {
  return (
    <>
      <PageIntro prose={finance.intro} />

      <Section background="fog">
        <PhotoStrip photos={finance.photoStrip} />
      </Section>

      <Section labelledBy="apply-if">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow />
            <h2 id="apply-if" className="text-display-lg">
              {finance.applyIfHeading}
            </h2>
          </div>
          <BulletList items={applyIfYouLike.finance} />
        </div>
      </Section>

      <Section background="fog" labelledBy="sectors">
        <Eyebrow />
        <h2 id="sectors" className="text-display-lg">
          {finance.sectorsHeading}
        </h2>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <li key={sector.name}>
              <SectorCard sector={sector} />
            </li>
          ))}
        </ul>
        <p className="measure text-slate text-body-lg mt-12">
          {finance.sectorsClosing}
        </p>
      </Section>

      <Section labelledBy="engagements">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow />
            <h2 id="engagements" className="text-display-lg">
              {finance.engagementsHeading}
            </h2>
          </div>
          <BulletList items={engagements.finance} />
        </div>
      </Section>

      <Section background="fog" labelledBy="desk-heads">
        <PersonGrid
          id="desk-heads"
          heading={finance.deskHeadsHeading}
          people={deskHeads}
        />
      </Section>

      <Section background="ink" bleed labelledBy="placement">
        <Container>
          <Eyebrow onDark />
          <h2 id="placement" className="text-display-lg">
            {finance.placement.heading}
          </h2>
          <div className="measure mt-8">
            {finance.placement.paragraphs.map((paragraph) => (
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
            {finance.placementSuffix}
          </p>
        </Container>
      </Section>

      <CTABand
        id="finance-cta"
        heading={finance.cta.heading}
        label={finance.cta.label}
        href={finance.cta.href}
      />
    </>
  );
}
