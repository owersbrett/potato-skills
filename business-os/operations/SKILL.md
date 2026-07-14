---
name: operations
description: Compose the Operating Manual of a business — how work actually happens. A guided interview that locks the planning cycle and cadence, the decision framework (who decides what, reversible vs. irreversible, when it gets written down), the meeting protocol (including the meetings this company refuses), documentation and communication norms, the roles map of every seat the business needs — filled, unfilled, or agent-fillable — and the hiring path that onboards a human or an agent into a seat. Ships as a Business OS module with a living decision log. Triggers on "operating manual", "operations doc", "how we work", "decision framework", "meeting cadence", "roles map", "hiring plan", "/operations".
---

# operations — the operating manual

Every company runs on an operating system; most just never install it on
purpose. Decisions get made in whatever room happens to be occupied, meetings
accrete because nobody wrote down which ones are allowed to exist, and the
org chart is whoever answered the last email. **This skill writes the manual
down.** It interviews the founder through how work actually happens — the
cadence, the decision rights, the meetings and the refusals, where truth
lives, and every seat the business needs whether or not anyone sits in it —
then ships the result as a Business OS module: canonical `OPERATIONS.md`,
machine contract, a decision log that's meant to be written in weekly, MCP
server, standalone site.

This is stone 7 of 8. Read `../PROTOCOL.md` before composing — the module
contract, workspace layout, and definition of done live there and are not
repeated here. This stone reads `vision` (values and refusals shape decision
rights) and `business-model` (the metrics the planning cycle steers by);
locate both in the workspace and extract before asking. If either is missing,
flag it loudly and mark the dependent sections provisional.

## When to use it

The user says any of: "operating manual", "operations doc", "how we work",
"decision framework", "meeting cadence", "roles map", "hiring plan",
"/operations" — or asks who should decide something, which meetings to have,
or what to hire for next.

## The rubric — sections of OPERATIONS.md

Compose **in order**; each section feeds the next. Propose → confirm → lock,
one section per exchange (the interview mechanics in
`../../potatuhs-design/SKILL.md` §Procedure apply verbatim).

**00 · Cover** — business name, one-line description of how this company
works, version, date.

**01 · Planning cycle & cadence** — the rhythm work runs on: the quarterly
cycle (what gets set, reviewed, killed) and the weekly beat inside it (what
gets planned, what gets shipped, what gets looked at). Every recurring ritual
in the company must trace to a slot in this cycle; this section is what the
meeting protocol is later judged against.

**02 · Decision framework** — who decides what, by seat not by name.
The reversibility test: reversible decisions get made fast by the nearest
seat and logged; irreversible ones get written down *before* they're made,
with context and a revisit date. State the threshold for "write it down" —
a decision framework that lives only in heads is the drift this document
exists to prevent. Decisions land in the `decisions` table, not in chat
scrollback.

**03 · Meeting protocol** — the complete list of meetings this company holds:
each with its purpose, cadence, and which slot of the planning cycle it
serves. Then the refusals: the meetings this company does not hold, named on
paper (the status theater, the standing sync with no decision rights). A
meeting that can't point at a planning-cycle slot doesn't get scheduled —
it gets added to the refused list.

**04 · Documentation & communication norms** — where truth lives: which
documents are canonical, what belongs in a doc versus a message, and the
async default (write first, meet only when writing failed). One home per
fact, per protocol; this section names the homes.

**05 · Roles map** — every seat the business needs to run, whether or not
anyone occupies it: what the seat owns, what it decides (citing section 02),
and its status — **filled** (by whom), **unfilled**, or **agent-fillable**
(an agent could hold it today, with what supervision). Unfilled seats are
listed with the same care as filled ones. This map feeds the master
intranet's ghost town and its hiring recommendations directly — it is the
floor plan of the company the founder hasn't hired yet.

**06 · Hiring & onboarding** — how a new seat gets defined (owns / decides /
is measured by, citing `business-model`) and how a human or agent gets
onboarded into it. The onboarding path IS the documentation system: a new
occupant reads the workspace's canonical documents and the module CLAUDE.md
files, in a stated order, and is productive when they can update them
correctly. If someone can't be onboarded from the docs, the docs are the
bug — name what's missing.

## The module

Per `../PROTOCOL.md` (order 7, port 4007, upstream: `vision`,
`business-model`):

- **`OPERATIONS.md`** — the canonical document, sections above.
- **`operations.json`** — contract: `{ name, cadence: { quarterly, weekly },
  decisionFramework: { reversibleTest, writeDownThreshold,
  rights[{seat, decides}] }, meetings[{name, purpose, cadence, servesSlot}],
  refusedMeetings[{name, why}], norms: { canonicalDocs[], asyncDefault },
  roles[{seat, owns, decides, status: "filled" | "unfilled" |
  "agent-fillable", occupant, notes}], hiring: { seatDefinition,
  onboardingPath[] } }`.
- **Core tables** — `decisions` (decision, context, decided_by, reversible,
  decided_on, revisit_on) and `meetings` (meeting, purpose, cadence,
  notes_path): the operational half. The decision log is the living side of
  this stone — the document says how decisions get made; the table is where
  they actually land, week after week.
- **MCP** — the four standard tools (`operations_get_document`,
  `operations_get_contract`, `operations_query`, `operations_record`).
- **Site** — single-page-scroll document site, one section per rubric entry,
  per the architecture contract in `../../potatuhs-design/SITE.md` (sidebar
  nav, scroll-sync, print-to-PDF). If a brand stone exists in the workspace,
  render with its tokens; otherwise ship the neutral default theme and note
  it in `status`.
- **`CLAUDE.md`** — states that the master intranet's ghost town reads the
  roles map, so a change to section 05 changes what the intranet renders and
  recommends; and that a decision recorded in the `decisions` table which
  contradicts a canonical document must be **flagged** for the founder —
  never silently absorbed into the document, never silently ignored in the
  log.

## Hard rules

- **Unfilled seats stay visibly unfilled.** The roles map never fakes
  occupancy — no founder listed in nine seats to make the map look staffed.
  Emptiness is the onboarding funnel, per protocol; an honest empty seat is
  this stone's most valuable output.
- **Every decision gets logged with its reversibility.** A decision without
  a `reversible` flag and a `decided_by` seat isn't logged, it's gossip.
  Irreversible decisions also get a `revisit_on` date.
- **Meetings that don't serve the planning cycle get refused on paper.** The
  refused list is part of the manual, not an aside — future occupants of any
  seat can point at it instead of relitigating.
- **The manual describes how work happens, not how it sounds good.** If the
  founder's real cadence is one weekly review, lock that — an aspirational
  ritual nobody runs poisons the document's authority.
- **This stone defines process, not strategy.** What to build lives in
  `vision`; what to measure lives in `business-model`. This document says
  who decides, when, and where it's written — and cites upstream for the
  rest.
- **Placeholders over fabrications**, loudly, per protocol.
