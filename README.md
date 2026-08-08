# umcbc.com

The Michigan Consulting and Banking Club website. Next.js App Router,
statically generated, deployed on Vercel.

**Editing the site's text or roster?** You want
[`content/README.md`](content/README.md) — it's written for non-developers and
you don't need any of the below.

The build specification this was written from is
[`docs/mcbc-website-build-spec.md`](docs/mcbc-website-build-spec.md). Section
numbers referenced in code comments point there.

---

## Local development

Requires Node 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

| Script                       | Does                                             |
| ---------------------------- | ------------------------------------------------ |
| `npm run dev`                | Development server with hot reload               |
| `npm run build`              | Production build — run this before opening a PR  |
| `npm start`                  | Serve the production build locally               |
| `npm run lint`               | ESLint, including accessibility rules            |
| `npm run typecheck`          | TypeScript with no build output                  |
| `npm run format`             | Prettier, including Tailwind class sorting       |
| `ANALYZE=true npm run build` | Bundle report — run before adding any dependency |

## How it's put together

```
app/          One folder per route. Page files hold layout, never copy.
components/   The shared UI. Server Components unless marked 'use client'.
content/      Every word and every roster entry, as typed TypeScript.
lib/          Build-time helpers.
public/       Images and static files.
scripts/      One-off maintenance scripts.
docs/         The build spec.
```

Some rules worth keeping:

- **No copy in components.** If you're typing a sentence into a `.tsx` file,
  it belongs in `content/` instead. This is what lets the next board edit the
  site without touching React.
- **Typography is two system stacks** — Georgia for headings and prose,
  Helvetica for small uppercase UI labels — matching the source site. Nothing
  is downloaded, so there is no font request and no layout shift. This
  replaces the Archivo / Public Sans in §5.2 of the spec.
- **No hex colours outside the `@theme` block** in `app/globals.css`. That
  block is the whole design system — colours, type scale, container width.
  Components reference tokens (`bg-ink`, `text-slate`, `text-display-lg`).
  `lib/theme.ts` reads the same block back at build time for the generated
  social image and favicons, so those can't drift either.
- **Vertical rhythm lives in `<Section>`.** Don't add ad-hoc top or bottom
  margins to section children.
- **Three client components only** — `Header`, `StatBand`, `PhotoGallery`.
  Everything else renders on the server and ships no JavaScript. Adding a
  fourth needs a reason.
- **Three motion behaviours only** — scroll reveal, the logo marquee, the stat
  count-up. All three switch off completely under
  `prefers-reduced-motion: reduce`, and that is a requirement rather than a
  nicety.

## Making a change

Every change goes through a pull request; `main` is protected.

1. Branch off `main`.
2. Make the change.
3. `npm run lint && npm run typecheck && npm run build` — all three clean.
4. Open a PR. Vercel posts a preview URL within a minute or so.
5. **Review the preview link, not the diff.** That's how the board signs off on
   copy.
6. One approval, then merge. `main` deploys to umcbc.com automatically.

## Assets

Photography, headshots, firm marks and the club logo were imported from the
Wix mockup and processed into `public/images/` — WebP, ~3.6 MB in total, hero
images ~60 KB each. The full-resolution originals are not kept in the repo;
re-export them from the Wix media manager if you ever need them again.

Three things still need a person:

- **Check every face against every name.** The mockup's markup does not label
  its headshots, so each was matched to a person by its position on the page.
  See the note at the top of `content/people.ts`.
- **Renzo Silva has no photo.** The mockup uses one image for both him and
  Daniel Xiao, and it is a photo of one specific person, so it cannot be right
  for both. It is assigned to Daniel.
- **Two sector photos are stock-library previews** — Adobe Stock for
  Healthcare, Shutterstock for Industrials. Confirm a licence or replace them.
  See `content/sectors.ts`.

`sharp` is a devDependency used only for that one-off import. Nothing at
runtime depends on it.

## Before launch

`docs/mcbc-website-build-spec.md` §15 lists eight questions the two source
sites contradicted each other on — the founding year, the member count, name
spellings, missing LinkedIn URLs, the placement claim, which contact email is
actually monitored. Each one is marked with a `TODO` at the exact place in
`content/` where the answer goes.

```bash
grep -rn "TODO" content/
```

§17 of the spec is the full launch checklist, including the DNS cutover. The
one thing to be careful about: **do not delete the Google Site until DNS has
propagated and the new site is confirmed live**, and keep it archived for 30
days after that.

## Handing this over to next year's board

1. The GitHub organisation (`mcbc-umich`) should have at least two current
   board members as owners at all times. Add the incoming ones before the
   outgoing ones leave.
2. The Vercel account is tied to the club's shared email, not a personal one.
   Confirm whoever takes over can log into it.
3. The domain registration for `umcbc.com` renews annually — roughly $10–15.
   That is the site's entire running cost; Vercel's Hobby tier is free and a
   student org site with no revenue qualifies for it. If MCBC ever sells
   anything through the site, that requires Vercel Pro.
4. Walk the incoming board through `content/README.md` by making one real edit
   together, end to end, including the PR.
