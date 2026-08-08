/**
 * Every word of long-form prose on the site, keyed by page and section (§8).
 * No component may hardcode a copy string — if you want to change wording,
 * this is the file.
 *
 * Anything marked TODO [DRAFT] still needs board sign-off (§15.7).
 */

import { site } from "./site";

export interface Prose {
  /** Small uppercase kicker above the heading. Optional. */
  eyebrow?: string;
  /** The section's <h2>. */
  heading: string;
  /** Single lead sentence rendered above the body, larger. Optional. */
  intro?: string;
  /** Body paragraphs, in order. */
  paragraphs?: string[];
  /** Optional background photo for the page header. */
  image?: string;
}

export interface Pillar {
  title: string;
  body: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

export interface PathOption {
  title: string;
  body: string;
  cta: string;
  href: string;
  image: string;
}

/* ========================================================================
   /  — Home (§7.1)
   ======================================================================== */

export const home = {
  hero: {
    // TODO [§15.1] — CONFIRM. The Wix homepage says "EST. 2014"; the Wix About
    // page and the Google Sites homepage both say 2017. Keep this in step with
    // site.foundedYear.
    eyebrow: "University of Michigan · Est. 2017",
    title: site.name,
    subhead: site.tagline,
    primary: { label: "Apply Now", href: "/recruitment" },
    secondary: { label: "Learn More", href: "/about" },
    image: "/images/hero/home.webp",
    imageAlt: "",
  },

  purpose: {
    heading: "Our Purpose",
    paragraphs: [
      "Michigan Consulting and Banking Club (MCBC) seeks to bridge the worlds of finance and consulting for students at the University of Michigan through hands-on project experience, rigorous professional development, and a collaborative community.",
      "Whether students arrive with a clear goal in finance or consulting or are still discovering their interests, MCBC provides the resources, tools, and mentorship to help them make informed career decisions and grow with confidence.",
      "We are based within the Ross School of Business and are a highly selective organization.",
    ],
    image: "/images/hero/purpose.webp",
    imageAlt: "MCBC members working together at a club meeting",
  },

  paths: {
    heading: "Choose Your Path",
    intro:
      "MCBC offers two distinct initiatives, each with its own education track and projects. Members participate in one initiative per semester.",
  },

  // Strategy first, everywhere (§4).
  pathOptions: [
    {
      title: "Strategy",
      body: "Considering a career in consulting? MCBC Strategy sources real projects with local and big-name clients to provide genuine client-facing consulting experience.",
      cta: "Explore MCBC Strategy",
      href: "/strategy",
      image: "/images/hero/path-strategy.webp",
    },
    {
      title: "Finance",
      body: "Interested in finance? Banking? Private equity? Through hands-on work and elite mentorship, MCBC Finance equips members with the skills to conduct professional financial analysis and ace technical interviews.",
      cta: "Explore MCBC Finance",
      href: "/finance",
      image: "/images/hero/path-finance.webp",
    },
  ] satisfies PathOption[],

  connections: {
    heading: "Industry Connections",
    paragraphs: [
      "Our alumni go on to work at the top firms and companies in the country. Through rigorous education and an extensive network, members are equipped with a competitive advantage to take on the best internships and jobs in the market.",
    ],
  },

  // TODO [§15.5] — CONFIRM BEFORE LAUNCH. "220+ Alumni · 100% Full-Time
  // Placement" appears only on the Wix mockup and is a strong public claim.
  // Confirm it is defensible, or soften it.
  placementClaim: "220+ Alumni · 100% Full-Time Placement",

  closing: {
    heading: "Learn. Grow. Inspire.",
    cta: { label: "Apply Today", href: "/recruitment" },
  },
};

/* ========================================================================
   /about — About Us (§7.2)
   ======================================================================== */

export const about = {
  intro: {
    heading: "About Us",
    paragraphs: [
      "Since its founding in 2017, Michigan Consulting and Banking Club has been guided by its mission of creating a rich culture of business excellence, collaboration, and impact.",
      "MCBC continues to build upon its past to support students pursuing careers across finance and strategy in an increasingly global business landscape.",
    ],
    image: "/images/hero/about.webp",
  },

  development: {
    heading: "Professional Development",
    paragraphs: [
      "Weekly education meetings cover recruiting for the most popular career functions in finance and consulting, teaching networking, interview strategy, and professionalism in fields such as investment banking and management consulting.",
      "Professional development workshops and personalized feedback help members strengthen their resumes, technical skills, and networking ability.",
      "Education meetings also include upperclassmen career panels, company speaker events, semester-long projects, and competitions.",
    ],
  },

  // TODO [§15.7] — ALL FOUR BODIES ARE [DRAFT] AND NEED BOARD SIGN-OFF.
  // The Wix site had the literal word "Text" in all four; this copy was
  // written to match the club's register but has never been approved.
  pillars: [
    {
      title: "Mentorship",
      body: "Every new member is paired with an experienced member who has recruited for the roles they're targeting. Mentors review resumes, run mock interviews, and make introductions.",
    },
    {
      title: "New Member Education",
      body: "A structured first-semester curriculum covering accounting fundamentals, valuation, case structuring, and market sizing. No prior background required.",
    },
    {
      title: "Bootcamp",
      body: "An intensive pre-semester weekend that takes new members from fundamentals to a complete stock pitch or case deliverable before recruiting begins.",
    },
    {
      title: "Professional Network",
      body: "An alumni base across investment banking, private equity, consulting, and corporate strategy, reachable through our directory and alumni panels.",
    },
  ] satisfies Pillar[],

  pillarsHeading: "What Membership Includes",

  testimonialsHeading: "In Their Words",

  testimonials: [
    {
      quote:
        "MCBC isn't just where I discovered my passion for business, but where I developed the skills to pursue that career.",
      name: "Barry Wang",
      detail: "Class of Fall 2023",
    },
    {
      quote:
        "MCBC didn't just provide the resources for my career pursuits, but a community of support which motivated me to succeed.",
      name: "Rohan Girvin",
      detail: "Class of Fall 2024",
    },
  ] satisfies Testimonial[],

  community: {
    heading: "Find Your Community",
    paragraphs: [
      // TODO [§15.2] — "50+ members" here vs. "60+ Active Members" in the
      // homepage stat band (stats.ts). Pick one and match them.
      "At MCBC, you will find a vibrant community of 50+ members with diverse interests in the business world. Through club-wide socials, retreats, mentorship programs, and casual hangouts, we seek to foster a welcoming environment where members don't just prepare for a career in business, but find a place to build genuine connections, make friends, and grow together outside of the classroom.",
    ],
  },

  boardHeading: "Executive Board",
  advisorsHeading: "Senior Advisors",
};

/* ========================================================================
   /strategy — Strategy (§7.3)
   ======================================================================== */

export const strategy = {
  intro: {
    eyebrow: "MCBC Initiative",
    heading: "Strategy",
    paragraphs: [
      "MCBC's consulting initiative immerses members in structured problem-solving environments. Through semester-long client-facing projects, case interview preparation, and team-based engagements, members hone their analytical skills, communication ability, and confidence in a fast-paced consulting environment.",
    ],
    image: "/images/hero/strategy.webp",
  },

  applyIfHeading: "Apply if you like…",

  // The Wix site mislabels this "Investment Sectors" — a copy-paste error
  // from the Finance page. This is the correct heading (§7.3).
  engagementsHeading: "Past Engagements",

  managersHeading: "Project Managers",

  placement: {
    heading: "Placement",
    // TODO [§15.7] — [DRAFT], needs board sign-off. Written for this build
    // because the Wix site duplicated the finance placement copy here.
    paragraphs: [
      "From management consulting to corporate strategy and product roles, our members bring their MCBC experience to leading firms across the industry.",
    ],
  },

  placementSuffix: "… and much more",

  cta: {
    heading: "Ready to apply?",
    label: "Apply Today",
    href: "/recruitment",
  },

  photoStrip: [
    "/images/gallery/strategy-1.webp",
    "/images/gallery/strategy-2.webp",
    "/images/gallery/strategy-3.webp",
  ],
};

/* ========================================================================
   /finance — Finance (§7.4)
   ======================================================================== */

export const finance = {
  intro: {
    eyebrow: "MCBC Initiative",
    heading: "Finance",
    paragraphs: [
      "MCBC's finance initiative centers on understanding how businesses and markets interact. Members leverage financial analysis, market research, and predictive models to evaluate opportunities, assess risk, and formulate data-driven investment decisions. Members can expect to hone the skills needed for careers in investing, banking, and corporate finance.",
    ],
    image: "/images/hero/finance.webp",
  },

  applyIfHeading: "Apply if you like…",

  sectorsHeading: "Investment Sectors",
  sectorsClosing:
    "Each investment sector offers members the opportunity to develop specialized market knowledge through research, valuation, and real-world analysis.",

  engagementsHeading: "Past Engagements",

  deskHeadsHeading: "Desk Heads",

  placement: {
    heading: "Placement",
    paragraphs: [
      "From investment banking to private equity and corporate finance, our members bring their MCBC experience to leading firms across the industry.",
    ],
  },

  placementSuffix: "… and much more",

  cta: {
    heading: "Ready to apply?",
    label: "Apply Today",
    href: "/recruitment",
  },

  photoStrip: [
    "/images/gallery/finance-1.webp",
    "/images/gallery/finance-2.webp",
    "/images/gallery/finance-3.webp",
  ],
};

/* ========================================================================
   /recruitment — Recruitment (§7.5)
   ======================================================================== */

export const recruitment = {
  intro: {
    eyebrow: "Join MCBC",
    heading: "Recruitment",
    paragraphs: [
      "Our fall recruitment schedule will be posted as the fall semester approaches.",
      `We appreciate your interest in MCBC and encourage you to reach out to ${site.email} with any recruitment-related questions.`,
    ],
    image: "/images/hero/recruitment.webp",
  },

  faqsHeading: "FAQs",

  closing: `If you have any other questions, email ${site.email}. We look forward to reading your applications.`,
};

/* ========================================================================
   Shared
   ======================================================================== */

export const footer = {
  contactPrefix: "Questions? Contact",
  rightsSuffix: "All rights reserved.",
};

export const a11y = {
  skipToContent: "Skip to content",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  primaryNav: "Primary",
  footerNav: "Footer",
  socialNav: "Social media",
  galleryLabel: "Photos of MCBC members",
  previousPhoto: "Previous photo",
  nextPhoto: "Next photo",
  applyCta: "Apply",
};

/**
 * Gallery on /about — the Wix site carries 17 images (§7.2).
 *
 * TODO [§9, §11] — when the real photos go in, give each one alt text that
 * describes what is happening in it ("Members presenting a final deck to a
 * client", not "MCBC photo"). Empty alt is only correct while these are
 * abstract placeholders with nothing to describe.
 */
export const gallery: { src: string; alt: string }[] = Array.from(
  { length: 17 },
  (_, i) => ({
    src: `/images/gallery/community-${String(i + 1).padStart(2, "0")}.webp`,
    alt: "",
  }),
);
