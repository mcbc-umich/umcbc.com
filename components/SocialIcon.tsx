import type { SocialPlatform } from "@/content/site";

/**
 * Instagram and LinkedIn glyphs as inline SVG.
 *
 * lucide-react v1 dropped its brand icons, so these two can't come from the
 * icon set the rest of the site uses (§14). Rather than pull in a second icon
 * package — react-icons and friends ship enormous barrel files, which §14
 * rules out — they are drawn here from primitives: ~400 bytes, no dependency,
 * inherits currentColor like every other icon.
 *
 * Always decorative: the accessible name lives on the wrapping link.
 */
export default function SocialIcon({
  platform,
  className = "",
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
    className,
  } as const;

  if (platform === "instagram") {
    return (
      <svg
        {...common}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth={2}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <circle cx="7.6" cy="8" r="1.2" fill="currentColor" stroke="none" />
      <path d="M7.6 10.9v6.4" strokeLinecap="round" />
      <path d="M11.7 17.3v-6.4" strokeLinecap="round" />
      <path
        d="M11.7 14.2a2.6 2.6 0 0 1 5.2 0v3.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
