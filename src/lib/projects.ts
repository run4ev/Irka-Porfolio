import { getCollection } from 'astro:content';

/** Published projects sorted by their [NN] number. Drafts are visible in `astro dev` only. */
export async function getProjects() {
  const projects = await getCollection(
    'projects',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return projects.sort((a, b) => a.data.number.localeCompare(b.data.number));
}

/** 3 → "03", for [NN] labels */
export const nn = (n: number) => String(n).padStart(2, '0');

/** Anchor of a case-study section: "Print" → "print" */
export const sectionId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
