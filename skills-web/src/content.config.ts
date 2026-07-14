import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { resolve } from 'node:path';

// The skills ARE the content. The site scans the repo itself for SKILL.md
// files at build time, so adding a skill folder to the repo automatically
// adds it to the site. Web apps and build output are excluded.
const repoRoot = resolve(process.cwd(), '..');

const skills = defineCollection({
  loader: glob({
    pattern: [
      '**/SKILL.md',
      '!**/node_modules/**',
      '!**/dist/**',
      '!journal-web/**',
      '!skills-web/**',
    ],
    base: repoRoot,
  }),
  // Mirrors the SKILL.md frontmatter contract. A skill without a name or
  // description is malformed and should fail the build loudly.
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

export const collections = { skills };
