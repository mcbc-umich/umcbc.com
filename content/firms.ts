/**
 * Placement marks for the three marquees (§5.5): Industry Connections on the
 * homepage, and Placement on /strategy and /finance.
 *
 * ─── HOW A FIRM RENDERS ────────────────────────────────────────────────────
 * With no `logo`, a firm renders as a typeset wordmark. That is how every
 * entry ships today, and it is why none of them has a box behind it — there is
 * no image, just text on the section background.
 *
 * To use a real logo instead, put the file in public/images/firms/ and add
 * three lines:
 *
 *   { name: "Lazard", logo: "/images/firms/lazard.webp", width: 320, height: 84 },
 *
 * `width` and `height` must be the file's real pixel dimensions or the layout
 * will shift while it loads. **Use a PNG, WebP or SVG with a genuinely
 * transparent background** — a logo saved on a white or black rectangle will
 * show that rectangle as a box, which is exactly the problem the wordmarks
 * avoid. The marquee renders logos greyscale at rest and in full colour on
 * hover, so a single-colour or dark mark works best.
 *
 * ─── BEFORE YOU ADD LOGOS ──────────────────────────────────────────────────
 * TODO [§9] — two things to settle first.
 *
 * 1. Every firm here is a public claim that an MCBC member placed there.
 *    Confirm each one.
 * 2. Reproducing a company's logo is a trademark question, and putting one
 *    under "our alumni go on to work at the top firms" can imply a
 *    partnership or endorsement that does not exist. Wordmarks carry much
 *    less of that risk than exact brand marks, which is part of why they are
 *    the default here.
 */

export interface Firm {
  /** Firm name. Used as the wordmark, and as alt text when `logo` is set. */
  name: string;
  /** Optional path under /public/images/firms/. Omit to render a wordmark. */
  logo?: string;
  /** Intrinsic width of the logo file in px. Required whenever `logo` is set. */
  width?: number;
  /** Intrinsic height of the logo file in px. Required whenever `logo` is set. */
  height?: number;
}

/** Homepage — Industry Connections. */
export const homeFirms: Firm[] = [
  { name: "McKinsey & Company" },
  { name: "Bain & Company" },
  { name: "Goldman Sachs" },
  { name: "Morgan Stanley" },
  { name: "J.P. Morgan" },
  { name: "Citadel" },
  { name: "PJT Partners" },
  { name: "Lazard" },
  { name: "Bank of America" },
  { name: "Google" },
  { name: "Amazon" },
  { name: "Stripe" },
  { name: "SpaceX" },
  { name: "Databricks" },
  { name: "Oliver Wyman" },
  { name: "EY-Parthenon" },
  { name: "Macquarie Group" },
  { name: "Guggenheim" },
  { name: "IMC Trading" },
  { name: "Plaid" },
];

/** /strategy — Placement. */
export const strategyFirms: Firm[] = [
  { name: "McKinsey & Company" },
  { name: "Boston Consulting Group" },
  { name: "Bain & Company" },
  { name: "Oliver Wyman" },
  { name: "EY-Parthenon" },
  { name: "PwC Strategy&" },
  { name: "Deloitte" },
  { name: "Bates White" },
  { name: "Chartis Group" },
  { name: "Kaufman Hall" },
  { name: "West Monroe" },
  { name: "Arthur D. Little" },
];

/** /finance — Placement. */
export const financeFirms: Firm[] = [
  { name: "PJT Partners" },
  { name: "Lazard" },
  { name: "Goldman Sachs" },
  { name: "Morgan Stanley" },
  { name: "J.P. Morgan" },
  { name: "Bank of America" },
  { name: "Gordon Dyal & Co." },
  { name: "Guggenheim" },
  { name: "Citadel" },
  { name: "IMC Trading" },
  { name: "Old Mission" },
  { name: "Chicago Trading Company" },
  { name: "Macquarie Group" },
  { name: "PSG" },
  { name: "GCM Grosvenor" },
  { name: "Baird" },
  { name: "RBC Capital Markets" },
  { name: "BMO Capital Markets" },
  { name: "Mizuho" },
  { name: "Federal Reserve Bank of New York" },
];
