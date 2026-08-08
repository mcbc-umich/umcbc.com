import type { ReactNode } from "react";

export interface EyebrowProps {
  /** Optional label. Omit to render the maize rule on its own. */
  children?: ReactNode;
  onDark?: boolean;
  className?: string;
}

/**
 * Uppercase kicker plus the 2px maize rule (§5.1, §6).
 * With no children it degrades to just the rule, which is how title-only
 * sections get their maize accent without inventing a kicker line.
 */
export default function Eyebrow({
  children,
  onDark = false,
  className = "",
}: EyebrowProps) {
  return (
    <div className={`mb-5 ${className}`}>
      {children ? (
        <p
          className={`font-display text-eyebrow uppercase ${
            onDark ? "text-paper" : "text-slate"
          }`}
        >
          {children}
        </p>
      ) : null}
      <span
        aria-hidden="true"
        className={`bg-maize block h-0.5 w-10 ${children ? "mt-3" : ""}`}
      />
    </div>
  );
}
