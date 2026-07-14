# potato-skills

Open-source [Claude](https://claude.com/claude-code) skills.

Each skill is a self-contained folder with a `SKILL.md`. Skills here favor a clean
contract between the skill and any external system it integrates with, so the two
can evolve independently.

> The "potato" naming is just the house style — it's how this project labels things,
> not a theme baked into what the skills produce.

## Skills

### [context-journal](./context-journal)

Don't clear your session — journal it. Turns the context of a working session into a
structured blog entry for your future self (a recall hook), or for an audience.
Four flavors (`potato` / `tater` / `pierogi` / `fry`) over one shared entry
contract. Ships with [`journal-web`](./journal-web), a clean Astro blog that renders
the entries.

### [business-os](./business-os)

A business is a small set of canonical documents. Eight skills each compose one —
vision, customer blueprint, brand, messaging, business model, go-to-market,
operations, technology — as standalone modules (document site + machine contract +
core tables + MCP server), and a master `intranet` skill assembles whatever exists
into a business intranet with an honest ghost town for everything that doesn't.
The shared contract lives in [`PROTOCOL.md`](./business-os/PROTOCOL.md).

### [potatuhs-design](./potatuhs-design)

Compose a complete brand-guidelines website, together. A guided interview through
every component of a brand system — logo system, color, typography, iconography,
components, motion, layout, voice — that generates a token-first, print-ready,
single-page-scroll guidelines site backed by a `DESIGN.md` spec. Extracted from a
real production brand system.

## License

[Apache 2.0](./LICENSE)
