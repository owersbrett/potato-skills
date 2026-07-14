---
title: "Taming a flaky end-to-end suite"
slug: "taming-a-flaky-e2e-suite"
date: "2026-06-28T21:10:00-07:00"
flavor: "tater"
audience: "self"
through_line: "The flakiness wasn't the tests — it was three different sources of nondeterminism we'd been treating as one."
diamonds:
  - "Retries hide flakiness; they don't fix it. Quarantine-then-diagnose beats blanket retry counts."
  - "Our three real causes: unawaited network mocks, a shared DB row between parallel workers, and animations racing assertions."
  - "`await expect(locator).toBeVisible()` auto-retries; `expect(await locator.isVisible()).toBe(true)` does not — the second was half our failures."
  - "Freeze time and disable animations globally in the test harness, not per-test — one config change killed a whole class of races."
tags: ["testing", "playwright", "ci", "debugging"]
reading_time: 4
source:
  kind: "claude-session"
  summary: "Root-caused a Playwright suite that failed ~15% of CI runs and stabilized it to green."
  duration: "~2h"
cover: null
---

## The hook

Our end-to-end suite had become a coin flip. ~15% of CI runs went red, always on a
different test, always "passing locally." The team had started reflexively hitting
**Re-run** — which is how you know flakiness has already won. Today we stopped
re-running and actually read the failures.

## What we were doing

Instead of chasing one failing test, I pulled the last 200 CI runs and grouped the
failures. The pattern was the tell: it wasn't one flaky test, it was **three distinct
failure signatures** wearing the same "timeout waiting for element" costume.

## The diamonds

- **Retries are anesthesia, not surgery.** `retries: 2` had been masking the real
  rate for months. Turning retries off made the true signal legible.
- **Cause 1 — unawaited mocks.** A few `page.route()` handlers resolved a
  promise we never awaited, so assertions occasionally beat the mocked response.
- **Cause 2 — shared state across workers.** Parallel workers reused the same seed
  user row; whoever mutated it first broke the other. Namespacing seed data per
  worker fixed it.
- **Cause 3 — animations racing assertions.** Elements were "visible" to the DOM but
  mid-transition. `expect(locator).toBeVisible()` retries; the boolean form doesn't.

```ts
// Flaky: evaluates visibility exactly once
expect(await menu.isVisible()).toBe(true);

// Stable: retries until the condition holds or times out
await expect(menu).toBeVisible();
```

## Where it landed / open threads

Green for 40 consecutive runs after the three fixes plus a harness-level
`prefers-reduced-motion` + frozen clock. Open thread: add a nightly job that runs the
suite 20× to catch regressions before they reach PR CI. Also want a lint rule banning
the `await ... isVisible()` boolean pattern outright.
