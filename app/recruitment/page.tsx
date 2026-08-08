import type { Metadata } from "next";

import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import PageIntro from "@/components/PageIntro";
import Section from "@/components/Section";
import { recruitment } from "@/content/copy";
import { faqs } from "@/content/faqs";
import { forms } from "@/content/site";

export const metadata: Metadata = {
  title: "Recruitment",
  description:
    "Apply to the Michigan Consulting and Banking Club. Fall recruitment details, the application and interview process, and answers to common questions.",
  alternates: { canonical: "/recruitment" },
};

export default function RecruitmentPage() {
  return (
    <>
      <PageIntro prose={recruitment.intro} />

      <Section background="fog">
        <div className="flex flex-wrap gap-4">
          <Button href={forms.apply.href} variant="primary" external>
            {forms.apply.label}
          </Button>
          <Button href={forms.interest.href} variant="secondary" external>
            {forms.interest.label}
          </Button>
        </div>
      </Section>

      <Section labelledBy="faqs">
        <Eyebrow />
        <h2 id="faqs" className="text-display-lg">
          {recruitment.faqsHeading}
        </h2>
        <div className="mt-12">
          <Accordion items={faqs} />
        </div>
        <p className="measure text-slate text-body-lg mt-12">
          {recruitment.closing}
        </p>
      </Section>
    </>
  );
}
