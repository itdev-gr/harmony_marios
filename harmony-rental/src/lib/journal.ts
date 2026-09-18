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

/** A section heading lifted out of a post body, for tables of contents. */
export type Heading = {
  level: 2 | 3;
  text: string;
  /** Anchor target — matches the `id` the renderer puts on the heading. */
  id: string;
};

/**
 * Heading text -> URL fragment.
 *
 * This is the single source of truth for anchor ids: `getHeadings` uses it to
 * build table-of-contents links, and the markdown renderer uses it to stamp
 * `id`s onto the headings themselves. If the two ever computed slugs
 * differently, every table-of-contents link would silently scroll nowhere,
 * so both sides must keep calling this one function.
 *
 * Handles the Greek text of a translated post as well as English: accents are
 * stripped via NFD so "Γειτονιές" and "Γειτονίες" don't collide with each
 * other by accident, and any run of non-alphanumerics collapses to a hyphen.
 */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    // Apostrophes vanish rather than becoming separators, so "A Renter's
    // Playbook" slugs as "a-renters-playbook", not "a-renter-s-playbook".
    .replace(/['’]/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * The `##`/`###` headings of a post body, in document order.
 *
 * Deliberately a line scan rather than a markdown parse: the bodies are
 * trusted, hand-written files with plain ATX headings, and this runs during
 * render on every post card. Fenced code blocks are skipped so a `#` comment
 * inside one is never mistaken for a heading — none of the current posts
 * contain code, but the guard costs nothing and the next one might.
 *
 * Duplicate headings within a post get `-2`, `-3`… suffixes so every id stays
 * unique and each table-of-contents link lands somewhere distinct.
 */
export function getHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    // Strip the inline markdown a heading might carry (**bold**, `code`,
    // [links](…)) so the table of contents reads as plain text.
    const text = match[2]
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    if (!text) continue;

    const base = slugify(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);

    headings.push({
      level: match[1].length as 2 | 3,
      text,
      id: count === 1 ? base : `${base}-${count}`,
    });
  }

  return headings;
}

/** The anchor every post's closing questions section slugs to. */
export const FAQ_ID = "frequently-asked-questions";

/**
 * Splits a body at its "Frequently Asked Questions" heading.
 *
 * Every migrated post ends with that section, and it earns its own treatment:
 * a tinted plate on the page, and `FAQPage` structured data in the route. Both
 * of those need to know where the section starts, so the split lives here
 * rather than in either consumer.
 *
 * A body without that heading comes back whole, with `faq: null` — a future
 * post that doesn't end in questions still renders.
 */
export function splitFaq(body: string): { body: string; faq: string | null } {
  const lines = body.split("\n");
  const index = lines.findIndex(
    (line) => /^##\s+/.test(line) && slugify(line.replace(/^##\s+/, "").trim()) === FAQ_ID,
  );

  if (index === -1) return { body, faq: null };

  return {
    body: lines.slice(0, index).join("\n").trimEnd(),
    faq: lines.slice(index).join("\n").trim(),
  };
}

/**
 * The post's closing questions as question/answer pairs, for `FAQPage`
 * structured data. Each `###` inside the questions section is a question and
 * the prose under it is the answer; an empty array means the post has no such
 * section.
 */
export function getFaq(body: string): { question: string; answer: string }[] {
  const { faq } = splitFaq(body);
  if (!faq) return [];

  const entries: { question: string; answer: string }[] = [];
  let current: { question: string; answer: string[] } | null = null;

  // Skip the "## Frequently Asked Questions" line itself.
  for (const line of faq.split("\n").slice(1)) {
    const heading = /^###\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) {
      if (current) entries.push({ question: current.question, answer: current.answer.join(" ") });
      current = { question: heading[1].replace(/[*_`]/g, "").trim(), answer: [] };
      continue;
    }
    if (current && line.trim()) current.answer.push(line.trim());
  }

  if (current) entries.push({ question: current.question, answer: current.answer.join(" ") });

  return entries.filter((entry) => entry.question && entry.answer);
}

/** Words per minute used for the reading estimate — the usual prose figure. */
const WORDS_PER_MINUTE = 200;

/**
 * Rough reading time in whole minutes, never less than 1.
 *
 * Markdown punctuation, table pipes and heading hashes are dropped first so a
 * post heavy on tables isn't credited with hundreds of imaginary words.
 */
export function getReadingMinutes(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#|>*_`~\-]+/g, " ")
    .split(/\s+/)
    .filter((word) => /[\p{Letter}\p{Number}]/u.test(word));

  return Math.max(1, Math.round(words.length / WORDS_PER_MINUTE));
}

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
