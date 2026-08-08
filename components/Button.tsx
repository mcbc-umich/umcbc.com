import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  /** Set when the button sits on an ink background, so outlines invert. */
  onDark?: boolean;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  className?: string;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display text-eyebrow uppercase transition-colors duration-200 motion-reduce:transition-none";

const variants: Record<ButtonVariant, { light: string; dark: string }> = {
  // Maize on ink — the primary CTA, one of the four sanctioned maize uses.
  primary: {
    light: "bg-ink text-paper hover:bg-blue",
    dark: "bg-maize text-ink hover:bg-paper",
  },
  secondary: {
    light: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
    dark: "border-2 border-paper text-paper hover:bg-paper hover:text-ink",
  },
  ghost: {
    light: "px-0 py-1 text-ink hover:text-blue",
    dark: "px-0 py-1 text-paper hover:text-maize",
  },
};

export default function Button({
  href,
  variant = "primary",
  onDark = false,
  external = false,
  className = "",
  children,
}: ButtonProps) {
  const classes = `${base} ${variants[variant][onDark ? "dark" : "light"]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
