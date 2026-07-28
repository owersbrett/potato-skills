# CRAFT.md — the taste contract

The process contract (`SECTIONS.md`, `SITE.md`) guarantees the document is
*complete*. This file guarantees it is *good*. Read it before writing any
HTML or CSS, and hold every rendered section against it. A section that
passes the process but reads as generic AI design is a failed section.

## The core principle

**Top-tier design is the disciplined removal of competing emphasis.** One
dominant focal point per view. Clear primary vs. secondary. Deliberate
whitespace. A restrained type scale. Limited accent color. If every card,
title, border, and animation is equally prominent, nothing is.

## Leverage, don't reinvent

Before styling anything:

1. **Use installed craft skills.** Check the available-skills list for
   design-quality skills (e.g. `frontend-design`, `impeccable`,
   `high-end-visual-design`, `redesign-existing-projects`, or similar) and
   invoke the best fit for the build/polish passes. These are leverage, not
   dependencies — when none are installed, this file alone is the bar.
2. **Research the brand's actual aesthetic.** The brand has a cultural
   world (a region, an era, a craft tradition, a genre). Search the web for
   how that world *actually* looks — its typography, ornament, color use,
   editorial traditions — and pattern-match the *feel*. Never substitute a
   generic component library shape for a researched cultural reference.
3. **Research the decision, not just the look.** Color, typography, and
   motion are studied fields — color psychology (hue, darkness,
   saturation), typographic perception, category conventions, what's
   current vs. tried-and-true. Ground each major visual decision in that
   evidence, filtered through who the user and their audience are, and
   carry the rationale into the proposal (see `SKILL.md` — Ground the
   decision).

## Banned patterns — the generic-AI tells

These are the defaults that leak in when nobody is watching. Do not ship:

- **Accent-border cards** — the colored top/left border strip on a white
  card (the "green border + red heading" card). If a card needs
  differentiation, use type hierarchy, spacing, or surface — not a racing
  stripe.
- **Orphan grid rows** — `auto-fit` grids that strand one item on the last
  row. The item count is known at design time; the layout must resolve it:
  5 items → 5-across, 3+2, an editorial list, or a vertical ladder. Never
  let the grid decide.
- **Badge/pill soup** — uppercase mono pills as decoration on everything.
  One status marker per view, maximum, and only when it carries information.
- **Equal-emphasis grids** — six identical cards with identical weight.
  Vary scale, or use a list; repetition without hierarchy is filler.
- **Gradient dividers and glows** used as decoration rather than meaning.
- **Icon + title + text card grids** as the answer to every content block.
  Prose, definition lists, tables, and plain numbered rows are usually
  stronger for documentary content — and this is a document.

## HTML — semantic or nothing

- Elements by meaning: `<header>` `<nav>` `<main>` `<section>` `<article>`
  `<footer>`; `<button>` for actions, `<a>` for navigation; `<dl>` for
  term/definition content (adjectives, vocab); `<ol>` for ordered principles;
  logical heading order; real `<label>`s; native `<details>` before custom
  disclosure JS. No clickable `<div>`s, no wrapper stacks.
- Every page has a skip link and `aria-label`s on nav landmarks.

## CSS — systematic, low-specificity, fluid

- **Tokens are the only source of values** — colors, spacing steps, radii,
  type scale, motion. An arbitrary `17px` in a component is a bug.
- **Fluid type and space:** `clamp()` for display sizes and section padding;
  `text-wrap: balance` on headings; body text ≤ `65ch`; line-height ≥ 1.5
  for prose.
- **Mobile-first**, breakpoints where the design breaks, not at devices.
  Naturally responsive grids use
  `repeat(auto-fit, minmax(min(100%, <basis>), 1fr))` — but only where the
  item count genuinely varies (see banned patterns).
- **Grid for 2-D, flex for 1-D**; `minmax(0, 1fr)` / `min-width: 0` against
  overflow blowouts.
- **Low-specificity class selectors** (`.card`, `.card__title`,
  `.card--featured`); never ID or descendant-chain selectors.
- Reset carefully; keep `:focus-visible` outlines (accent color, offset);
  `font: inherit` on form controls.

## Accessibility is design

- Contrast passes WCAG AA — check it, record pass/fail honestly.
- Visible keyboard focus everywhere; touch targets ~44px; error states are
  textual, not color-only.
- `prefers-reduced-motion: reduce` collapses animation/transition durations
  and stops autonomous motion — part of the contract, not a nice-to-have.

## JS — behavioral, modular, minimal

- HTML is content, CSS is presentation, JS is *interaction only*. The
  document must read fully with JS disabled (nav links are real anchors;
  content is in the HTML, not injected).
- `data-*` attributes as JS hooks, never presentation classes.
- ES modules, small functions, event delegation for repeated elements.
- Animate only `transform` and `opacity`; animation communicates state and
  causality, never mere movement.

## Content-robust, always

Test every component against: a long title, a missing image, empty data,
200% zoom, keyboard-only navigation, and print. A layout that only works
with ideal content is not done. Images ship with `width`/`height`,
`loading="lazy"`, `srcset` where sizes vary. Fonts: WOFF2, few weights,
sensible fallback stacks, preload only the truly critical.

## The screenshot test

Before presenting any section for a lock: imagine the user screenshots it
cold. Would a designer identify the framework-default patterns in it? If
the honest answer is yes, restyle before asking. The interview must never
spend a user's round-trip on tackiness this file already names.
