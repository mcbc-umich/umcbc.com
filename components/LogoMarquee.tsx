import Image from "next/image";
import type { CSSProperties } from "react";

import type { Firm } from "@/content/firms";

/**
 * The signature element (§5.5): a continuously scrolling track of firm marks,
 * monochrome at rest and resolving to full colour on hover.
 *
 * Pure CSS — the animation, the hover pause and the reduced-motion fallback
 * (a static wrapped grid) all live in globals.css, so this ships zero
 * JavaScript. Firms with no `logo` render as a wordmark, which is the
 * lower-risk default; see content/firms.ts.
 */
export default function LogoMarquee({ firms }: { firms: Firm[] }) {
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
    <div className="marquee relative overflow-hidden" style={style}>
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
                    // Contained rather than height-matched: the marks range
                    // from near-square (Datadog) to very wide (Oliver Wyman),
                    // so capping both axes keeps them optically similar.
                    className="h-12 w-auto max-w-[180px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 motion-reduce:transition-none"
                  />
                ) : (
                  <span className="text-paper/70 font-ui hover:text-paper text-xl font-semibold tracking-tight whitespace-nowrap uppercase transition-colors duration-300 motion-reduce:transition-none">
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
