# Spec — `journal-web`

> **Handoff doc.** You are building a standalone web app from scratch. This spec is
> self-contained — you do not need any other context. Build a clean, visually
> appealing, modern blog that renders "journal entries." Ignore any "potato"
> branding except the project's name; the **UI itself is a clean, professional blog**
> with no mascots, puns, or themed gimmicks.

## What this is

A static blog that renders **journal entries** — structured posts a developer
generates from their working sessions, written primarily for their future self as
a recall tool. Think: a beautiful personal knowledge blog. The reading experience
should make someone *want* to scroll their own history.

This app is the **renderer/consumer only**. A separate skill writes the entries.
The boundary between them is the entry contract (below) — code strictly against it.

## Stack (decided)

- **Astro** (latest), content collections, Markdown/MDX.
- TypeScript. Zero client JS by default; add islands only where interaction earns it
  (e.g. search, theme toggle).
- Static output (`astro build` → deployable to any static host).
- Styling: your choice of clean CSS (Tailwind or vanilla CSS with custom
  properties both fine). Ship a **light + dark** theme.

## Data source

- Entries live as Markdown files matching the contract below.
- Read them via an Astro **content collection** with a Zod schema mirroring the
  frontmatter. Point the collection at a directory that is **configurable via env
  var** `JOURNAL_CONTENT_DIR` (default: `../context-journal/out`). Document this in
  the README so a user can point the app at wherever their skill writes.
- Validate frontmatter with the Zod schema; fail the build loudly on a malformed
  entry (this is a content contract, not user input).

## The entry contract (input data shape)

Every entry is one Markdown file, `YYYY-MM-DD-<slug>.md`, with this frontmatter:

```yaml
---
title: string                 # required — post title
slug: string                  # required — url-safe, matches filename slug
date: string                  # required — ISO 8601 w/ timezone
flavor: string                # required — "potato" | "tater" | "pierogi" | "fry"
audience: string              # required — "self" | "world"
through_line: string          # required — one-sentence essence of the session
diamonds: string[]            # required — ≥1 key takeaways (recall hooks)
tags: string[]                # optional
reading_time: number          # optional — minutes; compute from body if absent
source:                       # optional — provenance
  kind: string                #   "claude-session" | "manual" | "other"
  summary: string
  duration: string            #   optional
cover: string | null          # optional — image path/url
---
```

Body: standard Markdown/GFM. Recommended spine (do not hard-require it): hook →
what we were doing → the diamonds → where it landed / open threads.

**Renderer rules:** required fields always present; every optional field must render
gracefully when absent (never error). `diamonds` is load-bearing — surface it
prominently (previews, search). Entries are self-contained; cross-links by `slug`.

## Pages / routes

1. **`/` — index.** Reverse-chronological list of entries. Each card shows: title,
   date, reading time, `through_line` as the dek, tags, and a small `flavor` badge.
   This page must feel like a polished editorial blog index, not a file listing.
2. **`/posts/[slug]` — entry.** The full post. Strong typographic hierarchy,
   comfortable measure (~65–75ch), excellent code blocks (syntax highlighting,
   copy button), and a **"Diamonds" callout** near the top surfacing `diamonds` as
   the TL;DR. Show `source.summary` subtly as provenance.
3. **`/tags/[tag]` — tag archive.** Entries filtered by tag.
4. **`/about`** — static page explaining what a journal is and how entries get here
   (placeholder copy fine).
5. **Search** (nice-to-have, ship if time): client-side fuzzy search over title +
   `through_line` + `diamonds` + tags. A small island; Pagefind or a tiny custom index.

## Design direction

- **Clean, modern, editorial.** Reference quality: a well-designed personal blog /
  publication (think Stripe Press / Vercel blog / good Ghost themes). Confident
  type, generous whitespace, restrained palette, one tasteful accent color.
- **Typography-first.** A real type scale, a serif or high-quality sans for body,
  comfortable line length and rhythm. The reading experience is the product.
- **Light + dark**, system-aware with a toggle.
- **`flavor` as a quiet signal** — a small colored badge/dot per flavor (potato,
  tater, pierogi, fry), not a theme takeover.
- **Responsive**, fast (lean into Astro's zero-JS default), accessible (semantic
  HTML, WCAG AA contrast, focus states).
- **Themeable**: drive color/type from CSS custom properties (or Tailwind theme
  tokens) so a user can reskin without touching components.

## Acceptance criteria

- `npm install && npm run dev` serves the app; pick a dev port that's free and
  state it in `package.json` and README.
- Dropping a contract-valid `.md` into the content dir makes it appear on `/` and at
  `/posts/[slug]` with no code changes.
- A malformed entry fails the build with a clear message.
- Index and post pages look genuinely polished in both light and dark mode on
  mobile and desktop.
- README documents: the contract, `JOURNAL_CONTENT_DIR`, the dev port, and how to
  add a theme.

## Out of scope

- Generating entries (a separate skill does that).
- Auth, CMS, comments, a backend. This is a static renderer.
- Any potato-themed visual gimmicks. Clean blog only.

## Seed data

Create 2–3 example entries under the content dir so the app renders on first run.
Use realistic developer sessions (one per flavor is ideal to show the badge).
