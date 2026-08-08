import Link from "next/link";
import { nav, site, socials } from "@/content/site";

import SocialIcon from "./SocialIcon";
import { a11y, footer } from "@/content/copy";

export default function Footer() {
  // Computed at build time — both existing sites have a stale year (§7.6).
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-site mx-auto w-full px-6 py-16 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div>
            {/* TODO [§9] — replace this wordmark with the club logo as SVG
                once it has been sourced from the Wix media manager. */}
            <p className="font-display text-3xl font-extrabold tracking-tight uppercase">
              {site.abbreviation}
            </p>
            <p className="font-display text-eyebrow mt-3 uppercase">
              {site.displayName}
            </p>
            <p className="text-paper/70 text-caption mt-6">
              {footer.contactPrefix}{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-paper hover:text-maize underline underline-offset-4"
              >
                {site.email}
              </a>
            </p>
            <p className="text-paper/70 text-caption">{site.location}</p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label={a11y.footerNav}>
              <ul className="flex flex-col gap-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-display text-eyebrow hover:text-maize uppercase"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={a11y.socialNav}>
              <ul className="flex gap-4">
                {socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="border-paper/50 hover:border-maize hover:text-maize flex size-11 items-center justify-center border transition-colors duration-200 motion-reduce:transition-none"
                    >
                      <SocialIcon
                        platform={social.platform}
                        className="size-5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <p className="border-paper/20 text-paper/70 text-caption mt-16 border-t pt-8">
          © {year} {site.name}. {footer.rightsSuffix}
        </p>
      </div>
    </footer>
  );
}
