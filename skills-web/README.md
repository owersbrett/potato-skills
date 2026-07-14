# skills-web

The potato-skills directory site — a [skills.sh](https://www.skills.sh/)-format
index of every skill in this repo, in Potatuhs colors. Deployed to
**skills.potatuhs.com**.

## How it works

The skills ARE the content. At build time the site scans the repo root for
`*/SKILL.md` files (any depth, excluding the web apps) and renders:

- **`/`** — the directory: searchable list of every skill, install one-liner.
- **`/skills/<name>`** — detail page: install command, rendered SKILL.md,
  source link, related skills from the same family.
- **`/about`** — what the project is.

Add a skill folder with a valid `SKILL.md` (frontmatter: `name`,
`description`) anywhere in the repo and it appears on the site at the next
build. A SKILL.md missing either field fails the build loudly — that's the
contract.

## Commands

```sh
npm install
npm run dev      # dev server on http://localhost:4330
npm run build    # static build to dist/
npm run preview  # preview the build on http://localhost:4330
```

## Deploying

Plain static output — point any static host at `dist/` with the domain
`skills.potatuhs.com`. The site URL is set in `astro.config.mjs`.
