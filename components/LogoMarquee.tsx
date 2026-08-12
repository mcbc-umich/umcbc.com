import Image from "next/image";
import type { CSSProperties } from "react";

import type { Firm } from "@/content/firms";

export interface LogoMarqueeProps {
  firms: Firm[];
  /**
   * Stop scrolling and open into a static grid on hover or keyboard focus, so
   * the whole list can be read at once instead of waiting for it to come
   * round. Without it, hover just pauses the scroll.
   */
  expandOnHover?: boolean;
}

/**
 * The signature element (§5.5): a continuously scrolling track of firm marks,
 * greyscale at rest and resolving to full colour on hover.
 *
 * The marks sit on a white band. They are real brand logos in their own
 * colours — mostly dark wordmarks — and the three sections that host this
 * component are all ink, where dark marks would be invisible. A light band is
 * what lets them keep their actual colours instead of being flattened.
 *
 * Pure CSS: the animation, the hover behaviour and the reduced-motion
 * fallback all live in globals.css, so this ships zero JavaScript.
 */
export default function LogoMarquee({
  firms,
  expandOnHover = false,
}: LogoMarqueeProps) {
  if (firms.length === 0) return null;

  // Keep the scroll speed constant as firms are added or removed.
  const style = {
    "--marquee-duration": `${firms.length * 4}s`,
    maskImage:
      "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
  } as CSSProperties;

  return (
    <div className="bg-paper py-10">
      <div
        className={`marquee relative overflow-hidden ${expandOnHover ? "marquee-expand" : ""}`}
        style={style}
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              // The second copy exists only to make the loop seamless.
              data-marquee-clone={copy === 1 ? "" : undefined}
              aria-hidden={copy === 1 ? "true" : undefined}
              className="flex shrink-0 items-center gap-14 pr-14 lg:gap-20 lg:pr-20"
            >
              {firms.map((firm) => (
                <li key={`${copy}-${firm.name}`} className="shrink-0">
                  {firm.logo && firm.width && firm.height ? (
                    <Image
                      src={firm.logo}
                      alt={firm.name}
                      width={firm.width}
                      height={firm.height}
                      sizes="180px"
                      // Served as-is. These are already sized for their slot
                      // (~10KB each), and the optimizer falls back to JPEG for
                      // any client that doesn't advertise WebP — which would
                      // flatten the transparency and put a box behind the
                      // mark, the exact thing these files exist to avoid.
                      unoptimized
                      // Contained rather than height-matched: marks range from
                      // near-square to very wide, so capping both axes keeps
                      // them optically similar.
                      className="h-12 w-auto max-w-[180px] object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 motion-reduce:transition-none"
                    />
                  ) : (
                    // Firms with no logo file available, set to match.
                    <span className="text-ink/70 font-ui hover:text-ink text-lg font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none">
                      {firm.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
