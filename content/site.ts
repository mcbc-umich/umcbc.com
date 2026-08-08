/**
 * Site-wide facts: name, contact, navigation, socials, form links.
 * Editing guide for non-developers: content/README.md
 */

export interface NavItem {
  label: string;
  href: string;
}

export type SocialPlatform = "instagram" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface Site {
  name: string;
  displayName: string;
  abbreviation: string;
  tagline: string;
  url: string;
  locality: string;
  region: string;
  location: string;
  email: string;
  parentOrganization: string;
  foundedYear: number;
}

export const site: Site = {
  name: "Michigan Consulting and Banking Club",
  // Footer and header lockup use the ampersand form, per §7.6.
  displayName: "Michigan Consulting & Banking Club",
  abbreviation: "MCBC",
  tagline:
    "The leading dual-initiative business consulting and investment organization at the University of Michigan.",
  url: "https://umcbc.com",
  locality: "Ann Arbor",
  region: "MI",
  location: "Ann Arbor, MI",

  // TODO [§15.6] — CONFIRM BEFORE LAUNCH. Both source sites display
  // "mcbc-board@umich.edu" as link text while the mailto: href points at
  // "mcbc-eboard@umich.edu". Send a test email to both, find out which
  // inbox is actually monitored, and set it here. This single value feeds
  // the footer, the recruitment page and the JSON-LD, so there is exactly
  // one place to change.
  email: "mcbc-board@umich.edu",

  parentOrganization: "University of Michigan",

  // TODO [§15.1] — CONFIRM BEFORE LAUNCH. The Wix homepage says "EST. 2014";
  // the Wix About page and the Google Sites homepage both say "Since its
  // founding in 2017". The spec recommends 2017. See also stats.ts.
  foundedYear: 2017,
};

/**
 * Header and footer navigation.
 * Strategy comes before Finance everywhere (§4) — the club name puts
 * consulting first.
 */
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Strategy", href: "/strategy" },
  { label: "Finance", href: "/finance" },
  { label: "Recruitment", href: "/recruitment" },
];

/**
 * Only accounts that actually exist (§7.6). The Wix mockup linked six icons
 * to bare domains like www.facebook.com — do not add an icon here unless
 * there is a real account behind it.
 */
export const socials: SocialLink[] = [
  {
    platform: "instagram",
    label: "MCBC on Instagram",
    href: "https://www.instagram.com/mcbc_um/",
  },
  {
    platform: "linkedin",
    label: "MCBC on LinkedIn",
    href: "https://www.linkedin.com/company/108401482",
  },
];

export interface FormLink {
  label: string;
  href: string;
}

/**
 * The entire form story (§13) — we link out, never embed.
 *
 * TODO [§7.5] — Verify both forms are still accepting responses before launch.
 */
export const forms: Record<"apply" | "interest", FormLink> = {
  apply: {
    label: "Apply to MCBC",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSc9CYWgDeCQjMx49GYjX80qoTDp4xI0WOVBvzEPUIdZpSe5Dw/viewform",
  },
  interest: {
    label: "Fill Out Our Interest Form",
    href: "https://forms.gle/J6cHMV2gG5zuBQoc6",
  },
};
