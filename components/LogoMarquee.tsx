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
  /** Re-order the marks on every page load. See the note below. */
  shuffle?: boolean;
}

/**
 * The signature element (§5.5): a continuously scrolling track of firm marks
 * on ink, flattened to white and brightening on hover.
 *
 * Pure CSS for the motion — the animation, the hover behaviour and the
 * reduced-motion fallback all live in globals.css. The optional shuffle is a
 * few lines of inline script rather than a client component, so this still
 * costs no hydration.
 */
export default function LogoMarquee({
  firms,
  expandOnHover = false,
  shuffle = false,
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

  /**
   * Shuffles the first track and mirrors it into the duplicate so the loop
   * stays seamless. Deliberately runs on `load`, after React has hydrated —
   * reordering the DOM before hydration would leave the server markup and the
   * client tree disagreeing. The marquee is still scrolling in from the edge
   * at that point, so the re-order is not visible.
   */
  const shuffleScript = `
(function () {
  var root = document.currentScript.previousElementSibling;
  function run() {
    var tracks = root.querySelectorAll('.marquee-track > ul');
    if (tracks.length < 2) return;
    var items = Array.prototype.slice.call(tracks[0].children);
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = items[i]; items[i] = items[j]; items[j] = t;
    }
    items.forEach(function (li) { tracks[0].appendChild(li); });
    tracks[1].innerHTML = tracks[0].innerHTML;
  }
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run);
})();
`;

  return (
    <>
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
                      // mark.
                      unoptimized
                      // brightness(0) invert(1) turns every opaque pixel white
                      // while leaving transparency alone. Hover brightens the
                      // white rather than restoring brand colour: most of
                      // these marks are black, so true colour on ink made them
                      // disappear. Only line-art survives the flattening,
                      // which is why a few firms are wordmarks instead —
                      // see content/firms.ts.
                      className="h-12 w-auto max-w-[180px] object-contain opacity-60 [filter:brightness(0)_invert(1)] transition-opacity duration-300 hover:opacity-100 motion-reduce:transition-none"
                    />
                  ) : (
                    // Firms with no usable logo file, set to match the marks.
                    <span className="text-paper/60 font-ui hover:text-paper text-lg font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 motion-reduce:transition-none">
                      {firm.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {shuffle ? (
        <script dangerouslySetInnerHTML={{ __html: shuffleScript }} />
      ) : null}
    </>
  );
}
