# SITE.md — the generated site's architecture contract

How the brand-guidelines website is built. Extracted from a production brand
document; the shape is proven — a **single-page scroll document** reads like a
book, prints like a PDF, and needs no router. The default stack is **raw
HTML + CSS + a small vanilla JS file** — no build step, no install, nothing
to run: `index.html` opens straight from disk and the folder ports anywhere.
The site is also the interview's proposal surface (see `SKILL.md`), so it
must be viewable from the very first section. Only reach for a framework if
the user asks for one — and then keep the *contract* (sections, nav model,
tokens, print) and translate the implementation. `CRAFT.md` governs the
quality of everything this contract structures — architecture without craft
is how a brand book ends up looking like a component-library demo.

## Shape

One page. Every brand-system section is a full-width `<section>` stacked
vertically, in `SECTIONS.md` order:

```
<main>
  <section class="sec" id="section-00" data-section>…Cover…</section>
  <div class="gdiv" />                       <!-- gradient divider -->
  <section class="sec" id="section-01" data-section>…</section>
  …
</main>
```

- A single **sections array** (id, number, title, component) drives both the
  render order and the nav — one place to add or reorder a section. During a
  Manual interview the array grows section by section: the nav lists only
  what exists, and an un-interviewed section is absent, never stubbed.
- No client-side router. Navigation is `scrollIntoView({ behavior: 'smooth' })`.
- Section backgrounds alternate to pace the read: default surface, a warm
  tinted variant (`.sec--warm`), and a dark variant (`.sec--dark`) for
  showcase moments (logo on dark, motion). Use dark sparingly — 2–3 sections.

## Canvas

The guidelines site is a working document for business professionals at a
desk. Design for the desktop canvas first (~1280–1680px): use the full
width, pair related blocks side by side (a `.duo` two-column pattern for
sibling lists), and treat any large empty region as either deliberate
breathing room or an invitation zone — never leftover. A functional mobile
fallback (stacked columns, hamburger nav) is required, but it is a
fallback, not a design target: `CRAFT.md`'s mobile-first default yields to
this contract for this artifact.

## Navigation

- **Sidebar nav** (fixed left, ~220px): the section list as `number · title`
  rows. On mobile it collapses behind a hamburger into an overlay.
- **Scroll-synced highlighting:** an `IntersectionObserver` watches every
  `[data-section]` and marks the nav row of the section nearest the viewport
  center as active. No scroll-event listeners.
- **Cover TOC:** the cover page ends in a clickable table of contents built
  from the same sections array.
- **PDF button** in the sidebar triggers `window.print()`.

## Tokens — the rendering contract

All brand values live in `tokens.css` as CSS custom properties on `:root`,
written from the locked spec. The namespaces (values are the brand's own):

```css
:root {
  /* Palette */        --brand-*, --dark, --surface, --surface-warm, --muted, --subtle
  /* Gradients */      --gradient-*            /* only if the brand uses them */
  /* Typography */     --font-display, --font-body, --font-mono,
                       --text-hero, --text-h1..h4, --text-body-lg, --text-body,
                       --text-body-sm, --text-caption, --text-label
  /* Spacing */        --sp-1..--sp-8, --section-pad
  /* Radii */          --r-sm, --r-md, --r-lg, --r-xl, --r-pill
  /* Borders */        --border, --border-w
  /* Shadows */        --sh-*                  /* named scale from section 09 */
  /* Motion */         --dur-fast/normal/slow, --ease-*
  /* Layout */         --max-w, --max-w-narrow, --max-w-wide, --nav-w, --nav-h
}
```

Type sizes use fluid `clamp()` for the display levels. A sibling
`tokens.json` mirrors the same values as one flat name → value map for
non-CSS consumers — generated together with `tokens.css`, never edited
apart. **Components read tokens; nothing re-declares a brand value.** This is what makes the document
self-verifying: a swatch page rendered from `--brand-start` cannot disagree
with the spec.

## Shared components

In the raw-HTML default these are shared CSS classes + repeated markup
patterns (optionally stamped out by small JS render helpers), not framework
components — but the inventory is the same. Build these once; every section
composes them:

| Component | Job |
|---|---|
| `SectionHeader` | Section number + statement (H2) + subtitle, optional feature image. Opens every section identically. |
| `DosDonts` | Two-column ✓/✕ card grid; takes `dos`/`donts` string arrays. Used by logo, type, icons, motion, voice… |
| `TokenTable` | Generic spec table (rows of name/value/usage) for hierarchies, durations, shadow scales. |
| `Swatch` | Color block rendered from a token, labeled with name + hex (+ CMYK when print matters). |
| `Nav` / `PageNav` | Sidebar list + optional compact floating pager, both fed by the sections array. |
| `DeviceFrame` | CSS-only phone frame composing existing components into a small product screen — section 08's closing composite. No images, no new component rules. |

Section-specific styles live in per-section CSS modules; global concerns
(reset, reveal, section primitives, print) in one `globals.css`.

## Scroll reveal — MUST FAIL VISIBLE

The single most dangerous pattern in this contract. Done naively (`.rv {
opacity: 0 }` waiting for JS), any JS stumble — or print, where observers
never fire — renders the entire document as blank pages. This shipped once;
never again. The reveal machinery **opts in via JS**, it never opts out:

```js
document.documentElement.classList.add('js');   // first line of the script
```
```css
.rv { /* nothing — visible by default */ }
.js .rv { opacity: 0; transform: translateY(16px); transition: …; }
.js .rv.vis { opacity: 1; transform: none; }
```

With JS absent, broken, or blocked, the document is complete and readable —
the animation is the enhancement, never the gate. Content blocks carry
`.rv`; an `IntersectionObserver` (threshold ~0.15) adds `.vis` once,
triggering a fade-up using the brand's own duration/easing tokens; siblings
stagger via `.rv-d1`–`.rv-d6`. Under `prefers-reduced-motion: reduce`,
reveals render visible immediately and looping animations stop. In
`@media print`, everything is visible unconditionally — belt and suspenders
on top of the js-gate. All of this is contract, not nice-to-have.

## Print / PDF

The document must export cleanly: `@media print` hides the nav and reveal
machinery (everything `.vis` by default), forces printable backgrounds where
needed, and inserts `break-before: page` per section. Target A4 portrait.
Verify the print preview before handoff — a brand book that can't become a
PDF will be asked to become one within a week.

## Placeholders

Any value or asset still unknown renders as a loud, styled `PLACEHOLDER`
block naming what's missing ("PLACEHOLDER — secondary logo, awaiting file"),
in both the site and `DESIGN.md`. Placeholders are inventory, not shame; a
fabricated value is the only real failure.

## Invitation zones

Placeholders mark missing *facts*; invitation zones mark unclaimed *space*.
During the interview, a large empty region inside a section — the column of
white space beside the content on wide screens is the classic case — gets a
quiet wireframe zone that addresses the user directly and offers both paths.

Zones live **inside the section they annotate** (an aside column in the
section's own grid, or a block in its empty region) — never fixed to the
viewport, never overlaying other sections. Their copy is
**section-specific**: name what would plausibly fill this space *for this
section*, so the invitation doubles as a recommendation, e.g.:

> "This overview could carry brand imagery down this side — flags, vines,
> tomatoes. Describe some decals in the session and they'll be integrated
> here."

> "Annoyed by these panels? Tell the session to remove them — we'll use
> this white space better."

Rules: dashed hairline outline, caption-size mono type, muted color — a
wireframe, never a competing element; **fade in after a ~2s delay** so the
content gets first read (visible immediately under reduced motion); hidden
in print; decorative to assistive tech (`aria-hidden`). An invitation zone
is interview scaffolding — every one must be resolved (filled with real art
or removed) before handoff; one surviving in the final document is a bug.

## Style variants (the dial)

An optional exploration layer, earned by token discipline: because every
brand value is a custom property, an alternate style is nothing but a token
override file — zero component changes.

- **The dial** sits in the sidebar by the PDF button: a 4-stop slider —
  **locked spec** (default), then **patch / minor / major** deviations,
  ordered by distance from the baseline. Each deviation is tuned to one of
  the ideal customers named in section 01: the patch asks "what would make
  the closest audience even more at home?", the major asks "what if the
  furthest audience were primary?".
- **Implementation:** `variants.css` with `:root[data-theme="<key>"] { … }`
  blocks overriding tokens only; the slider sets `data-theme` on the root
  element. No variant touches a component rule.
- **Compute off the spine.** Variant design is the canonical background
  side quest (see `SKILL.md` — Rails): delegate it to a subagent while the
  interview continues; wire the results in when they land.
- **The endgame ask.** After the last section locks, offer it: "Want to see
  a couple of versions? Slide through, tell me which you like best and what
  you like most from the others — then we lock you into one." Synthesize
  the winner (grafting the named likes), fold it into `DESIGN.md` +
  `tokens.css`, and then either promote the variant layer to real themes or
  delete it.
- The locked spec is **always** canonical: the dial is labeled as
  exploration, the default stop is the locked baseline, and spec pages
  (swatch hex labels, measured ratios) describe the baseline even when a
  variant is previewing.

## Encoded alternates

Every A/B the one shot ships must be **encoded, not illustrated**: a
control in the artifact (a toggle beside the section, or a dial stop for
whole-system directions) that sets a `data-alt-<decision>` attribute on
the root element, with the alternative's values expressed as token/CSS
overrides in `alternates.css`:

```css
:root[data-alt-type="b"] { --font-display: var(--font-display-b); }
```

Flip the toggle and the entire document re-renders down that path — the
user evaluates the alternative *in use*, across every section at once.
Rules: overrides live in `alternates.css` (never component rules); the
default state is always the proposal's primary; the chosen state persists
while scrolling; a static comp is permitted only when the decision cannot
be expressed in CSS (two illustration concepts, two photo directions) and
then carries a note saying so. At lock, the winner folds into
`tokens.css`/spec and the alternate's overrides are deleted.

## Bootstrap package

Beside the PDF button: **Download bootstrap kit** — a zip that carries the
brand into any development directory. The skill generates a `bootstrap/`
folder and zips it at build time (`zip` CLI; the site just links the file
with `<a download>`):

- `CLAUDE.md` — the brand as agent instructions: principles, palette,
  type, voice rules, banned patterns — written so a coding agent in a new
  repo builds on-brand from message one.
- `AGENTS.md` — the same contract in the agents.md convention.
- `tokens.css` — copied verbatim; the machine contract travels with it.
- `tokens.json` — the same values for non-CSS consumers.
- `DESIGN.md` — the fundamentals (the spec, or its locked subset).
- `README.md` — how to use the kit: where to put the files, the SSOT rule,
  how changes propagate back.

Regenerate the zip whenever the spec changes; a stale kit is a fork. This
is the product's handshake — the brand book that bootstraps the next repo.

## Definition of done

1. Every in-scope section renders, in order, populated from the locked spec.
2. **Fail-visible verified:** with JavaScript disabled (or the script tag
   temporarily removed), the full document reads top to bottom; print
   preview shows content on every page, never a blank one.
3. Sidebar highlighting tracks a full manual scroll correctly.
4. Every TOC and nav link lands on its section.
5. `tokens.css` values match `DESIGN.md` exactly; no hard-coded brand values
   in components (grep for hex codes outside `tokens.css`).
6. Print preview paginates section-per-page with nav hidden.
7. Reduced-motion mode verified.
8. Remaining placeholders listed in the handoff summary.
