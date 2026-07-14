---
title: "Journaling the journaler"
slug: "journaling-the-journaler"
date: "2026-06-30T18:10:00-07:00"
flavor: "potato"
audience: "self"
through_line: "We shipped the context-journal skeleton and immediately ran the potato flavor on the very session that created it."
diamonds:
  - "Three live clarifications shaped the build more than the upfront design did: (1) hand the web app off to a parallel session via a self-contained spec, (2) 'adaptable but still potato' = de-couple from my verticals, (3) 'potato is naming, not theme' = no spud gimmicks in the UI/content."
  - "Caught the naming-vs-theme point BEFORE writing the web spec — saved building a potato-mascot blog and rewriting it. Surfacing assumptions early paid off."
  - "Dogfooding works: the skill's procedure was followable by hand to journal its own creation, which is the real test that the procedure is concrete enough."
  - "Known, chosen tradeoff: self-contained flavors mean the potato procedure gets restated in tater/pierogi/fry — one engine, four copies to keep in sync. Accepted for copy-one-folder ergonomics."
  - "Two seed entries now exist in out/, which is better than one — it gives the web app's index page a real list to render."
tags: ["dogfooding", "skills", "process", "open-source"]
reading_time: 2
source:
  kind: "claude-session"
  summary: "Scaffolded context-journal (contract, potato skill, web spec, READMEs) and ran potato on the session itself."
  duration: "~1h"
cover: null
---

## The hook

The first real run of `potato` was on the session that built `potato`. That's the
test that matters: not whether the SKILL.md reads well, but whether its procedure is
concrete enough that you can actually follow it to produce a good entry. It was.
This entry is that proof, and the note-to-self about what actually moved the work.

## What we were doing

Going from an empty Apache-2.0 repo to a scaffolded open-source skill line. The
plan was clean on paper (contract + four flavors + a separate Astro app), but the
real shaping came from three mid-build corrections — worth remembering because the
*upfront design wasn't the thing that mattered most.*

## The diamonds

- **The corrections did the work.** "Hand the web build to a parallel session"
  turned one artifact (the spec) into the critical path. "Adaptable but still
  potato" meant de-coupling from my personal verticals without going generic.
  "Potato is naming, not theme" stopped a potato-mascot blog before it was written.
- **Catch assumptions before you build on them.** The naming-vs-theme note landed
  one message before I wrote the web spec. Had it come after, I'd have built and
  rewritten. The lesson: the cheapest place to be wrong is before the spec.
- **Dogfooding is the procedure test.** If I couldn't follow potato's own steps by
  hand here, the steps were too vague. They held.
- **One tradeoff, taken with eyes open.** Self-contained flavors duplicate the
  engine across four folders. Chosen for ergonomics; flagged so future-me isn't
  surprised when changing the engine means four edits.

## Where it landed / open threads

On disk: `CONTRACT.md`, `potato/SKILL.md`, `journal-web/SPEC.md`, two seed entries,
READMEs. Stubbed: `tater`, `pierogi`, `fry`. Next: a parallel session builds the
Astro app from the spec; I run potato live in other tabs to pressure-test the
contract; then build `tater` (live app integration) on top of potato's output.
The open question to revisit: whether the four-way duplication stays comfortable
once `tater` exists, or whether a shared core earns its keep after all.
