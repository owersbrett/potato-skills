---
name: vision
description: Compose the root document of a business — Vision & Positioning. A guided interview that locks why the company exists, the future it's building, its values, its contrarian beliefs, what it refuses to become, why-us/why-now positioning, and its product philosophy — then generates a standalone vision site, machine contract, core tables, and MCP surface per the Business OS protocol. Every other canonical document reads this one. Triggers on "vision doc", "vision and positioning", "why do we exist", "mission and values", "positioning document", "/vision".
---

# vision — the root stone

Every other document in a business cites this one. Brand derives personality
from it, messaging derives claims from it, the business model derives success
metrics from it. When it doesn't exist, every downstream decision gets made
twice — once implicitly by whoever's in the room, once more when someone
finally writes it down and discovers the room disagreed. **This skill writes
it down first.** It interviews the founder through the questions most
companies never answer on paper, locks the answers one at a time, and ships
the result as a Business OS module: canonical `VISION.md`, machine contract,
core tables, MCP server, standalone site.

This is stone 1 of 8. Read `../PROTOCOL.md` before composing — the module
contract, workspace layout, and definition of done live there and are not
repeated here.

## When to use it

The user says any of: "vision doc", "vision and positioning", "mission and
values", "positioning document", "why do we exist", "/vision" — or invokes
any downstream stone in a workspace with no `vision/` module (offer this
first; don't force it).

## The rubric — sections of VISION.md

Compose **in order**; each section feeds the next. Propose → confirm → lock,
one section per exchange (the interview mechanics in
`../../potatuhs-design/SKILL.md` §Procedure apply verbatim).

**00 · Cover** — business name, one-line self-description, version, date.

**01 · Why we exist** — the problem or absence in the world, in the founder's
words. Not the product; the *wrongness* the product answers. One paragraph,
concrete enough that a stranger could disagree with it.

**02 · The future we're building** — what changes if this succeeds. What
decade is this built for? Ask for the observable difference ("in 2035, X is
normal") — a vision you can't observe is a mood.

**03 · Mission & values** — the mission one-liner (what we do, for whom,
toward section 02). Then 3–6 values, each with: a sentence of meaning and
**one real decision it would change**. A value that wouldn't ever cost
anything is decoration; push until each one bites.

**04 · Beliefs & bets** — what we believe that competitors don't. Each belief
paired with the evidence that would prove it wrong. These are the company's
standing bets; they get revisited, which is why they also live in a table.

**05 · What we refuse** — what this company will *not* become; markets and
categories it declines on purpose; the revenue it would turn down. The
refusals are what make the vision falsifiable.

**06 · Positioning** — why us, why now, why not the named alternatives
(name them — "no competitors" is a placeholder, mark it as one). The category
being created or claimed, and the category being refused.

**07 · Product philosophy** — the constitution for product decisions: 3–7
short rules ("simplicity beats features", "every tap justifies itself") each
with one sentence on what it forbids. Downstream, the `technology` and
`go-to-market` stones judge proposals against these.

**08 · Success horizon** — what success observably looks like at 1, 5, and
10 years. Qualitative here; the `business-model` stone will quantify it and
cite this section.

## The module

Per `../PROTOCOL.md` (order 1, port 4001, no upstream reads):

- **`VISION.md`** — the canonical document, sections above.
- **`vision.json`** — contract: `{ name, oneLiner, why, future: { statement,
  decade, observables[] }, mission, values[{name, meaning, bites}],
  beliefs[{belief, refutedBy}], refusals[], positioning{ whyUs, whyNow,
  alternatives[], category, refusedCategory }, philosophy[{rule, forbids}],
  horizons{ y1, y5, y10 } }`.
- **Core tables** — `bets` (belief, evidence_for, evidence_against,
  revisit_on, status) and `milestones` (horizon, description, observed_on,
  status): the operational half — beliefs get tested and horizons get dated,
  and the master's coherence dashboard reads both.
- **MCP** — the four standard tools (`vision_get_document`,
  `vision_get_contract`, `vision_query`, `vision_record`).
- **Site** — single-page-scroll document site, one section per rubric entry,
  per the architecture contract in `../../potatuhs-design/SITE.md` (sidebar
  nav, scroll-sync, print-to-PDF). If a brand stone exists in the workspace,
  render with its tokens; otherwise ship the neutral default theme and note
  it in `status`.
- **`CLAUDE.md`** — states that every other stone reads this document; a
  change to sections 03–07 requires checking `brand`, `messaging`,
  `business-model`, and `technology` for stale citations before the session
  ends.

## Hard rules

- **This document outranks the others.** When a downstream stone contradicts
  it, the downstream stone is wrong — or the founder is changing the vision,
  which happens *here*, on purpose, never by drift.
- **Founder's words first.** Tighten grammar, never replace conviction with
  boilerplate. A generic vision document is worse than none — it launders
  indecision into prose.
- **Every value must bite, every belief must be refutable, every refusal must
  refuse something real.** Push once; if the founder holds, take their answer.
- **Placeholders over fabrications**, loudly, per protocol.
- **No numbers here.** Quantification belongs to `business-model`; this
  document stays true even when the numbers change.
