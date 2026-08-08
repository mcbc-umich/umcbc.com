/** Rule-separated list used for "Apply if you like…" and past engagements. */
export default function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="border-rule border-t">
      {items.map((item) => (
        <li
          key={item}
          className="border-rule text-slate text-body-lg flex gap-5 border-b py-5"
        >
          <span
            aria-hidden="true"
            className="bg-maize mt-3.5 h-0.5 w-6 shrink-0"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
