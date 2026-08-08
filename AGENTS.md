# Working in this repo

Built from `docs/mcbc-website-build-spec.md`. Section numbers in code comments
(`§5.4`, `§15.2`) point there — read the referenced section before changing
anything it governs.

## Stack

Next.js 15 App Router, TypeScript, Tailwind CSS v4 (CSS-first config), fully
static. No CMS, no API routes, no server-side data fetching.

## Constraints that are not negotiable

- **All copy lives in `content/`.** Never type a user-visible sentence into a
  `.tsx` file. A future board edits `content/` and nothing else.
- **No hex colours outside the `@theme` block** in `app/globals.css`. Use the
  tokens. `lib/theme.ts` parses that block at build time for the generated OG
  image and favicons rather than duplicating the values.
- **Three client components**: `Header`, `StatBand`, `PhotoGallery`. Everything
  else is a Server Component. Adding a fourth needs justification.
- **Three motion behaviours**: scroll reveal, logo marquee, stat count-up. All
  three are fully disabled under `prefers-reduced-motion: reduce`.
- **Vertical rhythm belongs to `<Section>`**, not to ad-hoc margins on children.
- Accessibility is a build requirement, not a stretch goal: one `<h1>` per page,
  no skipped heading levels, visible focus on everything, `aria-label` on every
  icon-only link.

## Before you commit

```bash
npm run lint && npm run typecheck && npm run build
```

Adding a dependency? Run `ANALYZE=true npm run build` and justify the weight.
§14 of the spec lists packages that are explicitly not to be installed and what
to use instead.

## Unresolved content

`grep -rn "TODO" content/` — each one is a factual question the two source sites
contradicted each other on. Do not guess at any of them; they need a human.
