"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { a11y } from "@/content/copy";

export interface GalleryPhoto {
  src: string;
  alt: string;
}

/**
 * CSS scroll-snap carousel (§6) — no carousel library. The scrolling and the
 * snapping are native; this component only adds the two arrow buttons and the
 * position announcement.
 */
export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const step = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    const item = track?.firstElementChild as HTMLElement | undefined;
    if (!track || !item) return;
    track.scrollBy({
      left: direction * (item.offsetWidth + 16),
      behavior: "smooth",
    });
  }, []);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    const item = track?.firstElementChild as HTMLElement | undefined;
    if (!track || !item) return;
    setIndex(Math.round(track.scrollLeft / (item.offsetWidth + 16)));
  }, []);

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={onScroll}
        // Focusable so the region is reachable by keyboard; once focused,
        // browsers scroll it with the arrow keys natively and scroll-snap
        // lands it on a photo. The two buttons below page through it
        // explicitly and announce the position.
        tabIndex={0}
        role="region"
        aria-label={a11y.galleryLabel}
        className="snap-row flex snap-x snap-mandatory gap-4 overflow-x-auto"
      >
        {photos.map((photo) => (
          <li
            key={photo.src}
            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]"
          >
            <div className="bg-fog relative aspect-[4/3]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 368px, (min-width: 640px) 48vw, 85vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          className="border-rule hover:border-ink flex size-11 items-center justify-center border"
        >
          <span className="sr-only">{a11y.previousPhoto}</span>
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="border-rule hover:border-ink flex size-11 items-center justify-center border"
        >
          <span className="sr-only">{a11y.nextPhoto}</span>
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
        <p aria-live="polite" className="text-slate text-caption">
          {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
