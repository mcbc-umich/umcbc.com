"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { nav, site } from "@/content/site";
import { a11y } from "@/content/copy";

const SCROLL_THRESHOLD = 80;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // The header is transparent over the hero on the homepage only (§4).
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change (§4). Adjusted during render rather than in an
  // effect so the panel never paints for a frame on the new page.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Escape to close, Tab trapped inside the panel, body scroll locked (§11).
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(
          panel.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ),
        )
      : [];
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 motion-reduce:transition-none ${
        overHero ? "bg-transparent" : "bg-ink"
      }`}
    >
      <div className="max-w-site mx-auto flex h-20 w-full items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo/mcbc-white.png"
            alt={`${site.name} home`}
            width={512}
            height={512}
            priority
            sizes="48px"
            className="h-12 w-auto"
          />
        </Link>

        <nav aria-label={a11y.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="text-paper font-ui text-eyebrow after:bg-maize relative uppercase after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:transition-[width] after:duration-200 hover:after:w-full aria-[current=page]:after:w-full motion-reduce:after:transition-none"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/recruitment"
                className="bg-maize text-ink font-ui text-eyebrow hover:bg-paper px-5 py-2.5 uppercase transition-colors duration-200 motion-reduce:transition-none"
              >
                {a11y.applyCta}
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="text-paper -mr-2 p-2 lg:hidden"
        >
          <span className="sr-only">
            {open ? a11y.closeMenu : a11y.openMenu}
          </span>
          {open ? (
            <X aria-hidden="true" className="size-6" />
          ) : (
            <Menu aria-hidden="true" className="size-6" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="bg-ink fixed inset-0 top-20 z-40 lg:hidden"
        >
          <nav aria-label={a11y.primaryNav} className="px-6 py-10">
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="text-paper font-ui border-rule/20 aria-[current=page]:text-maize block border-b py-4 text-2xl uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <Link
                  href="/recruitment"
                  className="bg-maize text-ink font-ui text-eyebrow block px-6 py-4 text-center uppercase"
                >
                  {a11y.applyCta}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
