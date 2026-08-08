import Image from "next/image";

import type { Sector } from "@/content/sectors";

export default function SectorCard({ sector }: { sector: Sector }) {
  return (
    <article className="border-rule group border">
      <div className="bg-fog relative aspect-[4/3] overflow-hidden">
        {/* Empty `image` means no photo exists for this sector yet; the tinted
            panel is the intended fallback, not a broken image. */}
        {sector.image ? (
          <Image
            src={sector.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold">{sector.name}</h3>
        <p className="text-slate text-caption mt-2">{sector.industries}</p>
      </div>
    </article>
  );
}
