/**
 * Placement marks for the Industry Connections marquee (§5.5).
 *
 * Imported from the Wix mockup, which is the only place this list exists.
 * Order follows the mockup.
 *
 * TODO [§9] — CONFIRM THIS LIST BEFORE LAUNCH. Showing a company's mark next
 * to "our alumni go on to work at the top firms" is a public claim that an
 * MCBC member actually placed there, and displaying a logo can imply
 * endorsement or partnership that does not exist. Every mark here should be
 * one the board can stand behind. If there is any doubt, drop the `logo` line
 * for that firm and it renders as a plain wordmark instead — lower risk, and
 * it still reads well in the marquee.
 *
 * Two things already fixed on the way in:
 *  - The mockup carries two different "Citadel" marks: the hedge fund, and
 *    The Citadel, the military college in South Carolina. Only the former is
 *    here.
 *  - Chartis and Old Mission Capital each appeared twice. De-duplicated.
 *
 * Note the marks are not visually consistent — several have an opaque black
 * or coloured rectangle baked into the image rather than a transparent
 * background. The marquee renders them greyscale at rest, which hides most of
 * it, but clean transparent versions would look better.
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

export const firms: Firm[] = [
  { name: "PwC", logo: "/images/firms/pwc.webp", width: 227, height: 128 },
  {
    name: "Goldman Sachs",
    logo: "/images/firms/goldman-sachs.webp",
    width: 305,
    height: 128,
  },
  { name: "Cisco", logo: "/images/firms/cisco.webp", width: 225, height: 128 },
  {
    name: "Bain & Company",
    logo: "/images/firms/bain.webp",
    width: 320,
    height: 97,
  },
  {
    name: "Capital One",
    logo: "/images/firms/capital-one.webp",
    width: 204,
    height: 128,
  },
  {
    name: "Kraft Heinz",
    logo: "/images/firms/kraft-heinz.webp",
    width: 320,
    height: 54,
  },
  {
    name: "Datadog",
    logo: "/images/firms/datadog.webp",
    width: 128,
    height: 128,
  },
  {
    name: "Amazon",
    logo: "/images/firms/amazon.webp",
    width: 320,
    height: 121,
  },
  {
    name: "Chicago Trading Company",
    logo: "/images/firms/ctc.webp",
    width: 275,
    height: 128,
  },
  {
    name: "Morgan Stanley",
    logo: "/images/firms/morgan-stanley.webp",
    width: 320,
    height: 47,
  },
  {
    name: "Old Mission Capital",
    logo: "/images/firms/old-mission-capital.webp",
    width: 128,
    height: 128,
  },
  {
    name: "Verizon",
    logo: "/images/firms/verizon.webp",
    width: 320,
    height: 90,
  },
  {
    name: "Johnson & Johnson",
    logo: "/images/firms/johnson-and-johnson.webp",
    width: 128,
    height: 128,
  },
  {
    name: "Oliver Wyman",
    logo: "/images/firms/oliver-wyman.webp",
    width: 320,
    height: 38,
  },
  {
    name: "Deloitte",
    logo: "/images/firms/deloitte.webp",
    width: 261,
    height: 128,
  },
  {
    name: "Chartis",
    logo: "/images/firms/chartis.webp",
    width: 245,
    height: 128,
  },
  { name: "KPMG", logo: "/images/firms/kpmg.webp", width: 303, height: 128 },
  {
    name: "Rocket",
    logo: "/images/firms/rocket.webp",
    width: 227,
    height: 128,
  },
  {
    name: "Plante Moran",
    logo: "/images/firms/plante-moran.webp",
    width: 228,
    height: 128,
  },
  {
    name: "Guggenheim",
    logo: "/images/firms/guggenheim.webp",
    width: 228,
    height: 128,
  },
  { name: "MUFG", logo: "/images/firms/mufg.webp", width: 320, height: 75 },
  {
    name: "Citadel",
    logo: "/images/firms/citadel.webp",
    width: 128,
    height: 128,
  },
];
