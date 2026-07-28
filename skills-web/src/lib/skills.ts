import { getCollection, type CollectionEntry } from 'astro:content';

export type Skill = CollectionEntry<'skills'>;

/** The GitHub repo every install command points at. */
export const REPO = 'owersbrett/potato-skills';
export const REPO_URL = `https://github.com/${REPO}`;

/** The one-liner shown in the hero, before a specific skill is chosen. */
export const INSTALL_BASE = `npx skills add ${REPO}`;

/**
 * Family metadata — topic tags and a one-line note per skill family
 * (a family = a top-level folder in the repo). New families without an
 * entry here still render; they just get the fallback topic.
 */
export const FAMILIES: Record<string, { topic: string; note: string }> = {
  'context-journal': {
    topic: 'Agent workflows',
    note: "Don't clear your session — journal it.",
  },
  'brand-guidelines': {
    topic: 'Design & branding',
    note: 'Compose a complete brand-guidelines website, together.',
  },
  'business-os': {
    topic: 'Business OS',
    note: 'The eight canonical documents of a business, composed as connectable modules.',
  },
};

const FALLBACK_TOPIC = 'Skills';

/** Folder path of a skill relative to the repo root, e.g. "context-journal/potato". */
export function skillDir(skill: Skill): string {
  // Glob ids look like "context-journal/potato/skill" — drop the file segment.
  return skill.id.split('/').slice(0, -1).join('/');
}

/** The family is the top-level folder a skill lives in. */
export function family(skill: Skill): string {
  return skill.id.split('/')[0] ?? skill.data.name;
}

export function topic(skill: Skill): string {
  return FAMILIES[family(skill)]?.topic ?? FALLBACK_TOPIC;
}

export function sourceUrl(skill: Skill): string {
  return `${REPO_URL}/tree/main/${skillDir(skill)}`;
}

export function installCommand(skill: Skill): string {
  return `${INSTALL_BASE} --skill ${skill.data.name}`;
}

export function skillUrl(skill: Skill): string {
  return `/skills/${skill.data.name}`;
}

/** All skills, alphabetical by name — the directory order. */
export async function allSkills(): Promise<Skill[]> {
  const skills = await getCollection('skills');
  return skills.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/** Other skills in the same family — the "related skills" grid. */
export function related(skill: Skill, all: Skill[]): Skill[] {
  return all.filter((s) => s.id !== skill.id && family(s) === family(skill));
}
