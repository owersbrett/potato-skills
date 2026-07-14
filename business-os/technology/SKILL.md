---
name: technology
description: Compose the Technology & Architecture document of a business. A guided interview that locks engineering principles, the stack and what each choice was traded against, the system inventory, coding standards agents inherit, deployment and security philosophy, scalability goals, and the product requirements philosophy — how features are judged, what MVP means, when to ship, how debt is paid — then generates a standalone site, machine contract, core tables, and MCP surface per the Business OS protocol. Triggers on "/technology", "tech architecture", "engineering guide", "technical architecture doc", "how we build software", "product requirements philosophy".
---

# technology — the builder's stone

This is the document a technical founder walks into. Every other stone can be
written by the owner alone; this one is usually the ghost town's most
important empty room — and when it's absent, the advisor's #1 recommendation
is almost always the hire who would write it. When it *does* exist, it does
two jobs at once: it tells a human engineer how this company builds software,
and it tells every agent session working in the company's repos the same
thing, with the same authority. Stack choices stop being fashion, features
stop being vibes, and "we'll clean it up later" gets a written definition of
later. **This skill writes the room's contents down** — interviewing whoever
holds the technical truth (founder, first engineer, or the owner admitting
what they don't know), locking answers one at a time, and shipping the result
as a Business OS module: canonical `TECHNOLOGY.md`, machine contract, core
tables, MCP server, standalone site.

This is stone 8 of 8. Read `../PROTOCOL.md` before composing — the module
contract, workspace layout, and definition of done live there and are not
repeated here.

## When to use it

The user says any of: "/technology", "tech architecture", "engineering
guide", "technical architecture doc", "product requirements", "how do we
decide what to build", "coding standards doc" — or a workspace has the other
stones and an engineer is about to touch code without one.

## The rubric — sections of TECHNOLOGY.md

Compose **in order**. Propose → confirm → lock, one section per exchange
(the interview mechanics in `../../potatuhs-design/SKILL.md` §Procedure apply
verbatim). Upstream reads: `vision` (§07 product philosophy), `business-model`
(growth and volume targets), `operations` (decision log conventions). Extract
from them; flag loudly when one is missing.

**00 · Cover** — business name, one-line technical self-description, version,
date.

**01 · Engineering principles** — 3–7 rules for how software gets built here,
each judged against the product philosophy in `VISION.md` §07 — cite the rule
it serves, don't restate it. Each principle names one thing it forbids. A
principle that never forbids anything is a poster.

**02 · The stack** — every layer (language, framework, data, hosting, CI),
and for each choice: **what it was traded against and why the trade was
made**. "React because React" is not a record; "React over Svelte because
hiring pool beats bundle size for us" is. Choices without a recorded
alternative are marked as unexamined.

**03 · System inventory** — every service, app, repo, and third-party system
the business runs on: what it does, what it's built with, its status, who
owns it. This section seeds the `systems` table; the table is where it lives
from then on.

**04 · Coding standards & repo conventions** — naming, structure, review
rules, testing expectations, branching, what a repo's own CLAUDE.md must
contain. This is the section the workspace's downstream CLAUDE.mds inherit —
write it as instructions to an agent, because that's who reads it most.

**05 · Deployment philosophy** — how code reaches production: environments,
gates, rollback posture, who may deploy and when. Written so a stranger with
credentials could ship safely on day one.

**06 · Security philosophy** — secrets handling, access model, data
classification, what is never logged, the incident posture. Same standard: a
stranger can act on it, not just nod at it.

**07 · Scalability goals** — what scale this architecture is honestly built
for, citing the targets in `business-model` (users, volume, revenue events)
rather than inventing its own numbers. Name the first bottleneck and the
signal that says it's time to re-architect.

**08 · Product requirements** — how a feature earns its way in: the
evaluation questions, each grounded in `VISION.md` §07 by citation; and the
MVP definition — what "minimum" means here, stated so a proposed scope can
fail it.

**09 · Release, debt & experimentation** — the release philosophy (cadence,
what blocks a ship, what never does); the technical debt policy (how debt is
recorded, when it's paid, what "later" means in weeks); the experimentation
policy (what may be prototyped outside the standards, and the rule for when
an experiment must graduate or die).

## The module

Per `../PROTOCOL.md` (order 8, port 4008, upstream: vision, business-model,
operations):

- **`TECHNOLOGY.md`** — the canonical document, sections above.
- **`technology.json`** — contract: `{ name, oneLiner,
  principles[{rule, serves, forbids}], stack[{layer, choice, tradedAgainst,
  because}], systems[], standards{ naming, review, testing, claudeMd },
  deployment{ environments[], gates[], rollback }, security{ secrets, access,
  neverLogged[], incident }, scalability{ builtFor, cites, bottleneck,
  reArchitectSignal }, requirements{ evaluation[], mvp },
  release{ cadence, blocks[], neverBlocks[] }, debt{ recordedIn, paidWhen },
  experimentation{ allowed, graduateWhen } }`.
- **Core tables** — `systems` (system, purpose, stack, status, owner) and
  `adrs` (decision, context, alternatives, chosen_on, status): the
  operational half. The ADR log mirrors operations' decision log — every
  architecture decision lands there with its alternatives, so §02 never has
  to be re-argued from memory.
- **MCP** — the four standard tools (`technology_get_document`,
  `technology_get_contract`, `technology_query`, `technology_record`).
- **Site** — single-page-scroll document site per the architecture contract
  in `../../potatuhs-design/SITE.md`. If a brand stone exists in the
  workspace, render with its tokens; otherwise the neutral default theme,
  noted in `status`.
- **`CLAUDE.md`** — states that this document governs how agents write code
  in the business's repos: the coding standards in §04 are what the
  workspace's downstream CLAUDE.mds inherit, and a change to §01–§04 requires
  propagating to those files before the session ends.

## Hard rules

- **A stack choice records its trade-off or it's fashion.** Every entry in
  §02 names the alternative it beat and why; a choice with no alternative is
  marked unexamined, loudly, and the ADR log stays hungry for it.
- **Features are judged against vision's product philosophy by citation.**
  §01 and §08 point at `VISION.md` §07; they never restate it. If the
  evaluation needs a rule the vision doesn't have, that's a vision change —
  it happens in the vision stone, on purpose.
- **No UI values here.** Design tokens, components, and visual rules belong
  to the brand stone (`potatuhs-design`). This document cites them; the
  moment it redefines a color or a component, it's wrong.
- **Security and deployment must be actionable by a stranger.** "Be careful
  with secrets" fails the test; a named store, a named gate, and a named
  rollback pass it. If the honest answer is "we have no process", write that
  — it's a placeholder the advisor can act on.
- **Placeholders over fabrications**, loudly, per protocol. An invented
  architecture is worse than an empty room — the room at least tells the
  truth about the hire it's waiting for.
- **Decisions land in the ADR log, not in chat.** When §02 or §03 changes,
  the change enters `adrs` with context and alternatives in the same session,
  or it didn't happen.
