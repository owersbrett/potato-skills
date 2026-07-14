# The Journal Entry Contract

> The single source of truth shared by **the skill** (which writes entries) and
> **the web app** (which renders them). Both tracks code against this file.
> Change it here, nowhere else.

A journal entry is **one Markdown file** with YAML frontmatter. One file = one
session journaled. Filename: `YYYY-MM-DD-<slug>.md`.

## Frontmatter

```yaml
---
title: "Wiring the journaler's output contract"   # human title for the post
slug: "wiring-the-output-contract"                # url-safe; matches filename slug
date: "2026-06-30T17:40:00-07:00"                 # ISO 8601 with timezone
flavor: "potato"                                  # potato | tater | pierogi | fry
audience: "self"                                  # self | world
through_line: "One contract lets the skill and the web app evolve in parallel."
diamonds:                                         # the recall hooks — the whole point
  - "The output contract is the product; flavors are just registers over it."
  - "potato writes to ./out by default, overridable via --output."
tags: ["architecture", "skills", "astro"]
reading_time: 3                                   # minutes; optional, app may compute
source:                                           # provenance of the session
  kind: "claude-session"                          # claude-session | manual | other
  summary: "Designed the context-journal skill family and the blog app."
  duration: "~40m"                                # optional
cover: null                                        # optional image path/url
---
```

**Required:** `title`, `slug`, `date`, `flavor`, `audience`, `through_line`,
`diamonds` (≥1). Everything else is optional and the renderer must tolerate absence.

## Body (Markdown)

The body is a recall-optimized blog post for **future-self** (or the chosen
audience). Standard Markdown / GFM — headings, code fences, lists, links. No
required heading structure, but the recommended spine is:

1. **The hook** — the through-line, expanded to a paragraph. Why this session mattered.
2. **What we were doing** — enough context that future-you re-enters cold.
3. **The diamonds** — the insights/decisions/gotchas worth keeping (mirrors `diamonds`).
4. **Where it landed / open threads** — state at close, next steps, unfinished business.

Flavors vary the *register* of this body (plain for potato, editorial for pierogi,
flashy for fry) but never the frontmatter schema.

## Contract rules

- The schema is **stable across all flavors**. Only `flavor`, `audience`, and the
  body's tone change between them.
- Renderers must **fail soft**: a missing optional field renders as absent, never
  an error.
- `diamonds` is load-bearing — it powers search, recall surfacing, and previews.
  An entry with no diamonds isn't worth writing.
- Entries are **append-only and self-contained** — no entry depends on another to
  render. Cross-links are by `slug` and optional.
