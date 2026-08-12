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
  {
    name: "McKinsey & Company",
    logo: "/images/firms/mckinsey.webp",
    width: 360,
    height: 45,
  },
  {
    name: "Bain & Company",
    logo: "/images/firms/bain.webp",
    width: 360,
    height: 40,
  },
  {
    name: "Goldman Sachs",
    logo: "/images/firms/goldman-sachs.webp",
    width: 218,
    height: 96,
  },
  {
    name: "Morgan Stanley",
    logo: "/images/firms/morgan-stanley.webp",
    width: 360,
    height: 52,
  },
  {
    name: "J.P. Morgan",
    logo: "/images/firms/jpmorgan.webp",
    width: 360,
    height: 90,
  },
  {
    name: "Citadel",
    logo: "/images/firms/citadel.webp",
    width: 360,
    height: 47,
  },
  {
    name: "PJT Partners",
    logo: "/images/firms/pjt-partners.webp",
    width: 116,
    height: 96,
  },
  { name: "Lazard", logo: "/images/firms/lazard.webp", width: 360, height: 90 },
  {
    name: "Bank of America",
    logo: "/images/firms/bank-of-america.webp",
    width: 360,
    height: 36,
  },
  { name: "Google", logo: "/images/firms/google.webp", width: 284, height: 96 },
  { name: "Amazon", logo: "/images/firms/amazon.webp", width: 318, height: 96 },
  { name: "Stripe", logo: "/images/firms/stripe.webp", width: 231, height: 96 },
  { name: "SpaceX", logo: "/images/firms/spacex.webp", width: 360, height: 45 },
  {
    name: "Databricks",
    logo: "/images/firms/databricks.webp",
    width: 230,
    height: 96,
  },
  {
    name: "Oliver Wyman",
    logo: "/images/firms/oliver-wyman.webp",
    width: 360,
    height: 34,
  },
  {
    name: "EY-Parthenon",
    logo: "/images/firms/ey-parthenon.webp",
    width: 298,
    height: 96,
  },
  {
    name: "Macquarie Group",
    logo: "/images/firms/macquarie.webp",
    width: 360,
    height: 63,
  },
  {
    name: "Guggenheim",
    logo: "/images/firms/guggenheim.webp",
    width: 360,
    height: 27,
  },
  { name: "IMC Trading" },
  { name: "Plaid", logo: "/images/firms/plaid.webp", width: 251, height: 96 },
];

/** /strategy — Placement. */
export const strategyFirms: Firm[] = [
  {
    name: "McKinsey & Company",
    logo: "/images/firms/mckinsey.webp",
    width: 360,
    height: 45,
  },
  {
    name: "Boston Consulting Group",
    logo: "/images/firms/bcg.webp",
    width: 227,
    height: 96,
  },
  {
    name: "Bain & Company",
    logo: "/images/firms/bain.webp",
    width: 360,
    height: 40,
  },
  {
    name: "Oliver Wyman",
    logo: "/images/firms/oliver-wyman.webp",
    width: 360,
    height: 34,
  },
  {
    name: "EY-Parthenon",
    logo: "/images/firms/ey-parthenon.webp",
    width: 298,
    height: 96,
  },
  { name: "PwC Strategy&" },
  {
    name: "Deloitte",
    logo: "/images/firms/deloitte.webp",
    width: 360,
    height: 69,
  },
  { name: "Bates White" },
  { name: "Chartis Group" },
  { name: "Kaufman Hall" },
  { name: "West Monroe" },
  {
    name: "Arthur D. Little",
    logo: "/images/firms/arthur-d-little.webp",
    width: 360,
    height: 39,
  },
];

/** /finance — Placement. */
export const financeFirms: Firm[] = [
  {
    name: "PJT Partners",
    logo: "/images/firms/pjt-partners.webp",
    width: 116,
    height: 96,
  },
  { name: "Lazard", logo: "/images/firms/lazard.webp", width: 360, height: 90 },
  {
    name: "Goldman Sachs",
    logo: "/images/firms/goldman-sachs.webp",
    width: 218,
    height: 96,
  },
  {
    name: "Morgan Stanley",
    logo: "/images/firms/morgan-stanley.webp",
    width: 360,
    height: 52,
  },
  {
    name: "J.P. Morgan",
    logo: "/images/firms/jpmorgan.webp",
    width: 360,
    height: 90,
  },
  {
    name: "Bank of America",
    logo: "/images/firms/bank-of-america.webp",
    width: 360,
    height: 36,
  },
  { name: "Gordon Dyal & Co." },
  {
    name: "Guggenheim",
    logo: "/images/firms/guggenheim.webp",
    width: 360,
    height: 27,
  },
  {
    name: "Citadel",
    logo: "/images/firms/citadel.webp",
    width: 360,
    height: 47,
  },
  { name: "IMC Trading" },
  { name: "Old Mission" },
  { name: "Chicago Trading Company" },
  {
    name: "Macquarie Group",
    logo: "/images/firms/macquarie.webp",
    width: 360,
    height: 63,
  },
  { name: "PSG" },
  { name: "GCM Grosvenor" },
  { name: "Baird" },
  { name: "RBC Capital Markets" },
  { name: "BMO Capital Markets" },
  { name: "Mizuho", logo: "/images/firms/mizuho.webp", width: 320, height: 96 },
  { name: "Federal Reserve Bank of New York" },
];
