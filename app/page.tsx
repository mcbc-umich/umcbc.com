import Image from "next/image";
import type { Metadata } from "next";

import CTABand from "@/components/CTABand";
import Eyebrow from "@/components/Eyebrow";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import PathCard from "@/components/PathCard";
import Section, { Container } from "@/components/Section";
import StatBand from "@/components/StatBand";
import { home } from "@/content/copy";
import { homeFirms } from "@/content/firms";
import { site } from "@/content/site";
import { stats } from "@/content/stats";

export const metadata: Metadata = {
  title: `${site.name} | University of Michigan`,
  description: site.tagline,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero {...home.hero} />

      <Section background="ink">
        <h2 className="sr-only">MCBC by the numbers</h2>
        <StatBand stats={stats} />
      </Section>

      <Section background="fog" labelledBy="purpose">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="border-rule relative aspect-[4/3] border">
            <Image
              src={home.purpose.image}
              alt={home.purpose.imageAlt}
              fill
              sizes="(min-width: 1024px) 528px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <Eyebrow />
            <h2 id="purpose" className="text-display-lg">
              {home.purpose.heading}
            </h2>
            <div className="measure mt-8 space-y-5">
              {home.purpose.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-slate">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="paths">
        <Eyebrow />
        <h2 id="paths" className="text-display-lg">
          {home.paths.heading}
        </h2>
        <p className="measure text-slate text-body-lg mt-6">
          {home.paths.intro}
        </p>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {home.pathOptions.map((path) => (
            <PathCard key={path.title} path={path} />
          ))}
        </div>
      </Section>

      <Section background="ink" bleed labelledBy="connections">
        <Container>
          <Eyebrow onDark />
          <h2 id="connections" className="text-display-lg">
            {home.connections.heading}
          </h2>
          <div className="measure mt-8">
            {home.connections.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-paper/80">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>

        <div className="mt-16">
          <LogoMarquee firms={homeFirms} />
        </div>

        <Container>
          <p className="font-ui text-eyebrow text-paper/80 mt-16 text-center uppercase">
            {home.placementClaim}
          </p>
        </Container>
      </Section>

      <CTABand
        id="closing"
        heading={home.closing.heading}
        label={home.closing.cta.label}
        href={home.closing.cta.href}
        image={home.closing.image}
      />
    </>
  );
}
