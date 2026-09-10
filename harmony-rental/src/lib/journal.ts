import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO `yyyy-mm-dd`, always `2025-10-06` for the migrated legacy posts. */
  date: string;
  category: string;
  /** Markdown body (headings, tables, lists) — render with react-markdown. */
  body: string;
};

// Resolved relative to this file rather than `process.cwd()` so it works
// the same from `next build`/`next dev` and from Vitest, regardless of
// which directory each happens to be invoked from.
const CONTENT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "../content/journal");

function readPost(slug: string): JournalPost {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);

  for (const field of ["title", "description", "date"] as const) {
    if (!data[field] || String(data[field]).trim() === "") {
      throw new Error(`journal: ${slug}.mdx is missing frontmatter field "${field}"`);
    }
  }

  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: String(data.category ?? ""),
    body: content.trim(),
  };
}

let cache: JournalPost[] | null = null;

/**
 * Every journal post, newest first. All four legacy posts share the same
 * publish date, so ties break alphabetically by title for a stable order.
 */
export function getPosts(): JournalPost[] {
  if (!cache) {
    const slugs = fs
      .readdirSync(CONTENT_DIR)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));

    cache = slugs
      .map(readPost)
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  }

  return cache;
}

export function getPost(slug: string): JournalPost | undefined {
  return getPosts().find((post) => post.slug === slug);
}
