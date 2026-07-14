---
name: potatuhs-design
description: Compose a complete brand-guidelines website, together. A guided automation that interviews you through every component of a brand system — logo system, color, typography, iconography, photography, components, motion, layout, voice — then generates a token-first, print-ready, single-page-scroll guidelines site with a DESIGN.md as the canonical spec. Extracted from a real production brand system. Triggers on "brand guidelines", "brand system", "design system doc", "brand book", "compose our brand", "/potatuhs-design".
---

# potatuhs-design

Every serious brand eventually needs the document: the one place that says what
the logo may touch, which orange is *the* orange, how a heading is allowed to
sit. Most teams never write it because the blank page is enormous. **This skill
removes the blank page.** It walks you through every section of a brand system
in a fixed order, locks decisions one at a time, and then generates the
artifact: a brand-guidelines website you can scroll, share, and print to PDF —
backed by a `DESIGN.md` spec and a `tokens.css` file that other repos can
consume as the single source of truth.

It was extracted from a real, in-production brand system (Potatuhs). The
*categories* are universal; the Potatuhs-specific instances (its mascot deck,
its carousel signature, its icon taxonomy) were removed. What remains is the
exhaustive skeleton of a brand system that any brand can fill in.

> "Potatuhs" in the name is provenance, not a theme. The output is your brand,
> not ours.

## When to use it

The user says any of: "brand guidelines", "brand book", "brand system",
"design system document", "compose our brand", "/potatuhs-design" — or asks
for a website that presents their brand's colors/typography/logo rules.

## Companion files

- `SECTIONS.md` — the rubric: every section of a brand system, in order, with
  what it covers, what to ask, and what its page renders. **Read it before the
  interview.**
- `SITE.md` — the site architecture contract: how the generated website is
  built (single-page scroll, sidebar nav, tokens, print). **Read it before
  generating.**

## Procedure

### 1. Intake

Establish, in one short exchange, not a form:

- **New or existing?** Is there an existing brand (logos, fonts, hex values,
  a website to extract from) or are we defining from scratch? If assets exist,
  gather them first — extract real values rather than asking the user to
  recite them.
- **Scope.** Walk the section list in `SECTIONS.md` and agree which optional
  sections apply (mascots, photography, sub-brands, seasonal palettes). Core
  sections are not optional — a brand book without typography isn't one.
- **Where it lives.** Target directory for the generated site + spec.

### 2. Interview — one section at a time

Work through `SECTIONS.md` **in order**. For each section:

1. **Propose, don't quiz.** Draft a concrete starting point from what you
   already know (intake assets, earlier sections, sensible defaults) and put
   it in front of the user. "Here's a five-step type hierarchy using your two
   fonts — sizes below. Adjust?" beats twenty questions.
2. **Lock it.** When the user confirms, record the decision immediately into
   the growing `DESIGN.md` draft. Locked sections are inputs to later ones
   (color feeds components; components feed motion).
3. **Move on.** One section per exchange, roughly. Never dump the whole
   questionnaire at once; never stall a section past two rounds — take the
   best answer, mark open items, continue.

### 3. Write the contract

When all in-scope sections are locked, write the two contract files:

- **`DESIGN.md`** — the canonical spec, section-per-section, with every locked
  value, rule, and do/don't. This document outranks the website; the website
  renders it.
- **`tokens.css`** — every value from the spec as CSS custom properties, in
  the token namespaces defined in `SITE.md`. Components never hard-code what a
  token declares.

### 4. Generate the site

Build the guidelines website per `SITE.md`: a single-page-scroll document,
one `<section>` per locked section, sidebar nav with scroll-synced
highlighting, cover page with table of contents, scroll-reveal animation,
print stylesheet for PDF export. Wire every rendered value to `tokens.css`.

### 5. Hand off

Run the dev server, verify: nav highlights track scrolling, every section
renders, print preview paginates cleanly. Then report: what's locked, what's
placeholder, and the single next decision that would most improve the system.

## Business OS integration

This skill doubles as the **brand stone** (stone 3 of 8) of the
[Business OS](../business-os/PROTOCOL.md) family. When composing inside a
Business OS workspace, additionally: read the upstream documents first
(`vision/VISION.md` — personality and refusals; `customer-blueprint/CUSTOMER.md`
— who the aesthetic must land with) and extract instead of re-asking; emit
`module.json` (slug `brand`, order 3, port 4003) with `DESIGN.md` as the
canonical doc and `tokens.css` as the machine contract; ship the standard MCP
surface and a module `CLAUDE.md` noting that `messaging` cites the voice
section and every stone's site consumes the tokens. Standalone use (no
workspace) skips all of this — the skill is complete without it.

## Hard rules

- **Exhaustive by default.** Every section in `SECTIONS.md` is either present
  in the output or explicitly cut during intake with a stated reason. Silent
  omission is a bug.
- **Token-first.** If a value appears in the spec, it exists in `tokens.css`,
  and the site reads the token. No hard-coded brand values in components.
- **`DESIGN.md` is the SSOT.** The site is a renderer. When they disagree, the
  site is wrong.
- **Never invent brand facts.** Unknown values get a loud, visible
  `PLACEHOLDER` marker in both spec and site — never a plausible-looking
  fabrication. A placeholder is an honest to-do; a fabrication poisons the
  document's authority.
- **Propose → confirm → lock.** No section enters the spec without the user
  seeing it. No locked section is reopened silently.
- **The user's aesthetic wins.** The skill supplies structure and rigor, not
  taste. When the user's call conflicts with a "best practice", note the
  trade-off once, then do it their way.
