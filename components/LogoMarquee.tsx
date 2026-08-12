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
 * monochrome at rest and resolving to full colour on hover.
 *
 * Pure CSS — the animation, the hover behaviour and the reduced-motion
 * fallback (a static grid) all live in globals.css, so this ships zero
 * JavaScript. Firms with no `logo` render as a typeset wordmark, which is
 * how they all ship today; see content/firms.ts.
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
      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
  } as CSSProperties;

  return (
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
                    // Contained rather than height-matched: marks range from
                    // near-square to very wide, so capping both axes keeps
                    // them optically similar.
                    className="h-12 w-auto max-w-[180px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 motion-reduce:transition-none"
                  />
                ) : (
                  <span className="text-accent font-ui hover:text-paper text-lg font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none">
                    {firm.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
