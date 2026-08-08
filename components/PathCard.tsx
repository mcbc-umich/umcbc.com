import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { PathOption } from "@/content/copy";

export default function PathCard({ path }: { path: PathOption }) {
  return (
    <article className="group border-rule bg-paper border">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={path.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 576px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="p-8 lg:p-10">
        <h3 className="text-display-md">{path.title}</h3>
        <p className="text-slate measure mt-4">{path.body}</p>
        <Link
          href={path.href}
          className="font-ui text-eyebrow group-hover:text-blue mt-8 inline-flex items-center gap-2 uppercase"
        >
          {path.cta}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </Link>
      </div>
    </article>
  );
}
