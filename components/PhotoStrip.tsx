import Image from "next/image";

/** Three-photo strip used on /strategy and /finance (§7.3, §7.4). */
export default function PhotoStrip({ photos }: { photos: string[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {photos.map((src) => (
        <li key={src} className="bg-fog relative aspect-[4/3]">
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}
