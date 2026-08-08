import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { a11y } from "@/content/copy";
import { site, socials } from "@/content/site";

import "./globals.css";

// Both families are variable and self-hosted at build time (§5.2). Only
// weights 600/800 (display) and 400/600 (body) are ever used — see globals.css.
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | University of Michigan`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    url: site.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/**
 * Scroll-reveal bootstrap (§5.4). Inline and framework-free so it costs no
 * client component and no hydration: it flags <html> as JS-capable, which is
 * what turns the hidden state on at all, then reveals each section once.
 */
const revealScript = `
document.documentElement.dataset.js = '';
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = 'IntersectionObserver' in window;
  var io = supported && !reduced ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.setAttribute('data-revealed', '');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }) : null;

  // Tracked off-DOM: writing a "seen" attribute would change markup React is
  // about to hydrate against.
  var seen = new WeakSet();
  var queued = false;

  function scan() {
    queued = false;
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      if (io) io.observe(el); else el.setAttribute('data-revealed', '');
    });
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(scan);
  }

  // Safety net: anything already on screen once the page has loaded is shown
  // whether or not the observer has reported it. Content is never left at
  // opacity 0 because an IntersectionObserver callback was slow or never came.
  function sweep() {
    document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        el.setAttribute('data-revealed', '');
      }
    });
  }

  function start() {
    scan();
    // Client-side navigation swaps in new sections; keep observing them.
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
    if (document.readyState === 'complete') sweep();
    else window.addEventListener('load', sweep);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.abbreviation,
  url: site.url,
  logo: `${site.url}/opengraph-image.png`,
  email: site.email,
  description: site.tagline,
  foundingDate: String(site.foundedYear),
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: site.region,
    addressCountry: "US",
  },
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: site.parentOrganization,
  },
  sameAs: socials.map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The bootstrap script below stamps data-js on <html> before React
      // hydrates, which is the whole point of it — so the mismatch is expected.
      suppressHydrationWarning
      className={`${archivo.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />

        <a
          href="#main"
          className="bg-maize text-ink font-display text-eyebrow sr-only uppercase focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3"
        >
          {a11y.skipToContent}
        </a>

        <Header />

        <main id="main" className="flex-1 pt-20">
          {children}
        </main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
