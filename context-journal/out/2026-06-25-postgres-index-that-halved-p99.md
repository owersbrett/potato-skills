---
title: "The Postgres index that halved our p99"
slug: "postgres-index-that-halved-p99"
date: "2026-06-25T14:30:00-07:00"
flavor: "pierogi"
audience: "world"
through_line: "A slow endpoint is rarely slow everywhere — ours was slow only for the users who mattered most, and the query plan said exactly why."
diamonds:
  - "Averages lie; p99 tells the truth. Our mean was fine while power users ate 2-second loads."
  - "`EXPLAIN (ANALYZE, BUFFERS)` on real production-shaped data is the whole game — a synthetic 100-row table hides the sequential scan."
  - "A partial index scoped to the hot predicate (`WHERE archived = false`) was 8x smaller and faster than the full-column index."
  - "Add the index concurrently in production; a plain CREATE INDEX takes an exclusive lock and will take the table down."
tags: ["postgres", "performance", "databases", "optimization"]
reading_time: 5
source:
  kind: "claude-session"
  summary: "Diagnosed and fixed a p99 latency regression on the activity-feed endpoint."
  duration: "~90m"
cover: null
---

## The hook

The dashboard felt fine to most people and unbearable to a few. That gap is the
interesting part: an endpoint that's uniformly slow is a capacity problem, but one
that's slow *only for your heaviest users* is almost always a query-plan problem.
Our activity feed was the latter — p50 of 80ms, p99 of 2.1s.

## What we were doing

We'd been staring at CPU graphs and connection-pool metrics, looking for a systemic
cause. Wrong altitude. The fix started the moment we stopped looking at aggregates
and ran the actual query against a table with a realistic row distribution.

## The diamonds

- **The average hid the victims.** Users with thousands of activity rows hit a code
  path the median user never touched. p99 is where they live.
- **The plan named the culprit.** `EXPLAIN (ANALYZE, BUFFERS)` showed a sequential
  scan over the full activity table, filtered down after the fact.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM activity
WHERE user_id = $1 AND archived = false
ORDER BY created_at DESC
LIMIT 50;
-- Seq Scan on activity ... rows removed by filter: 41982
```

- **A partial index beat a full one.** 95% of reads want unarchived rows, so:

```sql
CREATE INDEX CONCURRENTLY idx_activity_user_recent
  ON activity (user_id, created_at DESC)
  WHERE archived = false;
```

  Smaller index, fits in cache, and the planner switched to an index scan
  immediately.
- **`CONCURRENTLY` is not optional in prod.** A bare `CREATE INDEX` locks writes for
  the whole build. On a hot table that's an outage.

## Where it landed / open threads

p99 dropped from 2.1s to ~950ms after the index, and to ~600ms once we also stopped
selecting unused columns. Open thread: several other endpoints filter on the same
`archived = false` predicate — worth auditing them for the same partial-index win
before it becomes a pattern we rediscover every quarter.
