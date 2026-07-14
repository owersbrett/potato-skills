import { getCollection, type CollectionEntry } from 'astro:content';

export type Entry = CollectionEntry<'entries'>;

/** Flavor metadata — the only place flavor colors/labels are defined. */
export const FLAVORS = {
  potato: { label: 'potato', note: 'self · raw' },
  tater: { label: 'tater', note: 'self · integrated' },
  pierogi: { label: 'pierogi', note: 'world · editorial' },
  fry: { label: 'fry', note: 'world · flashy' },
} as const;

export type Flavor = keyof typeof FLAVORS;

/** ~200 wpm, matching a comfortable technical-reading pace. */
export function readingTime(entry: Entry): number {
  if (entry.data.reading_time && entry.data.reading_time > 0) {
    return entry.data.reading_time;
  }
  const words = entry.body?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** All entries, newest first. */
export async function getEntries(): Promise<Entry[]> {
  const all = await getCollection('entries');
  return all.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

/** Every tag with its entry count, alphabetical. */
export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const entries = await getEntries();
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}
