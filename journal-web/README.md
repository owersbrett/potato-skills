# journal-web

A clean, editorial static blog that renders **journal entries** — structured posts
you generate from your working sessions and write for your future self. This app is
the **renderer only**; a separate skill writes the entries. The boundary between them
is the [entry contract](#the-entry-contract) below — the app codes strictly against
it.

Built with [Astro](https://astro.build) (content collections, zero client JS by
default), light + dark themes, syntax-highlighted code with copy buttons, and
client-side search.

---

## Quick start

```bash
npm install
npm run dev      # → http://localhost:4329
```

- **Dev port: `4329`** (set in `package.json` and reused by `preview`).
- `npm run build` produces a fully static site in `dist/` — deploy it to any static
  host.
- `npm run preview` serves the built site locally on the same port.
- `npm run check` type-checks the project (`astro check`).

On first run the app renders the example entries that ship in
`../context-journal/out`.

---

## Where entries come from

Entries are Markdown files read through an Astro **content collection**. The
directory is configurable with an environment variable:

| Var | Default | Meaning |
| --- | --- | --- |
| `JOURNAL_CONTENT_DIR` | `../context-journal/out` | Directory of contract-valid `.md` entries. Absolute, or relative to this project root. |

Point it wherever your journaling skill writes:

```bash
# one-off
JOURNAL_CONTENT_DIR=/path/to/my/journal npm run dev

# or persist it
cp .env.example .env
# edit JOURNAL_CONTENT_DIR in .env
```

Files whose name begins with `_` are ignored, so you can keep notes or drafts
alongside real entries.

**Add an entry with zero code changes:** drop a contract-valid `YYYY-MM-DD-<slug>.md`
into the content directory. It appears on `/`, at `/posts/<slug>`, in the relevant
`/tags/<tag>` archives, and in search automatically.

---

## The entry contract

Every entry is one Markdown file named `YYYY-MM-DD-<slug>.md` with this frontmatter.
The schema is enforced by Zod in `src/content.config.ts` — **a malformed entry fails
the build loudly**, because this is a content contract, not user input.

```yaml
---
title: string                 # required — post title
slug: string                  # required — url-safe, matches filename slug
date: string                  # required — ISO 8601 with timezone
flavor: string                # required — "potato" | "tater" | "pierogi" | "fry"
audience: string              # required — "self" | "world"
through_line: string          # required — one-sentence essence of the session
diamonds: string[]            # required — ≥1 key takeaways (recall hooks)
tags: string[]                # optional
reading_time: number          # optional — minutes; computed from body if absent
source:                       # optional — provenance
  kind: string                #   "claude-session" | "manual" | "other"
  summary: string
  duration: string            #   optional
cover: string | null          # optional — image path or url
---
```

Body is standard Markdown/GFM. Recommended (not required) spine: hook → what we were
doing → the diamonds → where it landed / open threads.

### Renderer rules

- Required fields are always present; every optional field renders gracefully when
  absent (never errors).
- `diamonds` is load-bearing — it's surfaced as a callout at the top of each post,
  previewed on the featured card, and weighted in search.
- `flavor` is a quiet signal: a small colored dot/badge, never a theme takeover.
  - `potato` — self · raw
  - `tater` — self · integrated
  - `pierogi` — world · editorial
  - `fry` — world · flashy
- Entries are self-contained; cross-link by `slug` (e.g. `/posts/other-slug`).

---

## Pages

| Route | What |
| --- | --- |
| `/` | Reverse-chronological index. Featured latest entry + card grid. |
| `/posts/<slug>` | Full entry: Diamonds callout, prose, provenance, prev/next. |
| `/tags` | All tags with counts. |
| `/tags/<tag>` | Entries filtered by tag. |
| `/about` | What a journal is and how entries get here. |
| `/search` | Client-side fuzzy search over title, through-line, diamonds, tags. |

---

## Theming

All color and type live in CSS custom properties at the top of
`src/styles/global.css`, split into a light `:root` block and a
`:root[data-theme='dark']` block. Components never hard-code color — **reskin the
whole blog by editing those tokens only**, no component changes needed.

- Change the accent: edit `--accent` (and `--accent-soft`, `--accent-contrast`).
- Change the type: edit `--font-serif` / `--font-sans` / `--font-mono` and the
  `--step-*` scale.
- Flavor dot colors: `--flavor-potato` / `--flavor-tater` / `--flavor-pierogi` /
  `--flavor-fry` (defined in both light and dark blocks).

Theme selection is system-aware (`prefers-color-scheme`) with a manual toggle in the
header; the choice is persisted to `localStorage` and applied before first paint to
avoid a flash.

---

## Project layout

```
src/
  content.config.ts        # Zod schema + glob loader (reads JOURNAL_CONTENT_DIR)
  lib/entries.ts           # helpers: sort, tags, reading time, flavor metadata
  styles/global.css        # design tokens (light + dark) + base styles
  components/               # FlavorBadge, ThemeToggle, Diamonds, EntryCard
  layouts/BaseLayout.astro # header, footer, theme boot script
  pages/
    index.astro            # /
    about.astro            # /about
    search.astro           # /search (island)
    search-index.json.ts   # static search index
    posts/[slug].astro     # /posts/<slug>
    tags/index.astro       # /tags
    tags/[tag].astro       # /tags/<tag>
```

---

## Stack

- **Astro 7** — static output, content collections, built-in Shiki syntax
  highlighting (dual light/dark themes).
- **TypeScript**, strict.
- **Zero client JS by default** — the only islands are the theme toggle, the code
  copy buttons, and the search page.
- No backend, no CMS, no auth. Just files in, static site out.
