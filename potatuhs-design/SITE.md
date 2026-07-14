# SITE.md — the generated site's architecture contract

How the brand-guidelines website is built. Extracted from a production brand
document; the shape is proven — a **single-page scroll document** reads like a
book, prints like a PDF, and needs no router. Honor this contract regardless
of stack; the default stack is Vite + React, but if the user's team lives in
another framework, keep the *contract* (sections, nav model, tokens, print)
and translate the implementation.

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
  render order and the nav — one place to add or reorder a section.
- No client-side router. Navigation is `scrollIntoView({ behavior: 'smooth' })`.
- Section backgrounds alternate to pace the read: default surface, a warm
  tinted variant (`.sec--warm`), and a dark variant (`.sec--dark`) for
  showcase moments (logo on dark, motion). Use dark sparingly — 2–3 sections.

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

Type sizes use fluid `clamp()` for the display levels. **Components read
tokens; nothing re-declares a brand value.** This is what makes the document
self-verifying: a swatch page rendered from `--brand-start` cannot disagree
with the spec.

## Shared components

Build these once; every section composes them:

| Component | Job |
|---|---|
| `SectionHeader` | Section number + statement (H2) + subtitle, optional feature image. Opens every section identically. |
| `DosDonts` | Two-column ✓/✕ card grid; takes `dos`/`donts` string arrays. Used by logo, type, icons, motion, voice… |
| `TokenTable` | Generic spec table (rows of name/value/usage) for hierarchies, durations, shadow scales. |
| `Swatch` | Color block rendered from a token, labeled with name + hex (+ CMYK when print matters). |
| `Nav` / `PageNav` | Sidebar list + optional compact floating pager, both fed by the sections array. |

Section-specific styles live in per-section CSS modules; global concerns
(reset, reveal, section primitives, print) in one `globals.css`.

## Scroll reveal

Content blocks carry `.rv`; an `IntersectionObserver` (threshold ~0.15) adds
`.vis` once, triggering a fade-up (`opacity` + small `translateY`, using the
brand's own `--dur-slow`/`--ease-out`). Siblings stagger via `.rv-d1`–`.rv-d6`
delay classes. Under `prefers-reduced-motion: reduce`, reveals render visible
immediately and marquee/float-style animations stop — this is part of the
contract, not a nice-to-have.

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

## Definition of done

1. Every in-scope section renders, in order, populated from the locked spec.
2. Sidebar highlighting tracks a full manual scroll correctly.
3. Every TOC and nav link lands on its section.
4. `tokens.css` values match `DESIGN.md` exactly; no hard-coded brand values
   in components (grep for hex codes outside `tokens.css`).
5. Print preview paginates section-per-page with nav hidden.
6. Reduced-motion mode verified.
7. Remaining placeholders listed in the handoff summary.
