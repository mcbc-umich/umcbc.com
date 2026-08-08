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
      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => (
          <li key={person.name}>
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </div>
  );
}
