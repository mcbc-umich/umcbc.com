"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { Stat } from "@/content/stats";

const DURATION = 1200;

/** easeOutCubic — quick start, soft landing. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// Runs before paint on the client, falls back to useEffect during SSR so
// React doesn't warn. Used so the numerals can be reset to zero without the
// final values flashing first.
const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export interface StatBandProps {
  stats: Stat[];
}

export default function StatBand({ stats }: StatBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Starts at 1 so the server-rendered markup — and any visitor without
  // JavaScript — shows the real numbers rather than a row of zeroes.
  const [progress, setProgress] = useState(1);

  useBeforePaint(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion: leave the final values in place, no count-up (§5.4).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setProgress(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          setProgress(ease(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
      {stats.map((stat) => {
        const final = `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`;
        return (
          <div key={stat.label}>
            {/* Hidden from assistive tech so the count-up isn't announced
                digit by digit; the final value is read out with the label. */}
            <p
              aria-hidden="true"
              className="text-accent text-stat [font-variant-numeric:tabular-nums]"
            >
              {stat.prefix}
              {Math.round(stat.value * progress)}
              {stat.suffix}
            </p>
            <p className="text-paper/70 font-ui text-eyebrow mt-3 uppercase">
              <span className="sr-only">{final} — </span>
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
