# Video-Series Conformance Spec — inject this into any session working on this repo

You are working in `~/Potatuhs/potato-skills`. This repo is being reshaped to back an
8-video series in which Brett demonstrates six Claude Code skills, on camera, one worked
example per skill. Right now only two things matter: the series-level requirements, and
the `brand-guidelines` skill. Do not build or restructure the other five skills yet.

The living spec for the series is the workspace docs in
`~/Potatuhs/potatuhs-dashboard/src/content/workspace/potatocore/2026/` —
`introduction.md` and `brand-guidelines.md` govern; if this file and those disagree,
those win.

## Series-level requirements (from the Introduction)

- Six skills, shipped together as ONE plugin. The plugin name carries the brand
  (invocations like `potatuhs:brand-guidelines`); the individual skill names stay plain:
  `brand-guidelines`, `ideal-customer-profile`, `go-to-market`, `business-os`, `oh`,
  `blog`. Never prefix a skill name with `potatuhs-`.
- Posture: "I made and QA'd these skills so that they are useful for anyone." Each skill
  must be genuinely useful to a stranger with no Potatuhs context — no insider setup, no
  references to Brett's projects in prompts or output.
- Every skill must be FILMABLE in this demonstration format: (1) the questions it asks
  are visible and comprehensible on screen, (2) it produces an artifact the user reviews,
  (3) the user can prompt it forward in plain words and watch the artifact regenerate.
  If any of the three is awkward on camera, the skill isn't done.
- The stones in `business-os/` (customer-blueprint, go-to-market, messaging, operations,
  vision, business-model, technology, intranet) are QUARRY, not canon — mine their
  interview patterns and PROTOCOL.md machinery freely, but the six skills conform to the
  series spec, not to the stones' existing shapes.

## The `brand-guidelines` skill — full requirements

**The skill exists and is proven: `brand-guidelines/`** (SKILL.md + SECTIONS.md + SITE.md
+ CRAFT.md) — the guided interview that generates a token-first, print-ready
brand-guidelines site backed by DESIGN.md and tokens.css. It has been run many times;
treat it as the working base. The job is CONFORMANCE, not creation:

- **Rename** it `brand-guidelines` for the plugin (the potatuhs-design name retires;
  provenance can stay as a note inside the skill).
- **Keep** what makes it work: the one-decision-at-a-time interview and section locks,
  the SECTIONS.md rubric depth, the SITE.md single-page-scroll architecture, the
  CRAFT.md taste contract, and its extract-from-existing-assets behavior.
- **Close the gaps** against the spec below: the exact runbook opener (its current
  freeform intake becomes the Auto/Manual fork — "new or existing?" asset extraction IS
  the Auto path), all-sections-by-default (drop the scope negotiation for now), the 0–8
  section numbering, platform token exports beyond tokens.css, the style slider, the
  light/dark modes, and a real Download PDF button.

It stays fully standalone — no other skill or artifact required to run it.

### Runbook

- Deliberately simple: NO choices about which sections to include — every run generates
  all sections by default.
- It opens with exactly one question: **"Should I scan the current directory and provide
  for you a brand guidelines document site?"** with two options:
  - **Auto** — yes, build it and infer answers from whatever the directory contains.
  - **Manual** — fill out the questionnaire.
- Manual questionnaire, in order: the opening block — what the business is, what problem
  it is solving, who the problem affects, the mission, the vision, how work gets done,
  the brand's personality, what the voice of the company sounds like, its themes, etc.
  (this populates the cover and brand overview). Then the logo block — do you have a
  logo yet; wordmark; trademark; badge; animations with the logo; dos and don'ts; exact
  implementation details for specific animations the company requires. Then color
  (primary colors, secondary colors, the tints of the brand's used colors), then
  typography, iconography, photography, layout & arrangement.

### Outputs (all three, every run)

1. **A brand-guidelines website** with this exact section order and numbering:
   - 0 — The Cover (name, logo lockup, tagline, version + date)
   - 1 — Brand Overview (the opening-block answers written back as prose — the "why"
     behind every rule that follows)
   - 2 — Logo & Variants (wordmark/trademark/badge, dos and don'ts, animation
     implementation details precise enough for a developer who has never met the user)
   - 3 — Color (primary, secondary, tint ramps — defined once, named)
   - 4 — Typography (typefaces, scale, weights, line heights, usage)
   - 5 — Iconography (stroke, grid, corner language, sizing, generated examples)
   - 6 — Photography (subject, tone, treatment, dos and don'ts)
   - 7 — Layout & Arrangement (spacing and alignment as named values, the grid)
   - 8 — UI Visualizations (the brand applied on phone / tablet / desktop form factors)
2. **A downloadable PDF** of the document — positioned as a skeleton the user can hand
   to a contractor or professional designer as a starting point. Download button lives
   at the bottom of the sidebar.
3. **Design tokens** pullable into an iOS app, Android app, web app, React app, and
   Flutter app — colors (with tints), typography, and spacing all ride in the tokens.

### Site chrome

- Sidebar = section jumper for sections 0–8.
- At the bottom of the sidebar, ABOVE the Download PDF button: a **style slider** with
  three alternates — one with subtle changes, one with more dramatic changes, one that
  goes in a much different direction.
- Every alternate has **light and dark mode**, toggled from the sidebar. One of the
  three alternates is dark-mode-first.

### The three themes (must be felt in the artifact, not just claimed)

- **Consistency** — everything generates from one source of truth; site, PDF, and tokens
  cannot drift from each other; tints and spacing are named law, never eyeballed.
- **Speed** — the full set (site + PDF + five platforms of tokens) comes from one
  sitting; revisions are conversational: say what's wrong in plain words, regenerate.
- **Delegation** — every section ends as a handoff: the PDF to a professional, the
  tokens to a developer or agent, animation specs executable by a stranger.

### QA gates before it counts as done

- Fresh empty directory + Manual mode → complete site, PDF, and tokens, with zero
  errors and zero Potatuhs-specific residue.
- A directory with existing materials + Auto mode → sensible inferred answers.
- "Wrong color? Say so in plain words and regenerate" actually works as the entire
  revision loop, on a real example.
- The interview reads well on camera: questions land one at a time, in plain language,
  in the order specced above.
