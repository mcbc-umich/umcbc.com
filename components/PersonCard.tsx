import Image from "next/image";
import type { Person } from "@/content/people";

import SocialIcon from "./SocialIcon";

/** "Daniel Xiao" -> "DX". Used when no photo has been supplied yet. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export default function PersonCard({ person }: { person: Person }) {
  return (
    <figure>
      <div className="bg-fog border-rule relative aspect-square overflow-hidden border">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 1024px) 264px, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          // Deliberate fallback until club photos are exported (§9).
          <span
            aria-hidden="true"
            className="text-slate font-ui absolute inset-0 flex items-center justify-center text-3xl font-extrabold"
          >
            {initials(person.name)}
          </span>
        )}
      </div>

      <figcaption className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-semibold normal-case">
              {person.name}
            </h3>
            <p className="text-slate text-caption">
              {person.detail ?? person.role}
            </p>
          </div>

          {person.linkedin ? (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              className="text-slate hover:text-blue shrink-0 p-1"
            >
              <SocialIcon platform="linkedin" className="size-5" />
            </a>
          ) : null}
        </div>
      </figcaption>
    </figure>
  );
}
