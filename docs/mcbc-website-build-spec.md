# MCBC Website — Build Spec

**Deliverable:** A statically-rendered Next.js site deployed on Vercel from GitHub, replacing both the Wix mockup and the legacy Google Sites site at `umcbc.com`.

**Sources being merged:**
- **Aesthetic + information architecture** → the Wix mockup (`elliekozemchak.wixsite.com/michigan-consulting`), 5 pages
- **Content completeness** → the live Google Sites site (`umcbc.com`), 4 pages — real form links, full roster with LinkedIn URLs, real social accounts, longer body copy

Where the two conflict, this spec states which wins. Where neither is trustworthy, it's flagged in **§15 — Open questions**. Do not invent content to fill those gaps; use the placeholder tokens specified and leave a `TODO` comment.

---

## 1. Objective and constraints

Build a fast, accessible, five-page marketing site for a University of Michigan student organization. Primary audience is prospective members (undergrads deciding where to apply during fall recruitment); secondary audience is potential clients and alumni.

**Hard constraints:**

1. Every page must be statically rendered at build time. No server-side data fetching, no database, no API routes.
2. No CMS in v1. All copy and roster data lives in typed TypeScript files under `/content` so a future board can edit content by editing one file, not by touching components.
3. Total first-load JavaScript under 100 KB gzipped per route.
4. The site must remain editable by a non-expert. Assume the next president has never used React.
5. Do not add authentication, member portals, payment, or a blog. Out of scope.

**Explicit non-goal:** this is not a redesign. Match the Wix mockup's visual language. Improve execution (typography, spacing discipline, motion, accessibility), not direction.

---

## 2. Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15+, App Router, TypeScript | Best Vercel integration; Claude Code writes it reliably; static export path is clean |
| Rendering | SSG — all routes static | Zero runtime cost, best Core Web Vitals |
| Styling | Tailwind CSS v4 | v4 uses CSS-first config; tokens live in `@theme` in one file |
| Fonts | `next/font/google`, self-hosted at build | Eliminates render-blocking font requests and layout shift |
| Images | `next/image` | Automatic AVIF/WebP, correct `sizes`, no CLS |
| Icons | `lucide-react`, tree-shaken individual imports | ~1 KB per icon actually used |
| Deploy | Vercel, GitHub integration | Free Hobby tier covers this entirely |

**Do not** introduce: a component library (MUI, Chakra, Bootstrap), a carousel library (Swiper, react-slick), `framer-motion`, GSAP, `moment`, `lodash`, `next-seo`, or `next-sitemap`. Every one of those is replaceable with ~20 lines of native CSS or a built-in Next.js API. See §14.

---

## 3. Repository and deployment setup

Run these steps in order. Steps marked **[human]** cannot be done by Claude Code and must be done by a person in a browser.

1. **[human]** Create a GitHub **Organization** named `mcbc-umich` — not a personal repo. Club assets must outlive any one member's account. Add at least two current board members as owners.
2. **[human]** Any member with a `@umich.edu` address should claim GitHub Education (free Pro) at `education.github.com`.
3. Create repo `mcbc-umich/website`, public, MIT or no license.
4. Scaffold: `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*"`
5. Commit to `main`. Branch protection on `main`: require one approving review before merge.
6. **[human]** Create a Vercel account using the club's shared email (not a personal address). Import the GitHub repo. Framework preset auto-detects as Next.js — accept defaults.
7. **[human]** Verify the preview deployment renders, then in Vercel → Settings → Domains, add `umcbc.com` and `www.umcbc.com`. Set `umcbc.com` as primary with `www` redirecting to it.
8. **[human]** At the current domain registrar for `umcbc.com`, replace the Google Sites DNS records with the A / CNAME records Vercel displays. Propagation takes minutes to a few hours. **Do not delete the Google Site until DNS has propagated and the new site is confirmed live.**

**Cost note for the board:** the club already owns `umcbc.com`. Vercel Hobby is $0. So ongoing cost after this migration is domain renewal only — roughly $10–15/year — versus a Wix Premium plan at roughly $200–350/year. Vercel's Hobby tier is licensed for non-commercial use; a student org site with no revenue qualifies. If MCBC ever sells anything through the site, that requires Vercel Pro at $20/month.

**Branching:** every change goes through a PR. Vercel builds a preview URL per PR automatically — that preview link is how the board reviews copy changes before they go live.

---

## 4. Information architecture and routes

The Wix mockup's five-page structure wins over the Google Sites four-page structure. Its slugs (`/blank`, `/blank-1-1`) are Wix defaults and must not be carried over.

| Route | Page | Source of content |
|---|---|---|
| `/` | Home | Wix Home + Google Sites Home |
| `/about` | About Us | Wix About + Google Sites "What We Do" + "Our Team" |
| `/strategy` | Strategy | Wix Strategy + Google Sites "What We Do" |
| `/finance` | Finance | Wix Finance + Google Sites "What We Do" |
| `/recruitment` | Recruitment | Wix Recruitment + Google Sites "Prospective Members" |

**Redirects.** The Google Sites URLs have been live and indexed; preserve them in `next.config.ts`:

```ts
async redirects() {
  return [
    { source: '/home',                destination: '/',            permanent: true },
    { source: '/what-we-do',          destination: '/about',       permanent: true },
    { source: '/our-team',            destination: '/about',       permanent: true },
    { source: '/prospective-members', destination: '/recruitment', permanent: true },
  ];
}
```

**Navigation.** Header: Home · About Us · Strategy · Finance · Recruitment, plus a filled `APPLY` button linking to `/recruitment`. Note the order swap — the Wix nav reads "Finance, Strategy" but the Home page presents Strategy first. Use **Strategy before Finance** consistently everywhere; the club name puts consulting first.

Header is sticky, transparent over the hero on `/`, solid `--ink` after 80px of scroll. On other pages it is solid from the start. Mobile: full-screen overlay menu, focus-trapped, closes on Escape and on route change.

---

## 5. Design system

Define all of this once in `app/globals.css` under Tailwind v4's `@theme` block. No hex value may appear anywhere else in the codebase.

### 5.1 Color

```css
@theme {
  --color-ink:    #0A1E33; /* primary dark — headers, dark sections, body text */
  --color-blue:   #00274C; /* Michigan Blue — official, for accents and gradients */
  --color-maize:  #FFCB05; /* Michigan Maize — use sparingly, see below */
  --color-paper:  #FFFFFF;
  --color-fog:    #F4F5F7; /* alternating section background */
  --color-slate:  #5B6674; /* secondary text, captions */
  --color-rule:   #E2E5EA; /* hairlines, card borders */
}
```

**Maize discipline.** Maize is the single accent and appears in at most four places per page: the 2px rule under section eyebrows, the underline that animates in on nav hover, the stat numerals, and the primary CTA on dark backgrounds. It is never a large fill and never a background for body text — `#FFCB05` on white fails contrast badly. Maize text only ever sits on `--color-ink`.

**Contrast floor:** every text/background pair must clear WCAG AA (4.5:1 for body, 3:1 for text at 24px+). Verify `--color-slate` on `--color-fog` specifically; darken slate if it fails.

### 5.2 Typography

Two families, both variable, both self-hosted via `next/font/google` with `display: 'swap'`.

- **Display — `Archivo`.** All headings. Set uppercase with `letter-spacing: -0.01em` at large sizes, `+0.08em` at small sizes (eyebrows). Weights 600 and 800 only.
- **Body — `Public Sans`.** All paragraphs, captions, UI labels. Weights 400 and 600 only.

Load exactly those four weights. Do not load italics.

Type scale (clamp for fluid sizing, no media queries needed):

```
display-xl  clamp(2.75rem, 7vw, 5.5rem)   /* hero H1 */
display-lg  clamp(2rem, 4.5vw, 3.25rem)   /* section H2 */
display-md  clamp(1.5rem, 2.5vw, 2rem)    /* card H3 */
eyebrow     0.8125rem, uppercase, +0.08em tracking, weight 600
body-lg     1.125rem / 1.65                /* intro paragraphs */
body        1rem / 1.7                     /* default */
caption     0.875rem / 1.5
stat        clamp(2.5rem, 5vw, 4rem), weight 800, font-variant-numeric: tabular-nums
```

Body copy measure caps at `65ch`. Never let a paragraph run full-bleed.

### 5.3 Layout

Container max-width `1200px`, gutters `24px` mobile / `48px` desktop. 12-column grid on desktop, 4-column on mobile, gap `24px`.

Vertical rhythm: sections are `py-20` on mobile, `py-32` on desktop. Set this on a single `<Section>` component and never override it with ad-hoc margins on children — that is the most common way this kind of build ends up with inconsistent spacing.

Section backgrounds alternate `paper → fog → paper`. Dark (`ink`) sections are reserved for the hero, the stat band, and the final CTA.

### 5.4 Motion

Three motion behaviors total. No others.

1. **Scroll reveal.** Sections fade up 16px over 500ms on entering the viewport, via `IntersectionObserver` + a CSS class. Fires once per element.
2. **Logo marquee.** Continuous horizontal scroll, CSS `@keyframes` only, duplicated track for seamless loop. Pauses on hover and on keyboard focus.
3. **Stat count-up.** Numerals count from 0 to target over 1200ms when the stat band enters view, once.

All three must be fully disabled inside `@media (prefers-reduced-motion: reduce)` — content renders in final state immediately, marquee becomes a static wrapped grid. This is a hard requirement, not a nice-to-have.

### 5.5 Signature element

The **Industry Connections marquee** is the one memorable component. Build it properly: firm marks in `--color-slate` monochrome at rest, resolving to full color on hover, on a continuously scrolling track above the alumni placement stat. It is the visual argument the whole page is making — that MCBC members end up at these firms — so it gets the execution budget. Everything around it stays quiet.

---

## 6. Component inventory

Build these in `/components`. Server Components by default; only the four marked **[client]** get `'use client'`.

| Component | Notes |
|---|---|
| `Section` | Wrapper handling background variant, vertical padding, container width |
| `Eyebrow` | Uppercase label + maize rule |
| `Header` **[client]** | Sticky, scroll-state, mobile overlay menu |
| `Footer` | Logo, contact, social icons, copyright, "Ann Arbor, MI" |
| `Hero` | Background image + `ink` overlay at 55% opacity, eyebrow, H1, subhead, two CTAs |
| `StatBand` **[client]** | Four stats, tabular numerals, count-up |
| `PathCard` | Strategy / Finance selector card — image, title, body, arrow link |
| `LogoMarquee` **[client]** | See §5.5 |
| `PersonCard` | Photo (1:1, `object-cover`), name, role, LinkedIn icon link |
| `PersonGrid` | Responsive grid of `PersonCard`, 2/3/4 columns, with a group heading |
| `SectorCard` | Image, sector name, sub-label of industries |
| `PhotoGallery` **[client]** | CSS scroll-snap carousel, arrow + keyboard nav, no library |
| `Accordion` **[client]** | FAQ. Use native `<details>`/`<summary>` styled with CSS — accessible for free, zero JS |
| `CTABand` | Dark full-width band, headline, single button |
| `Button` | Variants: `primary` (maize on ink), `secondary` (outline), `ghost` |

`PhotoGallery` and `Accordion` should need almost no JavaScript — scroll-snap and `<details>` do most of the work natively. If either grows past ~40 lines of client JS, that's a signal to simplify.

---

## 7. Page specifications with final copy

Copy below is **final** unless marked `[DRAFT]` or `[CONFIRM]`. Typos present in both source sites have been corrected — do not reintroduce them.

### 7.1 `/` — Home

**Hero** (full viewport height, background photo, ink overlay)
- Eyebrow: `UNIVERSITY OF MICHIGAN · EST. 2017` `[CONFIRM — see §15.1]`
- H1: `Michigan Consulting and Banking Club`
- Subhead: `The leading dual-initiative business consulting and investment organization at the University of Michigan.`
- Buttons: `Apply Now` → `/recruitment` (primary) · `Learn More` → `/about` (secondary)

**Stat band** (ink background, four columns)

| Value | Label |
|---|---|
| `$15K` | Assets Under Management |
| `50+` | Businesses Served |
| `60+` | Active Members `[CONFIRM — §15.2]` |
| `15+` | Years of Experience `[CONFIRM — §15.1]` |

**Our Purpose** (fog background, two columns: image left, text right)

> Michigan Consulting and Banking Club (MCBC) seeks to bridge the worlds of finance and consulting for students at the University of Michigan through hands-on project experience, rigorous professional development, and a collaborative community.
>
> Whether students arrive with a clear goal in finance or consulting or are still discovering their interests, MCBC provides the resources, tools, and mentorship to help them make informed career decisions and grow with confidence.
>
> We are based within the Ross School of Business and are a highly selective organization.

**Choose Your Path** (paper background)

Intro: `MCBC offers two distinct initiatives, each with its own education track and projects. Members participate in one initiative per semester.`

Two `PathCard`s, Strategy first:

- **Strategy** — `Considering a career in consulting? MCBC Strategy sources real projects with local and big-name clients to provide genuine client-facing consulting experience.` → `Explore MCBC Strategy` → `/strategy`
- **Finance** — `Interested in finance? Banking? Private equity? Through hands-on work and elite mentorship, MCBC Finance equips members with the skills to conduct professional financial analysis and ace technical interviews.` → `Explore MCBC Finance` → `/finance`

> **Bug from the Wix site:** its "Explore MCBC Strategy" link points back at the homepage. Fix it here.

**Industry Connections** (ink background)

> Our alumni go on to work at the top firms and companies in the country. Through rigorous education and an extensive network, members are equipped with a competitive advantage to take on the best internships and jobs in the market.

`LogoMarquee`, then the line: `220+ Alumni · 100% Full-Time Placement` `[CONFIRM — §15.5]`

**Closing CTA** — headline `Learn. Grow. Inspire.`, button `Apply Today` → `/recruitment`

---

### 7.2 `/about` — About Us

**About Us**

> Since its founding in 2017, Michigan Consulting and Banking Club has been guided by its mission of creating a rich culture of business excellence, collaboration, and impact.
>
> MCBC continues to build upon its past to support students pursuing careers across finance and strategy in an increasingly global business landscape.

**Professional Development**

> Weekly education meetings cover recruiting for the most popular career functions in finance and consulting, teaching networking, interview strategy, and professionalism in fields such as investment banking and management consulting.
>
> Professional development workshops and personalized feedback help members strengthen their resumes, technical skills, and networking ability.
>
> Education meetings also include upperclassmen career panels, company speaker events, semester-long projects, and competitions.

**Four pillars** — a 4-card row. The Wix site has the literal word "Text" in all four bodies. Draft copy below is written to match the club's register; the board must review before launch.

- **Mentorship** `[DRAFT]` — `Every new member is paired with an experienced member who has recruited for the roles they're targeting. Mentors review resumes, run mock interviews, and make introductions.`
- **New Member Education** `[DRAFT]` — `A structured first-semester curriculum covering accounting fundamentals, valuation, case structuring, and market sizing. No prior background required.`
- **Bootcamp** `[DRAFT]` — `An intensive pre-semester weekend that takes new members from fundamentals to a complete stock pitch or case deliverable before recruiting begins.`
- **Professional Network** `[DRAFT]` — `An alumni base across investment banking, private equity, consulting, and corporate strategy, reachable through our directory and alumni panels.`

**Testimonials** — two quote cards:

> "MCBC isn't just where I discovered my passion for business, but where I developed the skills to pursue that career."
> — **Barry Wang**, Class of Fall 2023

> "MCBC didn't just provide the resources for my career pursuits, but a community of support which motivated me to succeed."
> — **Rohan Girvin**, Class of Fall 2024

**Find Your Community**

> At MCBC, you will find a vibrant community of 50+ members with diverse interests in the business world. Through club-wide socials, retreats, mentorship programs, and casual hangouts, we seek to foster a welcoming environment where members don't just prepare for a career in business, but find a place to build genuine connections, make friends, and grow together outside of the classroom.

Followed by `PhotoGallery` (17 images on the Wix site).

**Executive Board** — `PersonGrid`. Use the **Wix roster** (newer). LinkedIn URLs harvested from the Google Sites roster where names match:

| Name | Role | LinkedIn |
|---|---|---|
| Daniel Xiao | President | `linkedin.com/in/xiaodaniel` |
| Felicia Zhongzhang | Director of Strategy | `linkedin.com/in/felicia-zhongzhang` |
| Suki Zhao | Director of Internal | `linkedin.com/in/suki-zhao-716451265` |
| Amelia Kayi | Director of Recruiting | `linkedin.com/in/amelia-kayi` |
| Jason Moy | Director of External | `linkedin.com/in/jason-moy-132371201` |

**Senior Advisors** — `PersonGrid`, name + program/year, LinkedIn:

| Name | Program | LinkedIn |
|---|---|---|
| Angie Xu | BBA 2027 | `linkedin.com/in/angelie-xu` |
| Barry Wang | BBA 2027 | `linkedin.com/in/barrywang73` |
| Jen Li | BBA 2027 | `linkedin.com/in/jjenlii` |
| Abhinav Ramanathan | Computer Engineering 2027 | `linkedin.com/in/abhinav-ramanathan` |
| Leah Zhou | BBA 2027 | `linkedin.com/in/leahezhou` |
| Alexander Zhang | Computer Science 2027 | `linkedin.com/in/alexyz1` |
| Jonathan Song | BBA & CS 2028 | `linkedin.com/in/jonathan-j-song` |
| Erika Yee | BBA 2028 | `linkedin.com/in/yee-erika` |
| Celina Du | BBA & CS & Asian Studies 2028 | `linkedin.com/in/celinadu` |
| Michael Zheng | BBA 2028 | `linkedin.com/in/michael-z-zheng` |
| Josh Li | Data Science 2028 | `linkedin.com/in/manuli1212` |

> Name spellings and class years differ between the two source sites. The table above uses the Google Sites spellings, which are more likely correct because each is tied to a LinkedIn URL. See §15.3 — **a human must verify every name before launch.**

---

### 7.3 `/strategy` — Strategy

**Header:** `STRATEGY`

> MCBC's consulting initiative immerses members in structured problem-solving environments. Through semester-long client-facing projects, case interview preparation, and team-based engagements, members hone their analytical skills, communication ability, and confidence in a fast-paced consulting environment.

Three-photo strip.

**Apply if you like...**
- Solving ambiguous problems creatively
- Leveraging data and research to craft actionable solutions
- Working and bonding with a tight-knit, high-performing team

**Past Engagements**

> The Wix site labels this section "Investment Sectors" — a copy-paste error from the Finance page. The correct heading is **Past Engagements**.

- Digital transformation @ a global health and wellness company
- Market entry & growth @ an Ann Arbor restaurant favorite
- Social media & pricing strategy @ a local dessert & cafe chain

**Project Managers** — `PersonGrid`:

| Name | LinkedIn |
|---|---|
| Tomas Hall | `linkedin.com/in/tom-zionede-hall-97226334b` |
| Ascher Bustos | `[MISSING — §15.4]` |
| Sean Gretzinger | `linkedin.com/in/sean-gretzinger` |
| Rayhan Zahin | `linkedin.com/in/rayhan-zahin` |

**Placement** — reuse `LogoMarquee`. Copy must be consulting-specific, not the finance copy the Wix site duplicates here:

> `[DRAFT]` From management consulting to corporate strategy and product roles, our members bring their MCBC experience to leading firms across the industry.

Then `... and much more`.

**CTA:** `Apply Today` → `/recruitment`

---

### 7.4 `/finance` — Finance

**Header:** `FINANCE`

> MCBC's finance initiative centers on understanding how businesses and markets interact. Members leverage financial analysis, market research, and predictive models to evaluate opportunities, assess risk, and formulate data-driven investment decisions. Members can expect to hone the skills needed for careers in investing, banking, and corporate finance.

Three-photo strip.

**Apply if you like...**
- Analyzing companies, markets, and financial statements
- Building models and turning data into insights
- Learning how financial decisions affect real-world outcomes

**Investment Sectors** — `SectorCard` grid, seven cards:

| Sector | Sub-label |
|---|---|
| Consumer Goods | Electronics, Packaging, Retail |
| Energy | Green Energy, Oil & Gas, Distribution |
| Healthcare | Pharmacy, Biotech, Equipment |
| TMT | Software, Hardware, Telecom, Media, Fintech |
| Industrials | Industrials & Manufacturing |
| Prediction Market | Quant-Based Odds & Forecasting |
| FIG | Financial Firms & Commercial Banks |

Closing line: `Each investment sector offers members the opportunity to develop specialized market knowledge through research, valuation, and real-world analysis.`

**Past Engagements**
- Stock pitches in industries including TMT, Consumer, and Industrials
- Participation in pitch competitions at Miami University, MIG, and more
- Mock IB, PE, and corporate finance "Superday" interviews

**Desk Heads** — `PersonGrid`. Sector assignments differ between sites; Wix wins as newer:

| Name | Desk | LinkedIn |
|---|---|---|
| Ashley Liao | Consumer | `[MISSING]` |
| Kyle Cui | Industrial | `linkedin.com/in/kyle-cui-977913315` |
| Jacob Benninger | TMT | `linkedin.com/in/jacob-benninger-26716821b` |
| Renzo Silva | FIG | `linkedin.com/in/renzo-e-65210526b` |
| Lily Graham | Prediction Market | `linkedin.com/in/lily-graham-b84151320` |
| Alex Ye | Energy | `[MISSING]` |
| Michael Zhang | Energy | `[MISSING]` |
| Tommy Lu | Healthcare | `[MISSING]` |

> Two people are both listed as Energy desk head on the Wix site. See §15.4.

**Placement** — `LogoMarquee` +

> From investment banking to private equity and corporate finance, our members bring their MCBC experience to leading firms across the industry.

**CTA:** `Apply Today` → `/recruitment`

---

### 7.5 `/recruitment` — Recruitment

**Header:** `RECRUITMENT`

> Our fall recruitment schedule will be posted as the fall semester approaches.
>
> We appreciate your interest in MCBC and encourage you to reach out to mcbc-board@umich.edu with any recruitment-related questions.

**Primary actions** — two buttons, sourced from the live Google Sites page:
- `Apply to MCBC` → `https://docs.google.com/forms/d/e/1FAIpQLSc9CYWgDeCQjMx49GYjX80qoTDp4xI0WOVBvzEPUIdZpSe5Dw/viewform` (primary)
- `Fill Out Our Interest Form` → `https://forms.gle/J6cHMV2gG5zuBQoc6` (secondary)

Both open in a new tab with `rel="noopener noreferrer"`.

> Verify both forms are still accepting responses before launch — the Wix mockup dropped them entirely, which is the single biggest functional regression in that mockup.

**FAQs** — four `Accordion` items:

1. **What will MCBC's application and interview process be like?**
   The application process consists of a written application and an interview. Interviews mix behavioral questions with technical questions based on the initiative you indicate on your application. Applicants who indicate finance should expect basic accounting and finance technical questions; applicants who indicate consulting should expect a short case study.

2. **What does MCBC look for in prospective members?**
   MCBC looks for a lot of things in applicants, not just technical knowledge. Your character when interacting with members, your passion for the club, and your ability to communicate all matter to your candidacy — don't let a lack of technical experience deter you from applying.

3. **I'm not in Ross. Am I still eligible to apply?**
   Yes. We encourage all U-M students with an interest in MCBC's mission and initiatives to apply. Diversity in major is highly important to our club's success, and we do not discriminate based on college or major.

4. **How can I best prepare to apply to MCBC?**
   The best preparation is to be genuinely excited about the club. Show up to events, talk to our members, and decide this is a community you want to be part of. The passion and curiosity you demonstrate in your application and interviews will help you stand out.

Closing: `If you have any other questions, email mcbc-board@umich.edu. We look forward to reading your applications.`

---

### 7.6 Footer (all pages)

Logo · `Michigan Consulting & Banking Club` · `Questions? Contact mcbc-board@umich.edu` `[CONFIRM — §15.6]` · `Ann Arbor, MI` · `© {current year} Michigan Consulting and Banking Club. All rights reserved.`

Copyright year must be computed at build time, not hardcoded — both existing sites are stale.

**Social links.** The Wix mockup links six icons to bare domains (`www.facebook.com`, `www.tiktok.com`, etc.) — placeholders that must never ship. Only two real accounts exist:

- Instagram → `https://www.instagram.com/mcbc_um/`
- LinkedIn → `https://www.linkedin.com/company/108401482`

Render only these two. Do not render icons for accounts that don't exist.

---

## 8. Content data model

Create `/content` with one file per concern. Every component reads from these; **no copy string may be hardcoded inside a component.**

```
content/
  site.ts        # name, tagline, email, socials, form URLs, nav items
  stats.ts       # the four homepage stats
  people.ts      # board, advisors, desk heads, project managers
  sectors.ts     # the seven finance sectors
  engagements.ts # past engagements, strategy + finance
  faqs.ts        # recruitment FAQ items
  firms.ts       # placement logos for the marquee
  copy.ts        # long-form prose blocks keyed by page/section
```

Types must be explicit and exported, so a mistake in a content file becomes a build-time error rather than a broken page:

```ts
export interface Person {
  name: string;
  role: string;
  group: 'board' | 'advisor' | 'desk-head' | 'project-manager';
  detail?: string;      // "BBA 2027" or "TMT"
  linkedin?: string;    // full https URL
  photo: string;        // path under /public/images/people/
}
```

Add `content/README.md` written for a non-developer: how to edit a name, swap a photo, change a stat, and get the change reviewed and live via a GitHub PR. This file is what makes the site survivable across board turnover — treat it as a deliverable, not an afterthought.

---

## 9. Assets

**[human] step — Claude Code cannot do this.** Images must be exported from the source sites first.

1. In the Wix editor (Ellie Kozemchak's account), open Media Manager and download all originals at full resolution. Failing that, right-click each image on the published site and save it — but note Wix serves resized derivatives, so editor access gives materially better source files.
2. For Google Sites images, the `lh3.googleusercontent.com` URLs end in a size parameter like `=w1280`. Replacing it with `=s0` returns the original upload.
3. Get the logo as **SVG** if it exists anywhere. `Logo (White Transparent).png` will look soft on retina displays. If only PNG exists, source at 3× the largest display size.

Once collected, place under:

```
public/images/
  hero/      people/      gallery/      sectors/      firms/
```

Processing rules:
- Convert photographs to WebP at quality 80; keep an original JPEG fallback only if `next/image` isn't handling a case.
- Hero image: max 1920px wide, target under 250 KB after compression.
- Person photos: square, 600×600, face-centered crop.
- Firm logos: SVG where obtainable, otherwise transparent PNG at 2×.
- Every `next/image` gets explicit `width`, `height`, and a correct `sizes` attribute. The hero gets `priority`; nothing else does.
- Every image gets meaningful `alt` text. Decorative images get `alt=""`.

**On firm logos:** only display marks for firms where MCBC members have actually placed, and keep them monochrome at rest. Displaying a company's logo can imply endorsement or partnership. A text list of firm names is the lower-risk option and is worth considering if the board isn't confident in every mark on the current strip.

---

## 10. Performance requirements

Targets, verified on mobile emulation with 4× CPU throttling:

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |
| LCP | < 1.8s |
| CLS | < 0.05 |
| INP | < 200ms |
| First-load JS | < 100 KB gzipped per route |

Rules that get you there:
- Default to Server Components. `'use client'` appears in exactly the four files listed in §6.
- No client-side data fetching anywhere.
- Fonts self-hosted through `next/font` — no `<link>` to Google Fonts.
- Every image dimensioned; no layout shift.
- Marquee animates `transform` only, never `left` or `margin`.
- Run `ANALYZE=true npm run build` before merging anything that adds a dependency.

---

## 11. Accessibility

Accessibility score of 100 is a build requirement, not a stretch goal.

- Semantic landmarks: one `<header>`, one `<main>`, one `<footer>`, `<nav>` with `aria-label`.
- Exactly one `<h1>` per page; heading levels never skip.
- Visible focus ring on every interactive element — 2px maize outline with 2px offset. Never `outline: none` without a replacement.
- Mobile menu traps focus, closes on Escape, returns focus to the trigger.
- Carousel is keyboard-navigable with arrow keys and announces position.
- FAQ uses native `<details>`/`<summary>`.
- All icon-only links (LinkedIn, social) carry `aria-label` naming the destination and the person: `aria-label="Daniel Xiao on LinkedIn"`.
- Skip-to-content link as the first focusable element.
- `prefers-reduced-motion` honored throughout, per §5.4.
- Test with keyboard only, then with VoiceOver or NVDA, before launch.

---

## 12. SEO and metadata

Use the App Router Metadata API. No `next-seo`.

- Root `metadata` in `app/layout.tsx`: `metadataBase: new URL('https://umcbc.com')`, title template `%s | Michigan Consulting and Banking Club`, description, `openGraph`, `twitter: { card: 'summary_large_image' }`.
- Per-page `metadata` export on all five routes with unique titles and descriptions.
- `app/sitemap.ts` and `app/robots.ts` — both built into Next.js.
- One Open Graph image at `app/opengraph-image.png`, 1200×630, logo on ink.
- JSON-LD `Organization` schema in the root layout: name, URL, logo, `sameAs` array with the two real social URLs, `parentOrganization` University of Michigan.
- Favicon set: `app/icon.png` plus `app/apple-icon.png`.

---

## 13. Forms and integrations

No backend. The two Google Forms in §7.5 are the entire form story — link out, do not embed. Embedded Google Forms are slow, unstyleable, and hurt Core Web Vitals.

If the board later wants a native contact form, the right answer is a Vercel Function plus Resend's free tier, or Formspree's free tier. Out of scope for v1.

---

## 14. Packages

### Install

```bash
npm i @vercel/analytics @vercel/speed-insights lucide-react
npm i -D @next/bundle-analyzer prettier prettier-plugin-tailwindcss eslint-plugin-jsx-a11y
```

| Package | Why |
|---|---|
| `@vercel/analytics` | Privacy-friendly pageview analytics, no cookie banner needed, free on Hobby. Add `<Analytics />` to root layout. |
| `@vercel/speed-insights` | Real-user Core Web Vitals from actual visitors, not just lab scores. Add `<SpeedInsights />` to root layout. |
| `lucide-react` | Icons. Import individually: `import { Linkedin } from 'lucide-react'`. |
| `@next/bundle-analyzer` | Catches dependency bloat before it ships. |
| `prettier-plugin-tailwindcss` | Sorts Tailwind classes so diffs stay readable across contributors. |
| `eslint-plugin-jsx-a11y` | Catches missing alt text and unlabeled controls at lint time. |

Already included by Next.js and requiring no install: `next/image`, `next/font`, `sharp` (auto on Vercel), sitemap and robots generation, the Metadata API.

### Do not install

| Package | Instead |
|---|---|
| `framer-motion` / GSAP | ~35–90 KB for three fade-ups. Use `IntersectionObserver` + CSS transitions. |
| `swiper` / `react-slick` | CSS `scroll-snap-type: x mandatory`. Native, free, better on touch. |
| MUI / Chakra / Bootstrap | Fights Tailwind, adds 80 KB+, produces generic output. |
| `next-seo` | The App Router Metadata API supersedes it. |
| `next-sitemap` | `app/sitemap.ts` is built in. |
| `moment` / `lodash` | `Intl.DateTimeFormat` and native array methods. |
| `react-icons` | Ships enormous barrel files. `lucide-react` with named imports is far smaller. |

### Vercel dashboard settings **[human]**

- Analytics → **enable**
- Speed Insights → **enable**
- Deployment Protection → **enable for preview deployments** so half-finished drafts aren't publicly indexable
- Firewall → **Attack Challenge Mode available if needed** (free tier)
- Image Optimization → on by default, leave it

### Dev tooling worth having

- Chrome DevTools Lighthouse — run per page before each release
- `npx unlighthouse --site umcbc.com` — audits all five pages at once
- axe DevTools browser extension — catches accessibility issues Lighthouse misses

---

## 15. Open questions — these need a human answer before launch

Do not guess at any of these. Use the placeholder and leave a `TODO`.

**15.1 — Founding year contradiction.** The Wix homepage says `EST. 2014` and `15+ Years of Experience`. Both the Wix About page and the Google Sites homepage say `Since its founding in 2017`. 2017 is nine years ago, not fifteen. Two of these three numbers are wrong. Recommendation: use **2017**, and change the stat to `9` years or replace that stat entirely with something verifiable.

**15.2 — Member count contradiction.** Homepage stat says `60+ Active Members`. Both About pages say `a vibrant community of 50+ members`. Pick one and use it in both places.

**15.3 — Roster verification.** Names differ between the two sites: Felicia Zhongzang/Zhongzhang, Jacob Benniger/Benninger, Tom/Tomas Hall, Johnathan/Jonathan Song, Abhinav Ramanthan/Ramanathan. Celina Du is listed as "BBA & CS & Asian Students 2027" on one site and "BBA & CS & Asian Studies 2028" on the other. Misspelling a member's name on a public site is the kind of error people notice. **Every name and class year must be confirmed by a person.**

**15.4 — Missing data.** No LinkedIn URL exists in either source for Ashley Liao, Alex Ye, Michael Zhang, Tommy Lu, or Ascher Bustos. Also, Alex Ye and Michael Zhang are both listed as Energy desk head — is one of them a different sector, or is it a genuine co-head?

**15.5 — Placement claim.** `220+ Alumni | 100% Full-Time Placement` appears only on the Wix mockup and is a strong public claim. Confirm it's defensible before publishing.

**15.6 — Email address bug.** Both sites display `mcbc-board@umich.edu` as link text while the underlying `mailto:` points to `mcbc-eboard@umich.edu`. One of these is wrong and has been wrong on the live site for some time. **Send a test email to both addresses and confirm which one is monitored**, then use it consistently in the display text, the `mailto:` href, and the JSON-LD.

**15.7 — Board approval on `[DRAFT]` copy.** The four About-page pillar blurbs (§7.2) and the Strategy placement line (§7.3) were written for this spec because the source sites had literal placeholder text. They need board sign-off.

---

## 16. Build order

Work in these phases, committing at each boundary. Do not start writing page components before phase 2 is complete.

1. **Foundation** — scaffold, `@theme` tokens, fonts, `Section`, `Button`, `Eyebrow`, `Header`, `Footer`. Verify tokens render on a scratch page.
2. **Content layer** — all of `/content` with types, populated from §7. Site should typecheck with zero components consuming it yet.
3. **Home** — hero, stat band, purpose, path cards, marquee, CTA. This exercises most of the component library.
4. **Strategy and Finance** — largely shared structure; build one, extract shared components, then the other.
5. **About** — the heaviest page; person grids and gallery.
6. **Recruitment** — smallest page.
7. **Polish** — motion, reduced-motion, focus states, metadata, sitemap, OG image, JSON-LD.
8. **Audit** — Lighthouse on all five routes, keyboard pass, screen-reader pass, bundle analysis. Fix and re-verify.
9. **Handoff** — write `content/README.md` and a root `README.md` covering local dev, the PR workflow, and how to hand the repo to next year's board.

---

## 17. Definition of done

- [ ] Five routes render, statically generated, no runtime errors
- [ ] All four Google Sites redirects resolve correctly
- [ ] Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100, on every route
- [ ] First-load JS under 100 KB gzipped on every route
- [ ] No hardcoded copy in any component — all content sourced from `/content`
- [ ] No hex colors outside the `@theme` block
- [ ] Full keyboard traversal with visible focus at every stop
- [ ] `prefers-reduced-motion` verified: no animation, no count-up, static marquee
- [ ] Every image has explicit dimensions and meaningful alt text
- [ ] Both Google Form links tested and confirmed accepting responses
- [ ] Only real social accounts linked — no placeholder domains
- [ ] Every item in §15 resolved, with no `TODO` or `[CONFIRM]` remaining in shipped content
- [ ] `content/README.md` written and tested by a non-developer board member
- [ ] `umcbc.com` resolves to Vercel; Google Site archived, not deleted, for 30 days
