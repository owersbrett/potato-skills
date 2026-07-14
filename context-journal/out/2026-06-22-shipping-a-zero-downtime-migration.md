---
title: "Shipping a zero-downtime column rename"
slug: "shipping-a-zero-downtime-migration"
date: "2026-06-22T11:00:00-07:00"
flavor: "fry"
audience: "world"
through_line: "You can't rename a column live — but you can make the rename invisible by never doing it as one step."
diamonds:
  - "There is no safe atomic rename under load. The safe move is the expand/contract dance: add, dual-write, backfill, switch reads, drop."
  - "Deploy the code that tolerates BOTH shapes before you touch the schema. The database is never the first thing to change."
  - "Backfill in batches with a sleep between them — one giant UPDATE holds locks and bloats WAL until something pages."
  - "The 'contract' step (dropping the old column) is a separate deploy days later, after you're sure nothing reads it."
tags: ["migrations", "postgres", "deployment", "zero-downtime"]
reading_time: 4
source:
  kind: "claude-session"
  summary: "Planned and executed a live rename of a heavily-read column with no maintenance window."
  duration: "~1h planning, 3 deploys"
cover: null
---

## The hook

"Can we just rename `full_name` to `display_name`?" Sure — if you enjoy a 30-second
outage the instant the migration lands and every running app instance starts querying
a column that no longer exists. The trick to a zero-downtime rename is refusing to
treat it as a rename at all.

## What we were doing

Mapping out an **expand/contract** migration — the pattern that lets schema and code
change independently, each tolerant of the other, so no single deploy is a cliff.
The column had ~40M rows and was read on nearly every request, so a naive approach
was off the table.

## The diamonds

- **Expand first.** Add the new column, nullable, no default. Cheap and instant.

```sql
ALTER TABLE users ADD COLUMN display_name text;
```

- **Dual-write from the app.** Ship code that writes both columns and still reads the
  old one. Now new rows are correct and nothing has broken.
- **Backfill in batches.** Never one statement — chunk it so locks and WAL stay sane.

```sql
UPDATE users SET display_name = full_name
WHERE id BETWEEN $1 AND $2 AND display_name IS NULL;
-- loop the range, sleep ~100ms between batches
```

- **Flip reads, then contract.** Once backfill is verified complete, deploy code that
  reads `display_name`. Days later — after you're certain nothing references the old
  column — drop it in a final, boring migration.

## Where it landed / open threads

Three deploys over four days, zero downtime, zero user-visible blips. The whole thing
felt anticlimactic, which is the point — a good migration is one nobody notices. Open
thread: this pattern is mechanical enough to template. Next time I want a checklist
generator that takes `(table, old, new)` and emits the five migration files.
