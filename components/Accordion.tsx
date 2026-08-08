import { Plus } from "lucide-react";

import type { Faq } from "@/content/faqs";

/**
 * FAQ disclosure list built on native <details>/<summary> (§6) — keyboard
 * support and screen-reader semantics come for free and it ships zero
 * JavaScript.
 */
export default function Accordion({ items }: { items: Faq[] }) {
  return (
    <div className="accordion border-rule border-t">
      {items.map((item) => (
        <details key={item.question} className="border-rule group border-b">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6">
            <span className="font-display text-lg font-semibold">
              {item.question}
            </span>
            <Plus
              aria-hidden="true"
              className="text-slate size-5 shrink-0 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
            />
          </summary>
          <p className="text-slate measure pb-8">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
