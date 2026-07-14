---
name: business-model
description: Compose the money document of a business — Business Model & Metrics. A guided interview that locks how the company makes money and how it knows it's working — revenue streams, the actual offer/price table, pricing philosophy, cost structure and margins, unit economics, reinvestment strategy, and the success metrics that quantify the vision's horizons — then generates a standalone model site, machine contract, core tables, and MCP surface per the Business OS protocol. Triggers on "business model", "pricing doc", "revenue model", "success metrics", "unit economics", "how do we make money", "/business-model".
---

# business-model — the money stone

Every business has a model; most have never written it down, which means the
prices are folklore, the margins are a feeling, and "success" is whatever the
last investor meeting needed it to be. This document ends that. It states, in
one place, how money comes in, what each offer costs, what the model spends to
earn it, and — critically — the numbers that make the vision's success
horizons falsifiable. Vision says what winning *looks like*; this stone says
what winning *measures*. **This skill interviews the founder through the
numbers, locks them one at a time**, and ships the result as a Business OS
module: canonical `MODEL.md`, machine contract, core tables, MCP server,
standalone site.

This is stone 5 of 8. Read `../PROTOCOL.md` before composing — the module
contract, workspace layout, and definition of done live there and are not
repeated here.

## When to use it

The user says any of: "business model", "revenue model", "pricing doc",
"success metrics", "unit economics", "how do we make money",
"/business-model" — or invokes `go-to-market`, `operations`, or `technology`
in a workspace with no `business-model/` module (offer this first; don't
force it).

Upstream reads: `vision` (especially section 08, Success horizon) and
`customer-blueprint`. Extract from them instead of re-asking; if either is
missing, flag it loudly and mark the dependent sections provisional, per
protocol.

## The rubric — sections of MODEL.md

Compose **in order**; each section feeds the next. Propose → confirm → lock,
one section per exchange (the interview mechanics in
`../../potatuhs-design/SKILL.md` §Procedure apply verbatim).

**00 · Cover** — business name, one-line description of the model ("we sell X
to Y on Z terms"), version, date.

**01 · Revenue streams** — every way money enters, ranked by expected share.
For each: what's sold, who pays (cite the persona from `customer-blueprint`),
recurrence (one-time, subscription, usage, seasonal), and today's status
(live, planned, hypothesis). A stream with no named payer is a hypothesis and
gets labeled as one.

**02 · Offers & pricing philosophy** — the actual offer table: every sellable
thing with its price, terms, and status. Then the philosophy that produced
those numbers — value-based, cost-plus, anchored, penetration — stated as a
rule the founder can apply to the *next* offer without re-deriving it. Each
price records what it was chosen *against* (feeds section 07).

**03 · Cost structure & margins** — fixed vs. variable costs, the biggest
three of each, and gross margin per offer. Real numbers where the founder has
them; loud `PLACEHOLDER` where they don't — an unknown margin marked unknown
is worth more than a flattering guess.

**04 · Unit economics** — the unit (a customer, a seat, a session, an order),
what one costs to acquire (CAC) and to serve, what one is worth over its life
(LTV), and the target ratio and payback period. Pre-revenue businesses state
these as *goals with a date to first measurement*, not as facts.

**05 · Reinvestment strategy** — where a marginal dollar of profit goes, in
priority order (product, acquisition, runway, owner pay), and the trigger
that changes the order ("once margin clears X, shift to Y"). This is the
model's growth thesis in one paragraph.

**06 · Success metrics** — the section that quantifies vision's section 08.
Each metric gets: a name, a precise definition (what counts, what doesn't),
a target with a date, the current value (or `PLACEHOLDER — not yet
measured`), and **the vision horizon it measures, cited by name**. A metric
that measures no horizon must say why it exists anyway (usually: it's a
guardrail) — or it doesn't ship.

**07 · Trade-offs ledger** — what this model optimizes for *at the expense
of* what: growth over margin, simplicity over segmentation, cash over scale.
Each entry names both sides and the decision that revealed it. A model with
no trade-offs hasn't chosen anything; push until at least three are real.

## The module

Per `../PROTOCOL.md` (order 5, port 4005, upstream: `vision`,
`customer-blueprint`):

- **`MODEL.md`** — the canonical document, sections above.
- **`business-model.json`** — contract: `{ name, modelOneLiner,
  streams[{stream, payer, recurrence, share, status}], pricingPhilosophy,
  offers[{offer, price, terms, status}], costs{ fixed[], variable[],
  marginByOffer[] }, unitEconomics{ unit, cac, costToServe, ltv, targetRatio,
  paybackMonths, measuredFrom }, reinvestment{ priorities[], trigger },
  metrics[{metric, definition, target, current, horizon}],
  tradeoffs[{optimizesFor, atExpenseOf, decision}] }`. The pricing table and
  metrics are the machine-readable heart — this is what downstream software
  quotes prices from and grades progress against.
- **Core tables** — `offers` (offer, price, terms, status) and `metrics`
  (metric, definition, target, current, measured_on): the operational half —
  prices change and metrics get measured, and the master dashboard and the
  advisor read both.
- **MCP** — the four standard tools (`business-model_get_document`,
  `business-model_get_contract`, `business-model_query`,
  `business-model_record`).
- **Site** — single-page-scroll document site, one section per rubric entry,
  per the architecture contract in `../../potatuhs-design/SITE.md` (sidebar
  nav, scroll-sync, print-to-PDF). If a brand stone exists in the workspace,
  render with its tokens; otherwise ship the neutral default theme and note
  it in `status`.
- **`CLAUDE.md`** — states that `go-to-market`, `operations`, and
  `technology` read this document; changing any price or metric requires
  updating `business-model.json` in the same session, and a change to
  sections 02 or 06 requires checking those three stones for stale citations
  before the session ends.

## Hard rules

- **No invented fallbacks — ever.** Missing financial data is a loud contract
  violation, never papered over. No fabricated numbers, no "industry
  standard" placeholders dressed as data; an unknown number is a loud
  `PLACEHOLDER` with a plan to measure it. This is house law.
- **Every metric cites its horizon.** Each success metric names the vision
  section-08 horizon it quantifies, or states explicitly why it exists
  without one. Orphan metrics are how dashboards fill with vanity.
- **Every pricing decision records its trade-off.** A price chosen against
  nothing was not chosen. The number goes in the offer table; the sacrifice
  goes in the ledger.
- **Numbers live here.** Vision stays qualitative; downstream stones cite
  this document's prices and targets, never restate them. When a quoted
  number and this document disagree, this document wins.
- **Goals are not facts.** Pre-measurement values (LTV/CAC targets, projected
  margins) are labeled as goals with a measurement date — the contract's
  `current` field stays honest until real data lands.
- **Founder's model first.** If the founder's pricing instinct conflicts with
  a textbook, note the trade-off once in the ledger, then do it their way.
