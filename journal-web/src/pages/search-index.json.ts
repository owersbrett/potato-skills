import type { APIRoute } from 'astro';
import { getEntries, readingTime, formatDateShort } from '../lib/entries';

// Static JSON search index — title + through_line + diamonds + tags.
// The search island fetches this once and filters client-side.
export const GET: APIRoute = async () => {
  const entries = await getEntries();
  const index = entries.map((entry) => ({
    slug: entry.data.slug,
    title: entry.data.title,
    through_line: entry.data.through_line,
    diamonds: entry.data.diamonds,
    tags: entry.data.tags,
    flavor: entry.data.flavor,
    date: formatDateShort(entry.data.date),
    reading_time: readingTime(entry),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
