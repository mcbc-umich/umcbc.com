import type { Person } from "@/content/people";

import Eyebrow from "./Eyebrow";
import PersonCard from "./PersonCard";

export interface PersonGridProps {
  heading: string;
  id: string;
  people: Person[];
}

export default function PersonGrid({ heading, id, people }: PersonGridProps) {
  return (
    <div>
      <Eyebrow />
      <h2 id={id} className="text-display-lg">
        {heading}
      </h2>
      <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-10">
        {people.map((person) => (
          <li
            key={person.name}
            // Flex rather than grid so a short final row centres instead of
            // hanging left. Widths reproduce the 2/3/4 column steps exactly,
            // allowing for the 1.5rem gap between items.
            className="w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
          >
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </div>
  );
}
