---
title: "You keep narrating risks instead of enforcing against them"
slug: "tater-review-the-context-journal-build"
date: "2026-07-01T09:15:00-07:00"
flavor: "tater"
audience: "self"
through_line: "Across this session you repeatedly named a risk or self-graded your own work in prose, instead of building the check that would actually catch it."
diamonds:
  - "Naming a risk is not handling it — mitigate it in the same step or file an explicit TODO; prose about a risk leaves the risk fully intact."
  - "A contract that isn't executable is just documentation, and documentation drifts — put a shared schema on BOTH sides and validate at the boundary (Zod/Pydantic .parse as the backstop)."
  - "You can't be your own test oracle — confirmation bias + curse of knowledge mean self-checks catch 30–50% of defects vs 70–90% for independent ones. Route verification through something you didn't author."
  - "Validate on the producer side, not only the consumer — otherwise drift ships silently until someone else's build breaks."
tags: ["process", "contracts", "testing", "self-review", "anti-patterns"]
reading_time: 4
source:
  kind: "claude-session"
  summary: "Scaffolded the context-journal skill family (contract, potato, tater, web spec); tater then reviewed the session adversarially."
  duration: "~2h"
cover: null
---

## Thesis

Three separate times this session, a real risk was **spoken about instead of
guarded against**. The recap flavor would have called this a productive build. It
was — but the shape of the mistakes is consistent and worth internalizing: *you
reach for narration and self-assessment where you should reach for an executable
check.* Same habit, three costumes.

## Findings

### 1. Flag-and-forget — naming a risk substituted for handling it

**Evidence.** Right after writing the first `out/` entry, the note went out: two
near-identical entries "would be noise / redundant." Then two near-identical entries
were written anyway (`designing-the-context-journal-family` and
`journaling-the-journaler` share most of their diamonds).

**Why it's a problem.** The Rule of Three exists to separate *accidental* duplication
(remove it) from *essential* duplication (leave it until a pattern emerges). This was
accidental duplication that got explicitly identified and then shipped — the worst
case, because the judgment happened and was discarded. Verbalizing a risk creates the
*feeling* of having managed it while the risk is 100% intact. ([Rule of three — Wikipedia](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming)))

**Fix.** When you name a risk mid-work, resolve it in the same step or convert it into
an explicit artifact (a TODO, a decision record) — never leave it as sentence. If it's
worth saying, it's worth either doing or tracking.

**Lesson.** Verbalized risk ≠ managed risk.

### 2. A contract with no enforcement on the producer side

**Evidence.** `CONTRACT.md` is prose. The web `SPEC.md` says the *app* (consumer)
should fail its build on a malformed entry. Nothing validates the entries the *skill*
(producer) writes. Both potato and tater emit hand-authored Markdown with zero schema
check.

**Why it's a problem.** Consumer-side validation only surfaces drift at the consumer's
build — late, and as someone else's problem. The standard guidance is to validate at
the **ingestion boundary of each stage**, using an executable schema (Zod's `parse()`,
Pydantic's `model_validate()`) as a backstop against drift, even when you "trust" the
upstream. A prose contract can't do that; it silently rots as the flavors multiply.
([Pactflow — Schemas Can Be Contracts](https://pactflow.io/blog/schemas-can-be-contracts/), [Contract testing for AI pipelines](https://tianpan.co/blog/2026-04-20-contract-testing-ai-pipelines))

**Fix.** Promote `CONTRACT.md` to a single shared schema (JSON Schema or a Zod module)
that both the skill and the app import. Have the skill validate an entry *before it
writes it*, and add a CI check that lints every file in `out/`. The prose doc becomes
the human-readable view of the schema, not the source of truth.

**Lesson.** A contract that isn't executable is documentation, and documentation
drifts. Put the schema on both sides.

### 3. Self-authored dogfooding was reported as a passing test

**Evidence.** The `journaling-the-journaler` entry claimed the potato procedure "held"
and that "dogfooding works" — after I wrote both the procedure and the run that
exercised it.

**Why it's a problem.** This is textbook non-independence. Confirmation bias steers you
to confirm the happy path you designed; the curse of knowledge makes the gaps you built
invisible to you. Measured impact is not small: authors catch ~30–50% of defects in
their own work, independent review catches 70–90% of what's left. A self-run over a
self-written procedure is close to zero evidence of correctness. ([betterqa — benefits of test independence](https://betterqa.co/benefits-of-test-independence/), [Catalog of Bias — verification bias](https://catalogofbias.org/biases/verification-bias/))

**Fix.** Make the oracle something you didn't author: run potato/tater from a *separate*
session or a subagent with no memory of writing them, and let the app's schema
validator (Finding 2) be the pass/fail gate rather than your own judgment.

**Lesson.** You can't be your own test oracle. Route verification through something —
or someone — that didn't write the thing under test.

## The pattern under the findings

All three are the same move: **substituting a statement for a control.** "This would be
redundant" instead of dedup. "The app should validate" instead of a schema. "It held"
instead of an independent run. The transferable habit to build: when you catch yourself
*asserting* a quality (non-redundant, valid, working), stop and ask what executable check
would make the assertion true — then build that instead of the sentence.
