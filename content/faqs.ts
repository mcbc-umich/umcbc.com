/** Recruitment page FAQ (§7.5). Rendered with native <details>/<summary>. */

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What will MCBC's application and interview process be like?",
    answer:
      "The application process consists of a written application and an interview. Interviews mix behavioral questions with technical questions based on the initiative you indicate on your application. Applicants who indicate finance should expect basic accounting and finance technical questions; applicants who indicate consulting should expect a short case study.",
  },
  {
    question: "What does MCBC look for in prospective members?",
    answer:
      "MCBC looks for a lot of things in applicants, not just technical knowledge. Your character when interacting with members, your passion for the club, and your ability to communicate all matter to your candidacy — don't let a lack of technical experience deter you from applying.",
  },
  {
    question: "I'm not in Ross. Am I still eligible to apply?",
    answer:
      "Yes. We encourage all U-M students with an interest in MCBC's mission and initiatives to apply. Diversity in major is highly important to our club's success, and we do not discriminate based on college or major.",
  },
  {
    question: "How can I best prepare to apply to MCBC?",
    answer:
      "The best preparation is to be genuinely excited about the club. Show up to events, talk to our members, and decide this is a community you want to be part of. The passion and curiosity you demonstrate in your application and interviews will help you stand out.",
  },
];
