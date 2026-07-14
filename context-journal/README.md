# context-journal

> Don't clear your session. **Journal it.**

A Claude skill family that turns the context of a working session into one
structured, beautiful blog entry — written, by default, for your *future self*.
It's a more advanced form of leaving yourself a note: instead of throwing away the
thinking when you close the tab, you extract the diamond. Scan past entries to get
back up to speed on everything you've been doing.

The skill writes plain Markdown files you own. A companion app
([`journal-web`](../journal-web)) renders them as a clean blog — but the skill works
standalone with zero setup.

## The flavors

Same engine, four registers. Pick by **who it's for** and **how produced** it is:

|  | **For yourself** | **For the world** |
|---|---|---|
| **Raw / fast** | 🥔 **potato** — OOTB. One Markdown entry to `out/`. Zero setup. The kernel. | 🍟 **fry** — flashy, punchy, shareable. The dopamine diamond, for a general audience. |
| **Produced** | 🫓 **tater** — integrates with the blog app: indexed, searchable, cross-linked. | 🥟 **pierogi** — editorial and brand-aligned. Mine conversations into personal-brand posts. |

`potato → tater` is the **recall** axis (notes-to-self → searchable knowledge base).
`pierogi → fry` is the **publish** axis (branded narrative → viral flash).

> "Potato" is just how this project names things — it's the label on the tin, not a
> theme. The entries and the app are clean and professional.

## How it fits together

- **The skill** (this directory) ingests session context → emits a contract-valid
  Markdown entry. Each flavor is self-contained in its own folder.
- **The contract** ([`CONTRACT.md`](./CONTRACT.md)) is the shared schema — the one
  source of truth both the skill and the app code against.
- **The app** ([`journal-web`](../journal-web)) is a separate Astro static site that
  renders entries as a blog. Optional; the skill never depends on it.
- **`out/`** is the default output directory. Override it per run (`--output <dir>`)
  to point entries anywhere you like.

## Quick start

Install a flavor (e.g. `potato/`) as a Claude skill, then in any session say
**"journal this"** as you'd otherwise clear it. You'll get one entry in `out/`.

## Status

- [x] `potato` — the kernel
- [ ] `tater` — live web-app integration
- [ ] `pierogi` — brand-audience editorial
- [ ] `fry` — flashy / shareable
- [ ] `journal-web` — the Astro renderer (spec'd; built separately)
