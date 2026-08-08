/**
 * Placement marks for the Industry Connections marquee (§5.5).
 *
 * ============================ READ THIS FIRST ============================
 * TODO — THIS LIST IS A PLACEHOLDER AND MUST NOT SHIP AS-IS.
 *
 * Neither source site gave a firm list that could be transcribed, and naming
 * a firm here is a public claim that an MCBC member placed there. So the
 * entries below are deliberately obvious placeholders rather than invented
 * company names. Replace every one with a firm the board can actually
 * stand behind, and delete any left over.
 *
 * Two things to decide while you do that (§9):
 *
 * 1. Marks vs. names. Displaying a company's logo can imply endorsement or
 *    partnership. Leaving `logo` unset renders the firm's name as a
 *    monochrome wordmark instead — lower risk, and it still reads well in
 *    the marquee. That is the recommended default.
 * 2. If you do use marks, put an SVG (or a 2x transparent PNG) in
 *    public/images/firms/ and set `logo` to its path plus the real pixel
 *    dimensions of the file.
 * =========================================================================
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
  { name: "[FIRM 01]" },
  { name: "[FIRM 02]" },
  { name: "[FIRM 03]" },
  { name: "[FIRM 04]" },
  { name: "[FIRM 05]" },
  { name: "[FIRM 06]" },
  { name: "[FIRM 07]" },
  { name: "[FIRM 08]" },
  { name: "[FIRM 09]" },
  { name: "[FIRM 10]" },
];
