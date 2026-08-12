# Editing the MCBC website

**You do not need to know how to code to use this guide.** Everything the site
says — every name, every paragraph, every link — lives in this folder. You edit
a file, someone reviews it, and it goes live. Nothing else to learn.

If something here doesn't work the way it's described, that's a bug in this
guide. Fix the guide too.

---

## The one rule

**Change text in `content/`. Don't touch anything outside it.**

Files outside this folder control how the site _looks_. Files inside it control
what it _says_. You almost never need the first kind.

---

## What's in each file

| File             | What it holds                                                               |
| ---------------- | --------------------------------------------------------------------------- |
| `site.ts`        | Club name, contact email, the menu, social links, the two Google Form links |
| `copy.ts`        | All the paragraphs. Every page's text is in here                            |
| `people.ts`      | Board, members, senior advisors, desk heads, project managers               |
| `stats.ts`       | The four big numbers on the homepage                                        |
| `sectors.ts`     | The seven Finance investment sectors                                        |
| `engagements.ts` | "Past Engagements" and "Apply if you like…" bullet lists                    |
| `faqs.ts`        | The recruitment questions and answers                                       |
| `firms.ts`       | The three scrolling placement lists (home, strategy, finance)               |

---

## How to make a change

You'll do this in your browser. No software to install.

1. Go to the repo on GitHub and click into `content/`.
2. Click the file you want to change.
3. Click the **pencil icon** (top right) to edit it.
4. Make your change (see the recipes below).
5. Scroll down. Under **Propose changes**, write one line saying what you did —
   "Update president to Jane Chen" — and choose **Create a new branch for this
   commit and start a pull request**.
6. Click **Propose changes**, then **Create pull request**.
7. Wait about a minute. A bot will post a **preview link** on your pull request.
   Click it. That is your change, live, on a private URL. Check it looks right.
8. Ask another board member to review and merge it. A few minutes after they
   merge, it's live on umcbc.com.

If the preview link doesn't appear, or shows a red X, something in your edit
has a typo — see **When something breaks** at the bottom.

---

## Recipes

### Change a person's name, title, or LinkedIn

Open `people.ts`. Find them. Each person looks like this:

```ts
{
  name: "Daniel Xiao",
  role: "President",
  group: "board",
  linkedin: "https://www.linkedin.com/in/xiaodaniel",
  photo: "",
},
```

Change the text **between the quote marks**. Leave the quote marks, the commas
and the word before the colon exactly as they are.

- `role` — their title. For advisors and desk heads this stays "Senior Advisor"
  or "Desk Head"; the thing shown under their name is `detail`.
- `detail` — "BBA 2027" for an advisor, or the desk name like "TMT".
- `group` — which grid they appear in. Must be exactly one of `board`,
  `advisor`, `member`, `desk-head`, `project-manager`.
- `linkedin` — the full address starting with `https://`. If they don't have
  one, delete that whole line and no icon will show.

### Add a person

Copy an existing block from the first `{` to the `},` including the comma, paste
it where you want them to appear, and edit it. Order in the file is the order on
the page.

### Remove a person

Delete the whole block from `{` to `},`.

### Swap someone's photo

1. Get a **square** photo, ideally 600x600 pixels, cropped so their face is
   centred.
2. Upload it to `public/images/people/` on GitHub (**Add file → Upload files**).
   Name it simply: `jane-chen.jpg`.
3. In `people.ts`, set their photo line to:
   `photo: "/images/people/jane-chen.jpg",`

Leaving `photo: ""` is fine — the card shows their initials instead. Fourteen
people are set that way today: Sky Ni, Renzo Silva and everyone in the Members
group.

Their headshots do exist, on umcbc.com/our-team, but they could not be copied
across automatically: Google serves Sites images from short-lived signed links
that refuse any request from outside a live browser, and LinkedIn blocks
automated requests outright. Saving them by hand takes a couple of minutes:
open umcbc.com/our-team, right-click a photo, **Save image as**, then follow
the three steps above.

### Change a paragraph

Open `copy.ts`. It's organised by page: `home`, `about`, `strategy`, `finance`,
`recruitment`. Find the section, edit the text inside the quote marks.

If your text contains an apostrophe or a quote mark, it's safest to write it as
a curly one — `don't`, `"like this"` — because a straight `"` will end the text
early and break the build.

### Change one of the four homepage numbers

Open `stats.ts`.

```ts
{ value: 50, suffix: "+", label: "Businesses Served" },
```

`value` must be a plain number with no quote marks around it — that's what
counts up when the page loads. Anything decorative goes in `prefix` (before)
or `suffix` (after).

### Change the contact email or a form link

Open `site.ts`. The email appears in one place and is used everywhere
automatically. Same for the two Google Form links under `forms`.

### Add a firm to a scrolling placement list

Open `firms.ts`. There are three separate lists — `homeFirms`, `strategyFirms`
and `financeFirms` — one per page. Add a line to the one you want:

```ts
{ name: "Firm Name" },
```

That renders the name as text, which is why there is no box behind it. To use
an actual logo instead, upload a file with a **transparent** background to
`public/images/firms/` and write:

```ts
{ name: "Lazard", logo: "/images/firms/lazard.webp", width: 320, height: 84 },
```

The width and height must be the real pixel size of the file. Read the note at
the top of `firms.ts` first — there is a judgement call about showing company
logos at all.

### Add or change a menu item

Open `site.ts`, find `nav`. Adding a menu item only makes sense if a matching
page exists — that part needs a developer.

---

## What you can't do from this folder

These need someone comfortable with the code:

- Adding a whole new page
- Changing colours, fonts or spacing
- Changing how a section is laid out

---

## When something breaks

GitHub will show a red X on your pull request instead of a preview link. Almost
always it's one of these:

- **A missing comma** between two entries, or a missing `,` after `}`.
- **An unmatched quote mark** — every `"` needs its partner. An apostrophe typed
  as `"` inside text will do this.
- **A missing `}` or `]`** after deleting something — delete whole blocks, not
  parts of them.
- **A typo in a fixed word** like `group: "borad"`. Those only accept the exact
  values listed above.

Click the red X to see the error. The message names the file and line number.

**Nothing you do here can take the site down.** If an edit is broken it simply
won't merge — the live site keeps running the last good version. Edit freely.

---

## Before launch: things that still need a human

Search this folder for `TODO`. Every one is a question the two old sites
couldn't answer and nobody should guess at:

- Which email is actually monitored — `mcbc-board@` or `mcbc-eboard@`
- Whether the club was founded in 2014 or 2017, and what the "years of
  experience" number should be
- Whether it's 50+ or 60+ active members (the homepage and About page disagree)
- The correct spelling of every name and class year
- Whether every headshot is beside the right name (they were matched from the
  old site by position, not by label)
- Missing LinkedIn URLs, and whether Energy really has two desk heads
- Whether "220+ Alumni · 100% Full-Time Placement" is defensible
- Board sign-off on the four About-page pillar blurbs and the Strategy
  placement line, which were drafted rather than transcribed
- Whether every firm in the homepage scroller is one the board can stand behind
- Which titles the people in the Members group actually hold now — the old site
  gives several of them board titles that clash with the current board

The full detail on each is in `docs/mcbc-website-build-spec.md`, section 15.
