---
name: customer-blueprint
description: Compose the Customer Blueprint — who the business serves, who it declines, and why they buy. A guided interview that locks evidence-backed personas (fears, motivations, aspirations, frustrations, buying triggers, objections, vocabulary), the segments explicitly refused, the buying journey, and the ongoing research method — then generates a standalone customer site, machine contract, core tables, and MCP surface per the Business OS protocol. Messaging mines this document for words; go-to-market mines it for triggers. Triggers on "customer blueprint", "customer personas", "who is our customer", "ideal customer profile", "target audience doc", "/customer-blueprint".
---

# customer-blueprint — the customer stone

Every business claims to know its customer; almost none can quote one. The
usual persona deck — "Marketing Mary, 34, lives in a suburb, likes yoga" — is
demographics cosplaying as understanding, and nothing downstream can use it.
What messaging, pricing, and go-to-market actually need is *psychology and
language*: what the customer is afraid of, what they're reaching for, what
finally makes them buy, what makes them balk, and the exact words they use for
all of it. **This skill writes that down**, interviews the founder against real
evidence, refuses to launder guesses into quotes, and ships the result as a
Business OS module: canonical `CUSTOMER.md`, machine contract, core tables,
MCP server, standalone site.

This is stone 2 of 8. Read `../PROTOCOL.md` before composing — the module
contract, workspace layout, and definition of done live there and are not
repeated here.

## When to use it

The user says any of: "customer blueprint", "customer personas", "ideal
customer profile", "who is our customer", "target audience doc",
"/customer-blueprint" — or invokes `messaging`, `business-model`, or
`go-to-market` in a workspace with no `customer-blueprint/` module (offer
this first; don't force it).

Upstream: locate `vision/VISION.md` in the workspace and extract from it —
especially §05 (what we refuse) and §06 (positioning) — instead of re-asking.
If it's missing, flag loudly per protocol: "composing the customer blueprint
without a locked vision — segment refusals are provisional."

## The rubric — sections of CUSTOMER.md

Compose **in order**; each section feeds the next. Propose → confirm → lock,
one section per exchange (the interview mechanics in
`../../brand-guidelines/SKILL.md` §Procedure apply verbatim).

**00 · Cover** — business name, one-line statement of who this business is
for, persona count, version, date.

**01 · Segments served & declined** — the market cut into named segments;
which ones this business serves and, just as deliberately, which it declines.
Every declined segment names the cost of serving them and cites the vision's
refusals (§05) where they align. A blueprint that declines nobody is a
mailing list, not a strategy.

**02–0N · One section per persona** — one section per persona, each built on
the same seven dimensions: **fears** (what keeps them up at night), **motivations**
(what actually drives the purchase), **aspirations** (who they're trying to
become), **frustrations** (what the status quo does to them daily), **buying
triggers** (the events that turn latent pain into a purchase), **objections**
(what stops them at the point of decision, with the honest answer to each),
and **vocabulary** (the words *they* use for the problem — not the founder's
words). Name each persona after the role or situation, not an invented human.
Two or three deep personas beat six shallow ones; push back on persona sprawl.

**0N+1 · Voice of customer** — the consolidated vocabulary bank: real phrases
customers have said, each attributed to a persona and a source (interview,
support ticket, review, sales call). This is the section `messaging` mines
directly — headlines get written from these rows. Thin evidence here gets a
loud placeholder, never invented dialogue.

**0N+2 · Buying journey, triggers & objections** — how a customer moves from
unaware to bought: the stages, what triggers movement between them, where
each persona typically enters, and where deals die. The objections from the
persona sections roll up here with the business's committed answers —
`go-to-market` sequences its plays against this map.

**0N+3 · Research method & evidence log** — how customer research happens
*ongoing*: interview cadence (e.g. n per month, who conducts them), the
question spine, and where evidence lands — every interview gets a row in the
`interviews` table, and personas get revised from evidence, never from vibes.
A blueprint without a research method is a snapshot pretending to be a system.

## The module

Per `../PROTOCOL.md` (order 2, port 4002, upstream reads: `vision`):

- **`CUSTOMER.md`** — the canonical document, sections above.
- **`customer-blueprint.json`** — contract: `{ name, forStatement,
  segments{ served[{name, why}], declined[{name, cost, visionRefusal}] },
  personas[{id, name, fears[], motivations[], aspirations[], frustrations[],
  triggers[], objections[{objection, answer}], vocabulary[]}],
  voiceOfCustomer[{phrase, personaId, source}], journey{ stages[],
  triggers[], dropoffs[] }, research{ cadence, method, evidenceHome } }`.
- **Core tables** — `personas` (id, name, segment, status, revised_on,
  evidence_count): the living register the document's persona sections
  project from, so a persona's evidence base is queryable, not asserted.
  `interviews` (persona_id, date, source, quote, insight, links): the
  evidence log — every conversation lands here first, and section 0N+3's
  cadence is measured against its row count.
- **MCP** — the four standard tools (`customer-blueprint_get_document`,
  `customer-blueprint_get_contract`, `customer-blueprint_query`,
  `customer-blueprint_record` — the write path for new interviews).
- **Site** — single-page-scroll document site, one section per rubric entry,
  per the architecture contract in `../../brand-guidelines/SITE.md` (sidebar
  nav, scroll-sync, print-to-PDF). If a brand stone exists in the workspace,
  render with its tokens; otherwise ship the neutral default theme and note
  it in `status`.
- **`CLAUDE.md`** — states that `messaging`, `go-to-market`, and
  `business-model` read this document; a change to any persona, the voice-of-
  customer bank, or the journey map requires checking all three for stale
  citations before the session ends.

## Hard rules

- **Personas are evidence-backed.** Every persona claim traces to something a
  real customer said or did. Where evidence doesn't exist yet, the persona is
  a *hypothesis* and the document says so — hypotheses are honest; disguised
  guesses are not.
- **Real quotes only.** An invented customer quote is a fabrication, and it's
  the worst kind — it poisons `messaging` downstream with words no customer
  ever used. No interviews yet means an empty voice-of-customer section with
  a loud placeholder and a research cadence to fill it.
- **The vocabulary section records what customers actually said** — their
  phrasing, their metaphors, their misuse of the founder's terminology.
  Correcting their words into industry language destroys the section's value.
- **Declined segments must decline something real** — a segment with actual
  revenue attached and a stated cost of serving it, citing the vision's
  refusals where they overlap. Push once; if the founder holds, take their
  answer.
- **No demographics-as-insight.** Age, city, and job title may appear as
  context; they never substitute for the seven dimensions. A persona defined
  only by demographics is a placeholder, marked as one.
- **Placeholders over fabrications**, loudly, per protocol.
