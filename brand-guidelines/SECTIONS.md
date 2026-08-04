# SECTIONS.md — the brand-system rubric

The exhaustive section list for a brand-guidelines document, in presentation
order. Each entry declares: what the section **covers**, what to **ask** (or
propose) during the interview, and what its **page renders** in the generated
site.

**Every section is mandatory, every run — 00 through 15, no tiers, no cuts**
(Brett, 2026-08-03; the old Essentials/Complete tier system consistently
dropped 09, 10, 12, 14, and 15, and is retired). The numbering is canonical
and complete: 09 and 10 come after 08; 12 comes after 11. A brand that lacks
the material for a section still gets the section — scaffolded rules, loud
`PLACEHOLDER` blocks, or the brand's explicit "none" stance rendered as the
content — but the section EXISTS in the nav, the site, and the spec.
Omission, silent or reasoned, is a bug.

The order is deliberate — early sections feed later ones. Color must lock
before components; typography before layout; everything before motion.

---

## 00 · Cover & Table of Contents

**Covers:** The document's own identity — brand name, document title
("Brand Guidelines"), version, date, and a clickable table of contents.

**Ask:** Version label, the tagline if one exists, and any cover imagery.
Nothing else. In Manual this page is the intake's first render; its table
of contents grows with the sections array and is final when the section
list is.

**Renders:** Full-viewport cover — brand wordmark or hero image, title,
version tag, TOC linking to every section via smooth scroll.

---

## 01 · Brand Overview

**Covers:** The brand's story in one page: what it is, who it's for, the
personality, and the principles everything downstream must obey.

**Ask:**
- One-paragraph brand story / positioning statement.
- Mission and vision — one sentence each: what the brand does every day, and
  the world it's working toward.
- 3–6 personality adjectives — each with one sentence of meaning (an adjective
  without a definition is decoration).
- The audience(s), named concretely.
- 3–6 construction principles — the rules of the visual world (e.g. "always in
  motion", "never more than two colors per surface").

**Renders:** Statement header, adjective cards (word + meaning), audience
list — and the construction principles as **live demonstrations**: each
principle is paired with a small working demo of itself (a custom
implementation if that's what it takes), never a bare claim in a card. A
principle the page cannot show is a principle the book hasn't earned (Brett,
2026-08-03). Voice belongs to section 12 — keep only a teaser here.

---

## 02 · Logo System

**Covers:** Every approved form of the mark and the rules protecting it:
primary logo/wordmark, color variants (full-color, one-color, reversed),
secondary marks, partner/co-brand lockups, avatar (social crop), monogram,
clear space, minimum sizes, backgrounds, and misuse.

**Ask:**
- Which marks exist? (primary, secondary, monogram, avatar…) Collect the
  actual files; never redraw a logo from description.
- **No logo yet?** A real answer. Scaffold what the future mark must satisfy
  — the variants needed, the clear-space rule, minimum sizes, the backgrounds
  it must survive — as loud `PLACEHOLDER` entries, so nothing downstream
  waits on artwork. Never invent one from description.
- On which backgrounds may each variant sit? What's the clear-space unit
  (usually derived from the mark itself, e.g. the height of one letter)?
- Minimum sizes for print and screen.
- Lockup rules with partner logos (divider, spacing, order).
- 4–8 misuse cases: stretching, recoloring, effects, busy backgrounds…
- **(optional)** Animated logo: if the brand has a motion identity for the
  mark, spec it (phases, durations, audio) — otherwise skip without ceremony.

**Renders:** Mark showcase on its approved backgrounds, clear-space diagram,
min-size row, lockup examples, avatar/monogram tiles, do/don't grid. This is
usually the longest page; it earns it.

---

## 03 · Color

**Covers:** The complete palette and the rules for using it: primary brand
colors, structural colors (text ink, surfaces, muted/subtle grays), secondary
/ extended palette, gradients (if the brand uses them), pairing rules, and
contrast/accessibility requirements.

**Ask:**
- Primary colors: hex, name each one (named colors get used; #E16416 doesn't).
- Tint ramps: a step scale for each primary (e.g. light / base / dark, or
  100–900), derived from the base value and named as tokens — hover states
  and backgrounds get picked from the ramp, never eyeballed.
- Structural set: the near-black for text, the surface white(s), muted tones.
- Secondary palette, if any — and what it's *for* (illustration, data viz,
  sub-brands?). A palette without a purpose is clutter.
- Gradients: stops, angle, and which surfaces they're allowed on.
- Pairing rules: which text colors on which backgrounds. Check the real
  contrast ratios (WCAG AA at minimum) and record pass/fail honestly.
- Print values (CMYK/Pantone) if the brand prints.
- **(optional)** Seasonal or thematic palette variants.

**Renders:** Large swatch blocks (name, hex, RGB, CMYK if applicable), a
tint-ramp row per primary, a pairing/contrast table, gradient strips, rule
callouts. Every swatch is
rendered *from the token*, so the page can't drift from the spec.

---

## 04 · Typography

**Covers:** The font pairing, full hierarchy, and typesetting rules.

**Ask:**
- Display font and body font (and mono, if the brand touches code). Confirm
  licenses and web availability — a brand book that specs an unlicensed font
  is a liability.
- Hierarchy: hero, H1–H4, body (large/regular/small), caption, label — sizes
  (fluid `clamp()` where sensible), weights, line heights, letter-spacing.
- Casing rules (when all-caps, with how much tracking), fallback stacks.
- Misuse list: stretching, outlined text, faux bold, too many weights per
  surface…

**Renders:** Live hierarchy table — each level set in its actual style with
size/weight/usage columns — pairing specimen, misuse do/don't grid.

---

## 05 · Iconography

**Covers:** The icon style contract: geometry (stroke weight, corner radius,
grid size), source (custom set vs. an open library and which one), sizing,
color rules, and the brand's icon categories if it organizes them.

**Ask:**
- Custom icons or a library (Lucide, Phosphor, Material…)? If a library:
  which config (stroke width, size) makes it *theirs*?
- Where icons appear (nav, cards, marketing) and at what sizes.
- Color rules: inherit text color? Accent-only? Ever on gradients?
- **(optional)** Category system — only if the brand genuinely organizes icons
  into named sets; don't impose a taxonomy.

**Renders:** Icon grid in the brand's configuration, geometry spec row
(stroke/grid/radius), sizing table, do/don't.

---

## 06 · Photography & Illustration

**Covers:** Art direction for imagery: the qualities every image must have,
the format types the brand uses, and shooting/selection guidelines (lighting,
styling, angles, set design). Applies equally to an illustration style if the
brand illustrates instead of shoots.

**Ask:**
- 3–5 art-direction qualities (e.g. candid, warm, high-contrast) — each with a
  sentence of meaning.
- Format types (lifestyle, product, portrait…) and where each is used.
- Concrete guidance a photographer/illustrator could act on: lens/angle
  preferences, lighting, color treatment, what's always/never in frame.

**Renders:** Quality cards, format examples (real images if provided,
labeled placeholders if not), guideline cards.

---

## 07 · Mascots & Characters

**Covers:** If the brand has characters: the roster, the art direction that
keeps them consistent across artists, and usage rules (where characters may
appear, how they interact with the logo and product UI).

**Ask:**
- The roster and each character's one-line role.
- Art-direction principles (consistent proportions? energetic poses? line
  style?).
- Usage boundaries: marketing yes / legal pages no, etc.

**Renders:** Character grid (art + name + role), art-direction principles,
do/don't. A brand without characters still renders the section: state the
no-characters position and the rule for if one ever appears. Never skip.

---

## 08 · UI Components

**Covers:** The core interface patterns rendered in the brand: buttons
(variants + states), cards, badges/chips, form inputs, and any pattern the
brand's products lean on. This is the bridge from brand book to product.

**Ask:**
- Which components matter (a merch brand needs fewer than a SaaS).
- Button variants (primary/secondary/dark…), shape (pill? radius token?),
  and states (hover, active, disabled, focus).
- Card anatomy: border, shadow, hover behavior.
- Input styling and focus treatment (focus must be visible — accessibility is
  a rule here, not a suggestion).

**Renders:** Live components built from the tokens — real hover states, not
screenshots — with anatomy callouts and a state table. Closes with one
in-situ composite: a CSS-only device frame (phone-sized) composing the
section's own components into a small product screen — the brand as product,
from the same tokens, no images.

---

## 09 · Shadows & Borders

**Covers:** The elevation language: shadow scale (and its *style* — soft
ambient vs. hard offset are different brands), border weights, and the
border-radius scale.

**Ask:**
- Shadow style and scale (name each level, define exact values).
- Border rule: weight, color, which elements always get one.
- Radius scale (sm → pill) and what each level is for.

**Renders:** Shadow scale table with live demos, radius grid with live
corners, border spec.

---

## 10 · Motion

**Covers:** How the brand moves: easing curves, duration tokens, named
animation patterns (fade-up, scale-in, marquee…), stagger rules, and the
reduced-motion accessibility stance.

**Ask:**
- Personality of motion (snappy? bouncy? calm?) → 2–3 named easing curves
  with cubic-bezier values.
- Duration scale (fast/normal/slow).
- The named patterns the brand actually uses, each with property + duration +
  easing.
- Stagger increment for list reveals.
- `prefers-reduced-motion` behavior — the answer is "respected", the question
  is how (disable transforms, keep opacity?).

**Renders:** Easing curves with live preview animations, duration table,
pattern table, stagger demo. Motion pages must *move*.

---

## 11 · Layout

**Covers:** Spatial system: container widths, the grid, the spacing scale,
section rhythm (vertical padding), and any framing devices (dividers, ribbons,
frames) the brand uses to structure a page.

**Ask:**
- Container widths (narrow / default / wide).
- Grid: columns, gutter, whether asymmetry is a feature.
- Spacing scale base (4px? 8px?) and steps.
- Section rhythm and divider treatment between document sections.

**Renders:** Container diagram, grid overlay demo, spacing scale ruler,
divider/frame examples.

---

## 12 · Voice & Tone

**Covers:** How the brand writes and speaks: the external voice, tone
principles, vocabulary (words we use / words we never use), and sample copy
in the voice.

**Ask:**
- The external voice in 2–3 sentences — as a *character* if that helps
  ("smooth, earnest, never winks").
- Tone shifts by context (marketing vs. error message vs. legal).
- Words/phrases that are always in, always out.
- 2–3 sample copy blocks (a headline, a product blurb, an error message)
  written live in the voice and approved by the user.

**Renders:** Voice statement, tone-by-context table, vocabulary lists,
approved sample copy, do/don't.

---

## 13 · AI Policy

**Covers:** The brand's declared stance on artificial intelligence — in its
products, its content, and its production chain. Brands are increasingly
AI-first, AI-native, AI-assisted, or deliberately AI-free; audiences read the
absence of a stance as evasion. This section makes the position explicit so
the brand is perceived as transparent, whichever position it takes.

**Ask:**
- The stance, in one named term the brand will stand behind (AI-first /
  AI-native / AI-assisted / AI-free — or the brand's own word for it), plus
  one sentence of why.
- Disclosure rule: when AI contributes to published content (copy, imagery,
  code, support responses), is that labeled? How?
- Production boundaries: where AI is welcome, where it is forbidden, and
  where a human must review before anything ships. Name the surfaces
  (e.g. "generated imagery never in photography-section contexts",
  "support drafts always human-approved").
- Contractor & vendor rule: may contractors and agencies use AI on brand
  work? Under what disclosure and quality obligations?
- Data stance: what brand or customer material may be put into third-party
  AI tools, and what never leaves the building.

**Renders:** Stance statement (large, unambiguous), a permitted/forbidden
surface table, the disclosure rule as a callout, contractor obligations,
data-boundary list. No hedging language — this page is the one readers
screenshot.

---

## 14 · Sub-brands & Ecosystem

**Covers:** For multi-brand or multi-division organizations: the brand
architecture (hub-and-spoke? endorsed brands?), how sub-brands are visually
coded (color, mark, naming), what's shared vs. what may deviate, and per-sub-
brand deviation notes.

**Ask:**
- The architecture and each sub-brand's relationship to the parent.
- The coding system (a color per division? a mark variant?).
- The hard shared core (tokens? logo rules?) vs. the allowed deviations —
  each deviation recorded explicitly.

**Renders:** Architecture diagram (parent + nodes), assignment table
(sub-brand · domain · color · mark), per-sub-brand deviation cards.

---

## 15 · Asset Naming & Governance

**Covers:** The operational tail that keeps the system alive: asset file
naming convention, delivered formats, where the tokens live in code, and how
a change to the spec propagates to consuming projects.

**Ask:**
- Naming pattern (e.g. `{brand}-{category}-{label}-{variant}.{ext}`).
- Export formats per asset type (SVG for marks, PNG sizes, print PDFs).
- Which repos/projects consume the tokens, and the update rule ("edit
  DESIGN.md + tokens.css here, then propagate" — name the direction).

**Renders:** Naming spec with worked examples, format table, governance
statement naming the SSOT.
