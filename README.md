# potato-skills

Open-source [Claude](https://claude.com/claude-code) skills for running a business —
one repo, a small set of primary skills, and the sites that render them.

Each skill is a self-contained folder with a `SKILL.md`. Skills favor a clean
contract between the skill and any external system it integrates with, so the two
can evolve independently.

> The "potato" naming is just the house style — it's how this project labels things,
> not a theme baked into what the skills produce.

## The primary skills

The skills form a path — each one composes a canonical piece of a business, in the
order you'd actually build it:

| # | Skill | Folder | What it composes |
|---|-------|--------|------------------|
| 1 | **Brand guidelines** | [`brand-guidelines`](./brand-guidelines) | A complete, token-first brand-guidelines website, built through a guided interview. |
| 2 | **Ideal customer profile** | [`business-os/customer-blueprint`](./business-os/customer-blueprint) | Who the business serves — the customer blueprint document. |
| 3 | **Go-to-market strategy** | [`business-os/go-to-market`](./business-os/go-to-market) | How the business reaches those customers. |
| 4 | **Business operating system** | [`business-os`](./business-os) | The full document set — vision, messaging, business model, operations, technology — assembled by the master [`intranet`](./business-os/intranet) skill into a business intranet. |
| 5 | **Blog** | [`context-journal`](./context-journal) | Don't clear your session — journal it. Working sessions become structured blog entries, rendered by [`journal-web`](./journal-web). |

## Skill families

Some primary skills are families of smaller ones:

- **[business-os](./business-os)** — a business is a small set of canonical
  documents. Eight module skills each compose one (vision, customer blueprint,
  messaging, business model, go-to-market, operations, technology), and the master
  `intranet` skill assembles whatever exists into an intranet — with an honest
  ghost town for everything that doesn't. The shared contract is
  [`PROTOCOL.md`](./business-os/PROTOCOL.md).
- **[context-journal](./context-journal)** — four flavors (`potato` / `tater` /
  `pierogi` / `fry`) over one shared entry contract
  ([`CONTRACT.md`](./context-journal/CONTRACT.md)).
- **[brand-guidelines](./brand-guidelines)** — a single skill, extracted from a real
  production brand system.

## The sites

- **[skills.potatocore.com](https://skills.potatocore.com)** — the directory
  site. At build time it scans a checkout of this repo for `SKILL.md` files
  and renders an index with install one-liners and per-skill detail pages.
  Add a skill folder to this repo and it appears on the site at the next
  build — the repo layout *is* the site content. (The site app itself is
  deployed separately and is not part of this repo.)
- **[journal-web](./journal-web)** — a clean Astro blog that renders
  context-journal entries.

## Repo layout

Everything lives in this one repo on purpose:

- **The directory site indexes by scanning.** skills.potatocore.com discovers
  skills from this repo tree at build time. One repo means the directory site,
  the install commands, and the skills can never drift apart.
- **Skills share contracts.** business-os modules share `PROTOCOL.md`;
  context-journal flavors share `CONTRACT.md`. Splitting into per-skill repos
  would turn those contracts into cross-repo dependencies.
- **One install convention.** Every skill installs the same way, from the same
  place, shown on its skills.potatocore.com page.

## Examples

Worked outputs of the skills live in a top-level `examples/` directory — one
complete run per skill (a finished brand site, a filled-in customer blueprint,
a real journal). The directory is gitignored on purpose: each example is its
own git project, born from actually running the skill, and the ones that come
out well get pulled out and published as downloads rather than committed here.

## License

[Apache 2.0](./LICENSE)
