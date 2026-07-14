---
title: "Designing the context-journal skill family"
slug: "designing-the-context-journal-family"
date: "2026-06-30T17:45:00-07:00"
flavor: "potato"
audience: "self"
through_line: "One stable entry contract lets the journaling skill and the blog app evolve on separate tracks."
diamonds:
  - "The output contract is the actual product; the four flavors are just registers (tone/audience) over the same schema."
  - "Flavors map to a 2x2: audience (self↔world) x production (raw↔produced). potato=self/raw, tater=self/integrated, pierogi=world/editorial, fry=world/flashy."
  - "potato is the kernel — ingest context, extract through-line + diamonds, emit one contract-valid Markdown file to ./out (overridable)."
  - "'Potato' is a naming convention, not a UI theme — the app and the entries stay clean and professional."
  - "Flavors are self-contained per folder so a user can grab just one; the web app is a separate Astro renderer that consumes the contract."
tags: ["architecture", "skills", "open-source", "astro"]
reading_time: 3
source:
  kind: "claude-session"
  summary: "Scoped the context-journal open-source skill line and the companion blog web app."
  duration: "~45m"
cover: null
---

## The hook

We're opening an open-source skills repo, and the flagship is **context-journal**:
instead of hitting *clear* on a Claude session, you *journal* it. The skill reads
the session and leaves a structured blog post for your future self — an organic
recall hook so scanning your own history gets you back up to speed. The big decision
today: a single **entry contract** is the spine, so the skill and a companion blog
app can be built in parallel without stepping on each other.

## What we were doing

Starting from an empty Apache-2.0 repo (just a LICENSE). The existing
`context-clearing` skill was the cousin to learn from — but it's hard-wired to one
person's verticals. context-journal is the de-coupled, anyone-can-use-it version.
We sharpened the four flavors, picked a stack, and split the work into two tracks.

## The diamonds

- **The contract is the product.** `CONTRACT.md` defines the frontmatter + body
  shape. Everything — every flavor, the web app, any future tool — codes against it.
- **Flavors are a 2x2.** Audience (self ↔ world) × production (raw ↔ produced):
  `potato` (self/raw kernel), `tater` (self/integrated with the app), `pierogi`
  (world/editorial, personal brand), `fry` (world/flashy, shareable).
- **Self-contained flavors.** Each lives in its own folder so a user can copy just
  one. The web app is a separate Astro static site that renders the contract.
- **Potato is naming, not theme.** The brand is in the names; the product is a clean,
  professional blog.

## Where it landed / open threads

Shipped the skeleton: flavor dirs, `CONTRACT.md`, the `potato` SKILL.md, and a
`journal-web/SPEC.md` handoff for a separate session to build the Astro app. Open:
build the web app (other session), then `tater` (live integration), then `pierogi`
and `fry`. Next test: run `potato` live in a couple of other active sessions.
