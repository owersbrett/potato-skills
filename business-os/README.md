# business-os

> A business is a small set of canonical documents. Compose them one at a
> time; snap them together when the stones align.

Eight skills, each composing one canonical business document with the founder
in the taste-owner seat — plus a master skill that assembles whatever exists
into a **business intranet**. Every stone ships as a standalone module: its
own document site (`npm run dev`, its own port), a machine-readable contract,
core database tables you can start filling on day one, and an out-of-the-box
MCP server so agents can work with it immediately.

The integrated system is deliberately bigger than one person. Absent stones
and empty tables render as an honest **ghost town** — the shape of the
company you haven't hired yet. That feeling is the onboarding funnel.

## The stones

| # | Skill | Document | Reads |
|---|-------|----------|-------|
| 1 | [`vision`](./vision) | Vision & Positioning | — |
| 2 | [`customer-blueprint`](./customer-blueprint) | Customer Blueprint | vision |
| 3 | [`potatuhs-design`](../potatuhs-design) | Brand Guidelines | vision, customer |
| 4 | [`messaging`](./messaging) | Messaging & Content | vision, customer, brand |
| 5 | [`business-model`](./business-model) | Business Model & Metrics | vision, customer |
| 6 | [`go-to-market`](./go-to-market) | Go-to-Market Playbook | messaging, model, customer |
| 7 | [`operations`](./operations) | Operating Manual | vision, model |
| 8 | [`technology`](./technology) | Technology & Architecture | vision, model, operations |
| ★ | [`intranet`](./intranet) | — the master site | all present stones |

## The contract

Everything shared lives in [`PROTOCOL.md`](./PROTOCOL.md): the `module.json`
manifest, workspace layout, port plan, the document-pair rule (Markdown SSOT
+ JSON projection), the core-tables and MCP conventions, the CLAUDE.md update
protocol, and the ghost-town thesis. Stones stay lean by citing it.

Start with `vision` — it's the root; every other document reads it. But any
stone works alone, and the intranet composes any subset. Partial assembly is
the normal case, and the point.
