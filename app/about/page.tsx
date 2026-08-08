import type { Metadata } from "next";

import Eyebrow from "@/components/Eyebrow";
import PageIntro from "@/components/PageIntro";
import PersonGrid from "@/components/PersonGrid";
import PhotoGallery from "@/components/PhotoGallery";
import Section from "@/components/Section";
import { about, gallery } from "@/content/copy";
import { advisors, board } from "@/content/people";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2017, the Michigan Consulting and Banking Club builds a culture of business excellence, collaboration, and impact at the University of Michigan.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro prose={about.intro} />

      <Section background="fog" labelledBy="development">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Eyebrow />
            <h2 id="development" className="text-display-lg">
              {about.development.heading}
            </h2>
          </div>
          <div className="measure space-y-5">
            {about.development.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-slate">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="pillars">
        <Eyebrow />
        <h2 id="pillars" className="text-display-lg">
          {about.pillarsHeading}
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.pillars.map((pillar) => (
            <li key={pillar.title} className="border-rule border-t pt-6">
              <h3 className="font-display text-lg font-semibold">
                {pillar.title}
              </h3>
              <p className="text-slate text-caption mt-3">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="fog" labelledBy="testimonials">
        <Eyebrow />
        <h2 id="testimonials" className="text-display-lg">
          {about.testimonialsHeading}
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {about.testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="bg-paper border-rule border p-8 lg:p-10"
            >
              <blockquote className="font-display text-display-md normal-case">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="text-slate text-caption mt-6">
                <span className="text-ink font-semibold">
                  {testimonial.name}
                </span>
                , {testimonial.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section labelledBy="community">
        <Eyebrow />
        <h2 id="community" className="text-display-lg">
          {about.community.heading}
        </h2>
        <div className="measure mt-8 space-y-5">
          {about.community.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-slate text-body-lg">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-14">
          <PhotoGallery photos={gallery} />
        </div>
      </Section>

      <Section background="fog" labelledBy="board">
        <PersonGrid id="board" heading={about.boardHeading} people={board} />
      </Section>

      <Section labelledBy="advisors">
        <PersonGrid
          id="advisors"
          heading={about.advisorsHeading}
          people={advisors}
        />
      </Section>
    </>
  );
}
