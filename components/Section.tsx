import type { ReactNode } from "react";

export type SectionBackground = "paper" | "fog" | "ink";

export interface SectionProps {
  background?: SectionBackground;
  id?: string;
  /** Scroll-reveal is on by default; the hero opts out (§5.4). */
  reveal?: boolean;
  /** Drop the max-width container for full-bleed children (the marquee). */
  bleed?: boolean;
  /** aria-labelledby target, when the section has a heading. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

const backgrounds: Record<SectionBackground, string> = {
  paper: "bg-paper text-ink",
  fog: "bg-fog text-ink",
  ink: "bg-ink text-paper",
};

/**
 * The only place vertical section rhythm is defined (§5.3).
 * Do not add ad-hoc margins to section children — change it here or not
 * at all.
 */
export default function Section({
  background = "paper",
  id,
  reveal = true,
  bleed = false,
  labelledBy,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${backgrounds[background]} py-20 md:py-32 ${className}`}
    >
      <div
        data-reveal={reveal ? "" : undefined}
        // The reveal observer may stamp data-revealed before hydration
        // finishes; that difference is intentional.
        suppressHydrationWarning
        className={bleed ? "" : "max-w-site mx-auto w-full px-6 lg:px-12"}
      >
        {children}
      </div>
    </section>
  );
}

/** Container-only helper for full-bleed sections that still need gutters. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`max-w-site mx-auto w-full px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
