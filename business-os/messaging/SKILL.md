---
name: messaging
description: Compose the Messaging & Content document of a business — what the company says, everywhere it says it. A guided interview that locks the elevator pitch at three lengths, taglines and headline patterns, a claims ledger grounding every claim in vision or customer evidence, the vocabulary (forbidden words, preferred metaphors), website copy rules, and per-channel style guides — then ships it as a Business OS module with contract, tables, MCP surface, and standalone site. Triggers on "messaging doc", "messaging framework", "elevator pitch", "content style guide", "what do we say", "copy guidelines", "/messaging".
---

# messaging — what we say

A company that hasn't written its messaging down says something slightly
different every time it opens its mouth — the pitch mutates per teller, the
website claims things nobody can back, and every new blog post re-litigates
tone from scratch. **This skill writes down what the company says, once.**
It interviews the founder into a pitch that survives three lengths, a ledger
where every claim names its evidence, a vocabulary with teeth, and channel
rules that make the hundredth post sound like the first — then ships it as a
Business OS module: canonical `MESSAGING.md`, machine contract, core tables,
MCP server, standalone site.

This is stone 4 of 8. Read `../PROTOCOL.md` before composing — the module
contract, workspace layout, and definition of done live there and are not
repeated here.

**The dividing line, stated once and enforced everywhere:** `brand` owns
*voice* — who we sound like. `messaging` owns *what we say* — the claims,
pitches, and channel rules. This document cites the brand voice spec; it
never restates it. One fact, one home.

## When to use it

The user says any of: "messaging doc", "messaging framework", "elevator
pitch", "content style guide", "copy guidelines", "what do we say",
"/messaging" — or is about to write website copy, a launch post, or a deck
in a workspace with no `messaging/` module (offer this first; don't force it).

Upstream reads: `vision`, `customer-blueprint`, `brand`. Locate them in the
workspace and extract before asking anything. If one is missing, flag loudly
per protocol ("composing messaging without a locked brand voice — tone dials
in section 06 are provisional") and mark the affected sections.

## The rubric — sections of MESSAGING.md

Compose **in order**; the pitch feeds the claims, the claims feed the copy.
Propose → confirm → lock, one section per exchange (the interview mechanics
in `../../potatuhs-design/SKILL.md` §Procedure apply verbatim).

**00 · Cover** — business name, one-line self-description (cited from
vision's cover, not re-invented), version, date.

**01 · The pitch, three lengths** — the same argument at three zoom levels:
one sentence (the answer to "what is it?"), ~30 seconds (the elevator: the
problem, the answer, why us), one paragraph (adds why-now and the named
alternatives). Each length must survive alone; each is grounded in vision
§01 and §06 and speaks to the primary persona in the customer blueprint.
Draft all three from the upstream documents first, then let the founder
correct — their spoken pitch usually beats the written draft in one place;
steal that place.

**02 · Claims ledger** — every factual claim the company makes in public
("fastest X", "trusted by Y", "the only Z that…"), each with the vision or
customer-blueprint section that grounds it and an evidence status
(`grounded` / `asserted` / `placeholder`). A claim with no grounding is
either marked placeholder or cut. This section is the audit trail for every
sentence downstream; `go-to-market` builds campaigns only on ledger claims.

**03 · Taglines & headline patterns** — the tagline candidates (locked one
first, alternates kept), then 3–6 reusable headline *patterns*, each with
the structure named and one real example ("[outcome] without [dreaded
thing]" → live example). Patterns are what keep a hundred future headlines
in one family without a copywriter in the room.

**04 · Vocabulary** — the words. **Forbidden words** with the replacement
for each (the fastest edit any future writer can make), and **preferred
metaphors** — the 2–4 images the company explains itself through. Mine both
from the customer blueprint's voice-of-customer material: the customers'
own words for the problem outrank any marketing thesaurus. A forbidden list
copied from generic advice ("avoid 'synergy'") is decoration; each entry
should ban something this company was actually about to say.

**05 · Website copy rules** — the rules for the highest-stakes surface:
hero formula (headline pattern + subhead role + CTA verb list), how claims
from §02 may appear (with grounding intact), reading-level ceiling, CTA
vocabulary, what never appears above the fold. Rules, not the copy itself —
approved copy lives in the `copy_blocks` table.

**06 · Channel style guides** — one short guide per channel: **blog, video,
social, newsletter, documentation**. Each gets a **tone dial** (where this
channel sits relative to the brand voice — cite the brand spec's voice
section, never paraphrase it: "brand voice at full warmth, formality −2")
and **format rules** (length, structure, cadence, CTA presence, what this
channel never does). Channels the business doesn't use are cut explicitly
at intake, not silently omitted.

## The module

Per `../PROTOCOL.md` (order 4, port 4004, upstream `vision`,
`customer-blueprint`, `brand`):

- **`MESSAGING.md`** — the canonical document, sections above.
- **`messaging.json`** — contract: `{ name, pitch{ sentence, elevator,
  paragraph }, tagline, taglineAlternates[], headlinePatterns[{pattern,
  example}], claims[{claim, grounds, status}], vocabulary{
  forbidden[{word, insteadSay}], metaphors[{image, explains}] },
  websiteRules{ heroFormula, ctaVerbs[], neverAboveFold[] },
  channels[{channel, toneDial, formatRules[]}] }`.
- **Core tables** — `copy_blocks` (channel, title, body, status,
  approved_on) and `claims` (claim, grounds_doc, grounds_section,
  evidence_status, last_verified): the operational half — approved copy
  accumulates for reuse, and claims get their evidence checked over time;
  the master's coherence dashboard reads both.
- **MCP** — the four standard tools (`messaging_get_document`,
  `messaging_get_contract`, `messaging_query`, `messaging_record`).
- **Site** — single-page-scroll document site, one section per rubric
  entry, per the architecture contract in `../../potatuhs-design/SITE.md`
  (sidebar nav, scroll-sync, print-to-PDF). Render with the workspace's
  brand tokens if the brand stone exists; otherwise neutral default theme,
  noted in `status`.
- **`CLAUDE.md`** — states that `go-to-market` reads this document; states
  that any change to vision §01/§06 or to the brand voice section stales
  this document — re-invoke this skill for a structured revision and
  re-verify the claims ledger before the session ends.

## Hard rules

- **Every claim cites its grounding** — a vision or customer-blueprint
  section by name — or is marked `placeholder`, loudly. An ungrounded claim
  shipped as fact is the one failure this stone exists to prevent.
- **Never restate brand voice; link it.** Tone dials reference the brand
  spec's voice section. If the voice needs changing, that happens in the
  brand stone — never by drift inside a channel guide.
- **Sample copy is written live and approved by the user**, one section per
  exchange, propose → confirm → lock. Copy the user never saw never enters
  `copy_blocks`.
- **Vocabulary comes from customers' mouths.** Forbidden words and
  metaphors are mined from voice-of-customer material; when that material
  is thin, say so and mark the section provisional — don't fill it from a
  generic style guide.
- **The pitch cannot out-claim the vision.** If the founder wants to pitch
  a category vision refuses, the change happens upstream, on purpose.
- **Placeholders over fabrications**, loudly, per protocol.
