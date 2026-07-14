import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { resolve } from 'node:path';

// The entries live outside the app. Point the renderer at them with
// JOURNAL_CONTENT_DIR (absolute, or relative to the project root).
const contentDir = resolve(
  process.cwd(),
  process.env.JOURNAL_CONTENT_DIR ?? '../context-journal/out',
);

// Zod schema mirroring the entry contract. This is a content *contract*, not
// user input — a malformed entry should fail the build loudly.
const flavor = z.enum(['potato', 'tater', 'pierogi', 'fry']);
const audience = z.enum(['self', 'world']);

const entries = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: contentDir }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string().datetime({ offset: true }),
    flavor,
    audience,
    through_line: z.string(),
    diamonds: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
    reading_time: z.number().optional(),
    source: z
      .object({
        kind: z.enum(['claude-session', 'manual', 'other']),
        summary: z.string(),
        duration: z.string().optional(),
      })
      .optional(),
    cover: z.string().nullable().optional(),
  }),
});

export const collections = { entries };
