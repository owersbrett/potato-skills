---
name: intranet
description: Assemble the Business OS master site — the business intranet. Scans a workspace for Business OS modules (the eight canonical-document stones), mounts every present stone's site under one shell with unified nav, renders absent stones and empty tables as an honest ghost town, runs a coherence dashboard across all documents, and hosts the advisor — a live Claude-powered component that reads every canonical document and makes grounded recommendations on provisioning, hiring, agent use cases, Claude Code administration, and networking. Triggers on "assemble the intranet", "master site", "compose the business site", "bring the stones together", "/intranet".
---

# intranet — the master stone

Each stone stands alone; this skill is what they snap into. Point it at a
Business OS workspace and it composes whatever exists — one stone or all
eight — into a single business intranet: every document, every table, every
empty seat, under one nav on one domain. **Partial assembly is the normal
case and the point.** The intranet with three stones present is not a broken
site; it's an honest map of a company that is three-eighths decided.

Read `../PROTOCOL.md` first — the manifest schema, port plan, and ghost-town
thesis govern everything below.

## When to use it

The user says any of: "assemble the intranet", "master site", "compose the
business", "bring it together", "/intranet" — or finishes composing a second
stone in a workspace that has no `intranet/` yet (offer it; the moment two
stones exist, integration has value).

## Procedure

### 1. Scan

Walk the workspace for `module.json` manifests. Validate each against the
protocol version; refuse (loudly, per-module, without aborting the rest) any
manifest that doesn't parse or lies about its paths. Report the census:
present stones, absent stones, per-stone `status` (locked vs. placeholder
sections).

### 2. Mount

Build each present module's site with its `basePath` (`/[slug]/`) and mount
the outputs under one shell at port 4000:

- **Unified nav lists all eight rooms** in protocol order — present stones
  link into their mounted sites; absent stones link to their ghost room.
- Cross-document links resolve across modules (a messaging page citing brand
  voice links into `/brand/…`).
- The shell carries the brand stone's tokens when present; the neutral theme
  when not (and says so — an unbranded intranet is itself a ghost sign).

### 3. The ghost town

For every **absent stone**: a designed empty room — the document's name, what
it decides, which present documents are currently guessing at its answers,
and who would live here (the role, hire, or agent that owns this room). For
every **empty core table** in present stones: the honest empty state ("0
leads — this is where go-to-market lives") — never sample data. The composed
effect is deliberate: a non-technical owner should feel the shape of the
company they haven't hired yet. That feeling is the product. Do not soften
it with fake occupancy.

### 4. Coherence dashboard

One page, generated from manifests + documents:

- Placeholder counts per stone, and the oldest placeholders.
- **Stale-downstream warnings**: upstream document changed after a downstream
  stone last locked (compare doc mtimes / status against `upstream` edges).
- Contradiction flags: where one document's claim conflicts with another's
  (collected by the advisor, surfaced here with citations).
- The census from step 1, as the permanent "state of the business" header.

### 5. The advisor

The one live component — everything else builds static. A minimal server
(the intranet's `site/` may therefore be a small Node server serving static
mounts + one API route) that:

- Loads **every present canonical document** (and the census of what's
  absent) as context for each request, via the modules' MCP servers or
  direct file reads.
- Answers and recommends in these domains: **infrastructure provisioning**
  (what to stand up now vs. later), **hiring order** (grounded in the empty
  rooms), **agent/automation use cases** (which tables and playbooks are
  agent-shaped), **Claude Code administration** (how this workspace's
  CLAUDE.mds, skills, and MCP servers should be operated), **network
  considerations**, and **events worth networking at** (grounded in the
  customer blueprint and go-to-market stones).
- **Cites the grounding document for every recommendation.** Where the
  documents are silent, it says "your documents don't answer this yet — that
  lives in the <stone> room", and links the ghost room. The advisor is the
  ghost town's tour guide, not a general-purpose oracle.
- Uses the Claude API (key via env, never committed; missing key renders the
  advisor's own honest empty state with setup instructions).

### 6. Workspace CLAUDE.md

Create or update the **root CLAUDE.md** per protocol: business name, stone
map, the SSOT laws, the update protocol (which skill re-composes which
document, what to re-check downstream). This file is what makes the system
maintainable by future agent sessions instead of decaying into a pretty
snapshot.

### 7. Hand off

Run it. Verify: census correct, every mount serves, ghost rooms render for
every absent stone, dashboard warnings truthful, advisor answers with
citations (or renders its empty state without a key). Report the census, the
top three coherence warnings, and — in the advisor's voice — the single next
stone or hire the business most needs.

## Hard rules

- **Never fake occupancy.** No sample rows, no lorem personas, no invented
  metrics. The ghost town converts only if it's real.
- **Partial assembly is success**, not degraded mode. One stone composes.
- **The intranet is a renderer + auditor.** It never edits canonical
  documents; edits go through each stone's own skill and CLAUDE.md.
- **Manifests are the only discovery mechanism.** No hardcoded stone lists in
  the shell — a ninth module that speaks the protocol should mount without
  this skill changing.
- **Advisor recommendations must cite a document or confess the gap.**
  Ungrounded advice is fabrication with a haircut.
