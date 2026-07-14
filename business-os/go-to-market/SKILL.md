---
name: go-to-market
description: Compose the Go-to-Market Playbook — three playbooks in one stone. A guided interview that locks acquisition channels (chosen and declined), campaign structure and KPIs, the launch checklist, the sales motion (discovery, objections, demo, proposal, follow-up — optional if the business doesn't sell 1:1), and the customer success manual (onboarding, support tone, escalation, community) — then generates a standalone GTM site, machine contract, the leads and campaigns tables, and MCP surface per the Business OS protocol. Triggers on "go to market", "gtm", "marketing playbook", "sales playbook", "customer success manual", "launch plan", "/go-to-market".
---

# go-to-market — the motion stone

Most businesses have three separate half-written playbooks: marketing lives in
someone's head, sales lives in whoever closed the last deal, and customer
success is whatever got typed into the last apology email. They drift apart
because nobody made them cite the same customer, the same voice, the same
numbers. **This stone binds them into one document.** It reads what upstream
already locked — the personas and objections from `customer-blueprint`, the
claims and voice from `messaging`, the metrics from `business-model` — and
composes the playbook that spends them: which channels get money and which
get refused, how a lead becomes a customer, and how a customer stays one.
It ships as a Business OS module: canonical `GTM.md`, machine contract, the
`leads` and `campaigns` tables, MCP server, standalone site.

This is stone 6 of 8. Read `../PROTOCOL.md` before composing — the module
contract, workspace layout, and definition of done live there and are not
repeated here. Upstream reads: `messaging`, `business-model`,
`customer-blueprint`. Extract from them instead of re-asking; when one is
missing, flag it loudly and mark the dependent sections provisional.

## When to use it

The user says any of: "go to market", "gtm", "marketing playbook", "sales
playbook", "customer success manual", "launch plan", "/go-to-market" — or
asks how to launch, acquire customers, or run campaigns in a workspace where
this module doesn't exist yet.

## The rubric — sections of GTM.md

Compose **in order**; each section feeds the next. Propose → confirm → lock,
one section per exchange (the interview mechanics in
`../../potatuhs-design/SKILL.md` §Procedure apply verbatim). At intake, ask
one question that shapes the whole middle of the document: **does this
business sell 1:1?** If not, Part II is cut explicitly — a stated decision in
the document, not a silent hole.

### Part I — Marketing

**00 · Cover** — business name, version, date, and the sales-motion decision
(1:1 sales: yes / no, and why).

**01 · Channels** — the acquisition channels this business runs, each with:
which persona it reaches (cite `customer-blueprint`), what it costs, and why
it fits. Then, with equal weight, **the channels declined** — each named,
with the real reason it's refused (wrong persona, wrong economics, wrong
voice). A declined-channels list with nothing tempting on it is decoration;
the declines are what keep the next shiny channel from eating a quarter.

**02 · Campaign structure** — the anatomy of one campaign: hypothesis,
channel, audience, message (cite the claim in `messaging` — never draft new
copy here), budget, duration, kill criteria. Every campaign in the
`campaigns` table follows this shape.

**03 · Launch checklist** — the ordered, checkable list for shipping anything
public: message locked, page live, tracking wired, support briefed, rollback
known. Concrete enough to run on launch morning without judgment calls.

**04 · Channel KPIs** — the one number per channel, and which
`business-model` metric it feeds. Every KPI here is a citation; if the metric
a channel needs doesn't exist upstream, that's a change request to
`business-model`, not a new number minted here.

**05 · Experiment protocol** — how a new channel or tactic earns budget:
hypothesis stated first, smallest honest test, pre-committed success
threshold, verdict recorded in `campaigns` win or lose. Dead experiments are
kept, not deleted — they're the evidence behind section 01's declines.

### Part II — Sales *(optional — cut at intake if the business doesn't sell 1:1)*

**06 · Discovery questions** — the questions that surface a prospect's
trigger and pain, mined from `customer-blueprint`'s buying triggers and
objections. Each question names what it's testing for.

**07 · Objection handling map** — every objection from `customer-blueprint`,
paired with the grounded answer: the evidence, the reframe, or the honest
"then we're not for you". An answer that doesn't trace to blueprint evidence
is a hope, and it gets marked as one.

**08 · Demo flow** — the ordered beats of showing the product: which persona
pain each beat answers, what to show, what to deliberately skip.

**09 · Proposal structure** — the sections of a proposal, in order, with
pricing cited from `business-model` — never restated, never discounted here
without naming the rule that allows it.

**10 · Follow-up cadence** — the touch schedule after demo and after
proposal: how many touches, spaced how, in what tone (cite `messaging`), and
the explicit stop condition — when a lead is marked dead and left alone.

### Part III — Customer Success

**11 · Onboarding path** — the steps from purchase to first value, with the
"aha" moment named and the time-to-value target (cite `business-model` if it
tracks one). Where new customers stall, and what fires when they do.

**12 · Support tone** — how support sounds, cited from the brand voice via
`messaging`: what it always does, what it never does, with two or three
example replies in-voice. This section quotes; it does not re-legislate voice.

**13 · Escalation & refunds** — who handles what, the severity ladder, the
response-time promise, and the refund policy stated plainly enough that a
customer and an agent read it the same way. No discretion left implicit.

**14 · Community** — where customers gather (or the explicit decision not to
run one yet), who tends it, what it's for, and the line between community and
support.

## The module

Per `../PROTOCOL.md` (order 6, port 4006, upstream: `messaging`,
`business-model`, `customer-blueprint`):

- **`GTM.md`** — the canonical document, sections above.
- **`go-to-market.json`** — contract: `{ salesMotion: { oneToOne, reason },
  channels: { chosen[{channel, persona, kpi, metricRef}], declined[{channel,
  reason}] }, campaignAnatomy[], launchChecklist[], kpis[{channel, kpi,
  metricRef}], experimentProtocol{ threshold, minTest }, sales{ discovery[
  {question, testsFor}], objections[{objection, evidenceRef, answer}],
  demoBeats[], proposalSections[], followUp{ touches[], stopCondition } },
  success{ onboardingSteps[], ahaMoment, supportTone{ always[], never[] },
  escalation{ ladder[], responseTimes }, refundPolicy, community } }`.
- **Core tables** — `leads` (source, persona, stage, next_action, created_on,
  last_touch, closed_on, status): the pipeline itself; and `campaigns`
  (channel, hypothesis, kpi, budget, started_on, ended_on, status, result):
  the experiment log. These are the stone's operational half and the standard
  the protocol names for this slug.
- **MCP** — the four standard tools (`go-to-market_get_document`,
  `go-to-market_get_contract`, `go-to-market_query`, `go-to-market_record`).
- **Site** — single-page-scroll document site, one section per rubric entry,
  per the architecture contract in `../../potatuhs-design/SITE.md`. Render
  with the workspace's brand tokens if the brand stone exists; otherwise the
  neutral default theme, noted in `status`.
- **`CLAUDE.md`** — states that this is the most *operational* stone: the
  document changes rarely, the tables change daily, and agents recording
  leads and campaign results through `go-to-market_record` is the primary
  write path. Document edits still go through a session under this CLAUDE.md;
  a change to sections 01 or 04 requires re-checking the `business-model`
  metric citations before the session ends.

## Hard rules

- **KPIs cite `business-model` metrics — never invent parallel ones.** Two
  definitions of the same number is how marketing and finance stop speaking;
  a channel that needs a new metric requests it upstream.
- **Objection answers ground in `customer-blueprint` evidence.** An answer
  with no traceable objection behind it is speculation and gets marked
  `PLACEHOLDER`, not polished.
- **Every campaign row states its hypothesis before its result.** A campaign
  recorded after the fact with a retrofitted hypothesis is a story, not an
  experiment — the `campaigns` table exists to prevent exactly that.
- **Declined channels must decline something real.** "We're not doing
  billboards" costs nothing; declining the channel the founder is actually
  tempted by is what makes section 01 load-bearing. Push once; if the founder
  holds, take their answer.
- **This stone spends upstream decisions; it doesn't remake them.** Copy
  comes from `messaging`, prices from `business-model`, personas from
  `customer-blueprint` — cited, never restated, never quietly amended here.
- **Placeholders over fabrications**, loudly, per protocol.
