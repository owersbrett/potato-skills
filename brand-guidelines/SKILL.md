---
name: brand-guidelines
description: Compose a complete brand-guidelines website, together. Opens with one question — Auto (scan the directory, infer everything, refine after) or Manual (a guided interview) — then walks every component of a brand system — logo system, color, typography, iconography, photography, components, motion, layout, voice — and generates a token-first, print-ready, single-page-scroll guidelines site with a DESIGN.md as the canonical spec. Extracted from a real production brand system. Triggers on "brand guidelines", "brand system", "design system doc", "brand book", "compose our brand", "/brand-guidelines".
---

# brand-guidelines

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

## When to use it

The user says any of: "brand guidelines", "brand book", "brand system",
"design system document", "compose our brand", "/brand-guidelines" — or asks
for a website that presents their brand's colors/typography/logo rules.

## Companion files

- `SECTIONS.md` — the rubric: every section of a brand system, in order, with
  what it covers, what to ask, and what its page renders. **Read it before the
  interview.**
- `SITE.md` — the site architecture contract: how the generated website is
  built (single-page scroll, sidebar nav, tokens, print). **Read it before
  generating.**
- `CRAFT.md` — the taste contract: semantic HTML, systematic CSS, banned
  generic-AI patterns, accessibility, restraint. **Read it before writing any
  HTML or CSS**, and hold every rendered section against it before asking for
  a lock.

## Procedure

### 1. Intake — one question first

Open with exactly one question:

> "Should I scan the current directory and build your brand-guidelines
> site? **Auto** — I scan, infer everything, and build it now; you correct
> what's wrong. **Manual** — I interview you first, section by section."

- **Auto.** Skip the questionnaire (step 2). Scan the directory and every
  reachable asset (logos, stylesheets, sites, docs, CLAUDE.md, memory),
  extract real values, and go straight to the one shot — provenance labeled
  honestly: `context` for everything extracted, `invented` for every gap
  taste had to fill. The back and forth (step 4) then runs the interview in
  reverse: the user corrects a concrete draft instead of answering
  questions. Nothing locks without confirmation on either path.
- **Manual.** The full path: questionnaire, then the one shot.

Then settle, in the same short exchange (never a form):

- **New or existing?** Is there an existing brand (logos, fonts, hex values,
  a website to extract from) or are we defining from scratch? If assets exist,
  gather them first — extract real values rather than asking the user to
  recite them.
- **Scope.** Every section in `SECTIONS.md`, always — 00 through 15, no
  tiers, no cuts (Brett, 2026-08-03; the retired Essentials/Complete tier
  system consistently dropped 09, 10, 12, 14, and 15). A section with
  nothing extracted still renders: scaffolded rules, loud placeholders, or
  the brand's explicit "none" stance — but the section exists, in order.
- **Where it lives.** Target directory for the generated site + spec.

Manual intake ends with the **first render**: the scaffold (`index.html` +
`styles.css` + `tokens.css`, raw and buildless per `SITE.md` and `CRAFT.md`)
carrying exactly one section — the cover, with the name, tagline, and
version just gathered. Do the craft prep (installed design-craft skills,
cultural-aesthetic research) before this render. Then reveal it with the
verbatim line from step 3 — the user's first flip to the browser shows a
page someone meant to make, never a shell, and every section from here on
lands in that same open tab, one refresh away.

### 2. The questionnaire — render as you go

*(Manual path only — Auto goes straight to step 3.)*

Walk the in-scope sections in `SECTIONS.md` order. For each section, two
moves, always in this order:

1. **Ask.** The section's questions as an open-ended working conversation —
   **the user speaks first; you conclude later**, section by section. Ask
   about feel, not implementation — who this is for, what it should feel
   like, brands they admire and why, colors that feel right and wrong, type
   that sounds like them, the imagery world, how loud, how warm, how
   heritage, how modern. Use research (`CRAFT.md` — decision science,
   category convention) to shape *what you ask*, never to pre-empt the
   answer.
2. **Render.** Write the section into the site marked `PROPOSED`, complete
   with its encoded alternates and invitation zones (`SITE.md`), then say
   so: "refresh the page — section NN is in." The sections array grows as
   sections exist; a section not yet interviewed simply isn't there — never
   an empty stub, never a bare terminal. After every section, the site is
   demoable exactly as far as the conversation has reached.

Cadence is the product here: not too many questions, not too few — a few
per exchange, reflect back what you heard before asking more, follow the
user's energy. Working *with* each other, never a form. Record every answer
as `answered` provenance. The user may delegate any area — "you draft it" —
which licenses invention, recorded as `invented`.

The phase ends when every in-scope section is rendered, holding either
answered data or an explicit delegation — and you can say the brand's vibe
back and the user agrees you have it.

### 3. The build — one shot (Auto) · finishing pass (Manual)

**Auto** builds the whole thing in one pass: the scaffold (`index.html` +
`styles.css` + `tokens.css`, raw and buildless per `SITE.md` and
`CRAFT.md`), every in-scope section rendered as `PROPOSED` from the scan,
the `DESIGN.md` draft. Do the craft prep first: installed design-craft
skills, cultural-aesthetic research.

**Manual** arrives here with every section already rendered (step 2); this
pass finishes the artifact: sweep the whole document for cross-section
coherence (color feeding components, typography feeding layout), resolve
stray scaffolding, and complete the `DESIGN.md` draft from the recorded
provenance.

**Both paths:** wherever the questionnaire or the scan yielded competing
live directions or a delegation, the **alternatives are ENCODED into the
artifact** (see `SITE.md` — Encoded alternates): every A/B is a *working
toggle* backed by token/CSS overrides — flip it and the whole document
re-renders in that direction. A static side-by-side comp is a fallback for
decisions CSS cannot encode (e.g. two illustration concepts), never the
default. The user chooses between things they can *use*, not just see.
Include invitation zones (`SITE.md`) in unclaimed space.

Before the reveal, run a **self-review**: hold every section against
`CRAFT.md` (the screenshot test), and — when a prior attempt exists in the
project's archive — against the best previous artifact. A one-shot built
without iteration starts below an iterated predecessor; the self-review is
where that gap closes. Two checks in the self-review are named and
non-negotiable:

- **The blank-page check.** Prove the document reads without JavaScript:
  the reveal machinery must be js-gated per `SITE.md` (`.js .rv`, never
  bare `.rv { opacity: 0 }`), and print must show content on every page. A
  20-minute build that reveals as blank pages costs the user more trust
  than it built.
- **The structural check.** HTML tag balance, script syntax, no hex outside
  `tokens.css` — run them, don't assume them.

The user's first visit lands on a complete draft of their brand — never an
empty shell, never a single take, never a blank page. (In Manual, the first
visit happened at the cover — this is the first visit to the *complete*
draft.)

Lead the reveal with the verbatim line:

> **Open this in your browser:** `/absolute/path/to/index.html`

This is often someone's first skill in Claude Code; the artifact path is
the onboarding. Repeat the path whenever the user seems to have lost it.

### 4. The back and forth

*(In Manual this phase interleaves with step 2 — a section can react and
lock as soon as it renders, or all of them at the end in one scroll-through;
follow the user's energy.)*

Feedback now drives, and this is where the recommending voice is welcome:
react, refine, converge, lock sections in `DESIGN.md` as they settle.
Section order is bookkeeping here, not conversation structure — follow the
user's attention. Rules for every refinement and lock:

1. **Ground the decision in research, not taste.** Color, typography,
   motion, and voice are studied fields: hue, darkness, and saturation have
   measured psychological effects; the type choice positions how the
   business is perceived; there are tried-and-true selection frameworks and
   current-practice baselines for each. Before proposing in these sections,
   research the fundamentals (web search — what the field knows, what
   category leaders do, what's current vs. timeless) and filter it through
   **who the user is** (section 01: audience, personality). The proposal
   then carries its rationale — *why this red, in one sentence of evidence*
   — and offers 1–2 genuinely different researched alternatives at the
   lock, so the user makes a choice, not a ratification. A confident pick
   with no stated basis steals the user's agency.
2. **Propose in the artifact, not in chat.** Draft a concrete starting point
   from what you already know (intake assets, earlier sections, research,
   sensible defaults), render it into the site marked `PROPOSED`, then ask
   for the lock. Never put a proposal in chat text between tool calls —
   that text is not reliably shown to the user, and an unseen proposal
   cannot be locked.
3. **Label provenance — decrease content stochasticity.** Every element of a
   proposal carries its source, in the render and in the lock ask:
   - `answered` — the user said it, this session. The gold standard.
   - `context` — extracted from the repo, CLAUDE.md, memory, or existing
     assets. Cheap to gather, but it must be *confirmed*, and the user must
     be able to see it was assumed, not asked.
   - `researched` — grounded in decision-science or category research (from
     point 1), with the basis stated in one line. Stronger than `invented`,
     still the user's call.
   - `invented` — the skill's own unresearched draft. Flagged loudest,
     scrutinized hardest, and a last resort: when a fact is askable in one
     short question, ask — never let taste fill a fact-shaped hole.
   `DESIGN.md` records each section's provenance at lock.
4. **Embed the ask.** Every lock request must be fully self-contained inside
   the question itself — question text, option labels, option descriptions.
   The user must be able to decide from the question alone. Keep any preview
   under ~15 lines: previews truncate, and a truncated proposal is an unseen
   proposal. For anything longer, the rendered site *is* the proposal and the
   question states only what changed and where to look.
5. **Lock it.** When the user confirms, record the decision immediately into
   the growing `DESIGN.md` draft and flip the section's `PROPOSED` marker.
   Locked sections are inputs to later ones (color feeds components;
   components feed motion).
6. **Move on.** Never stall a decision past two rounds — take the best
   answer, mark open items, continue. The goal of this phase is a fully
   locked spec, not a perfect first pass.

### 5. Write the contract

When all in-scope sections are locked, write the two contract files:

- **`DESIGN.md`** — the canonical spec, section-per-section, with every locked
  value, rule, and do/don't. This document outranks the website; the website
  renders it.
- **`tokens.css`** — every value from the spec as CSS custom properties, in
  the token namespaces defined in `SITE.md`. Components never hard-code what a
  token declares.
- **`tokens.json`** — the same values as one flat JSON map (name → value),
  for consumers that aren't CSS. Generated from the same spec as
  `tokens.css`; the two files never disagree.

### 6. Finish the site

Complete the artifact per `SITE.md`: every locked section rendered in
order, remaining alternatives and invitation zones resolved, sidebar nav
with scroll-synced highlighting, cover page with table of contents,
scroll-reveal animation, print stylesheet for PDF export. Wire every
rendered value to `tokens.css`.

### 7. The variant pass

After the last section locks, offer the style-variant dial (see `SITE.md` —
Style variants): patch / minor / major token-override deviations, each tuned
to one of the ideal customers from section 01, computed by a background
subagent so the offer costs the interview nothing. The user slides through,
names a winner and what they liked from the losers; synthesize, fold into
the contract, then promote or delete the variant layer. Skip gracefully if
the user just wants to ship.

### 8. Hand off

Open `index.html` in a browser (no server needed; `python3 -m http.server`
if one is wanted), verify: nav highlights track scrolling, every section
renders, print preview paginates cleanly. Then report: what's locked, what's
placeholder, and the single next decision that would most improve the system.

Close by naming the next move: the brand book says how the brand *looks*;
the [`customer-blueprint`](../business-os/customer-blueprint/SKILL.md) skill
says who it's *for*. Recommend running it next — the guidelines' audience
and personality sections become its inputs, and its personas sharpen every
future revision of this document. One sentence, a real pointer, no hard sell.

## Rails & side quests

The interview is the spine, and the skill's first job is getting the user
through **all of it** — a brand book that stalls at section 04 is not a
brand book. At every moment, know the current section and the next unlocked
one; every exchange ends back on the spine.

Mid-interview, users will ask for things that aren't the current section:
integrate decals, restyle a component, generate imagery, fix a nav quirk,
try an experiment. These are **side quests**. Handle them without derailing:

- **Delegate what's delegable.** Fire a subagent for self-contained work
  (art generation, a research pass, a bulk restyle) and continue the
  interview while it runs. The main context stays on the spine.
- **Do small ones inline, fast** — then immediately return to the section in
  play, restating where the interview stands.
- **Record, don't re-litigate.** If a side quest produces a spec-level fact,
  write it into the relevant `DESIGN.md` section (or mark it as an open item
  for the section that owns it). Locked sections are never reopened silently
  by a side quest.
- **Never lose the thread.** After any detour, the next lock ask names the
  section it belongs to. If several side quests stack up, say what's queued
  and where the interview resumes.

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

- **Every section, every time.** All sections 00–15 are present in every
  output — no tiers, no cuts, no "cut with reason." A brand that lacks the
  material still gets the section, holding placeholders or its explicit
  stance. 09 and 10 follow 08; 12 follows 11. Omission is a bug, full stop.
- **Show, don't declare.** A brand book must render *how to do good*, not
  announce "do good" (Brett, 2026-08-03). Every claimed quality — alive,
  bouncy, chunky, exact — must be observable in the artifact itself: live
  demos, working motion, real components. Adjective cards over a motionless
  page are the failure mode. Sections must not all present identically; a
  brand with motion gets a book that moves, and every section carries at
  least one demonstrative element. Truisms ("we don't ship broken games")
  don't make the principles list — principles earn their slot by being
  demonstrable and non-obvious.
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
