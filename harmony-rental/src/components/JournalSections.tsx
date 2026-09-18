import { Children, type ReactNode } from "react";
import { useTranslations, useFormatter } from "next-intl";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import {
  slugify,
  splitFaq,
  getHeadings,
  getReadingMinutes,
  type Heading,
  type JournalPost,
} from "@/lib/journal";
import { PageHero } from "./PageHero";
import { CtaBand } from "./CtaBand";

/** How many section titles a guide card previews before it says "+N more". */
const PREVIEW_SECTIONS = 3;

/** Flattens a rendered heading's children back to plain text, so the `id` can
 *  be slugified from the same string the table of contents was built from. */
function headingText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) =>
      typeof child === "string" || typeof child === "number"
        ? String(child)
        : typeof child === "object" && child !== null && "props" in child
          ? headingText((child.props as { children?: ReactNode }).children)
          : "",
    )
    .join("");
}

/**
 * Tables get a bordered, horizontally-scrollable plate — the neighborhood and
 * cost-breakdown tables run wider than the ~65ch reading column on small
 * screens.
 *
 * Headings get anchor ids so the table of contents has somewhere to land.
 * They must come from `slugify`, the same function `getHeadings` uses; see the
 * note on it in src/lib/journal.ts.
 */
const markdownComponents: Components = {
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line">
      <table>{children}</table>
    </div>
  ),
  h2: ({ children }) => <h2 id={slugify(headingText(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugify(headingText(children))}>{children}</h3>,
};

function CategoryPill({ category }: { category: string }) {
  const t = useTranslations("journal.categories");
  return (
    <span className="w-fit rounded-full bg-pastel-green px-4 py-1 font-display text-xs font-bold tracking-wide text-brand-tint uppercase">
      {t(category)}
    </span>
  );
}

/**
 * One article on the home page teaser — category pill + date, title, excerpt
 * and a "Read more" pill link.
 *
 * Kept deliberately separate from `GuideCard` below: the teaser wants a
 * compact, familiar blog card, while the journal index wants to show what is
 * inside each guide. `tests/home.test.tsx` also asserts the "Read more" label
 * appears here.
 */
export function JournalCard({ post }: { post: JournalPost }) {
  const t = useTranslations("journal");
  const format = useFormatter();

  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card md:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <CategoryPill category={post.category} />
        <span className="text-sm font-medium text-neutral-500">
          {format.dateTime(new Date(post.date), { dateStyle: "long" })}
        </span>
      </div>

      <h3 className="font-display text-xl leading-snug font-bold tracking-tight text-neutral-950">
        {post.title}
      </h3>

      <p className="text-sm leading-relaxed text-neutral-500">{post.description}</p>

      <div className="mt-auto flex items-center justify-end border-t border-line pt-5">
        <Link
          href={`/journal/${post.slug}`}
          className="btn-outline btn-sm after:absolute after:inset-0"
        >
          {t("readMore")}
          <span className="sr-only"> — {post.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

/**
 * One guide on the journal index.
 *
 * All four posts share a publish date and a category, so a date and a category
 * pill would just repeat themselves four times. What actually distinguishes
 * one guide from another is what it covers — so the card previews its section
 * headings instead, and the reading time tells you what you're committing to.
 */
function GuideCard({ post }: { post: JournalPost }) {
  const t = useTranslations("journal");
  const sections = getHeadings(post.body).filter((heading) => heading.level === 2);
  const preview = sections.slice(0, PREVIEW_SECTIONS);
  const remaining = sections.length - preview.length;

  return (
    <article className="group relative flex flex-col rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card md:p-8">
      <h2 className="font-display text-xl leading-snug font-bold tracking-tight text-neutral-950 md:text-2xl">
        {post.title}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-neutral-500">{post.description}</p>

      {preview.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-6 text-sm font-medium text-neutral-700">
          {preview.map((section) => (
            <li key={section.id} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
              <span className="line-clamp-1">{section.text}</span>
            </li>
          ))}
          {remaining > 0 && (
            <li className="pl-[18px] text-neutral-400">
              {t("moreSections", { count: remaining })}
            </li>
          )}
        </ul>
      )}

      <div className="mt-6 flex items-center justify-between gap-4 pt-1">
        <span className="text-sm font-medium text-neutral-400">
          {t("readingTime", { minutes: getReadingMinutes(post.body) })}
        </span>
        <Link
          href={`/journal/${post.slug}`}
          className="inline-flex items-center gap-2 font-display text-sm font-bold text-brand-tint transition after:absolute after:inset-0 hover:gap-3 hover:text-link-hover"
        >
          {t("readMore")}
          <span className="sr-only"> — {post.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

/** `/journal` — hero + the guide library, two up. */
export function JournalIndex({ posts }: { posts: JournalPost[] }) {
  const t = useTranslations("journal");

  return (
    <>
      <PageHero id="journal" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <section aria-label={t("title")} className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
          {/* Two columns, not three: there are four guides, and a 3-up grid
              leaves one stranded on its own row. */}
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <GuideCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand id="journal-cta" />
    </>
  );
}

/**
 * The guide's sections, as links.
 *
 * Only `##` headings: the posts carry up to thirteen `###`s, which is a wall
 * rather than a way to navigate.
 */
function TocLinks({ headings }: { headings: Heading[] }) {
  return (
    <ul className="flex flex-col gap-3 text-sm">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className="font-medium text-neutral-500 transition hover:text-brand-tint"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** The other guides, so the end of an article isn't a dead end. */
function RelatedGuides({ posts }: { posts: JournalPost[] }) {
  const t = useTranslations("journal");

  return (
    <section aria-labelledby="journal-related-title" className="bg-pastel-cream">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <h2
          id="journal-related-title"
          className="font-display text-3xl leading-tight font-bold tracking-tight text-neutral-950 md:text-4xl"
        >
          {t("related")}
        </h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="h-full">
              <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card">
                <h3 className="font-display text-lg leading-snug font-bold tracking-tight text-neutral-950">
                  {post.title}
                </h3>
                <p className="mt-auto pt-5 text-sm font-medium text-neutral-400">
                  {t("readingTime", { minutes: getReadingMinutes(post.body) })}
                </p>
                <Link
                  href={`/journal/${post.slug}`}
                  className="mt-3 inline-flex items-center gap-2 font-display text-sm font-bold text-brand-tint transition after:absolute after:inset-0 hover:gap-3 hover:text-link-hover"
                >
                  {t("readMore")}
                  <span className="sr-only"> — {post.title}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * `/journal/[slug]` — a ~65ch reading column with the guide's sections beside
 * it, sticky, on wide screens.
 *
 * Each post closes with a "Frequently Asked Questions" heading and four
 * questions. That block is lifted onto its own tinted plate so it reads as
 * reference rather than more prose — and, separated, it can also be published
 * as FAQ structured data by the route. A post without that heading simply
 * renders whole.
 */
export function JournalArticle({
  post,
  related,
}: {
  post: JournalPost;
  related: JournalPost[];
}): ReactNode {
  const t = useTranslations("journal");
  const format = useFormatter();

  const headings = getHeadings(post.body).filter((heading) => heading.level === 2);
  const { body, faq } = splitFaq(post.body);

  return (
    <>
      <article className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 pt-10 pb-20 md:pt-14 md:pb-24">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-display text-sm font-bold text-neutral-500 transition hover:text-link-hover"
          >
            <span aria-hidden="true">←</span>
            {t("backToAll")}
          </Link>

          <header className="mt-8 max-w-[65ch]">
            <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight text-balance text-neutral-950 md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-neutral-500">
              <span>{t("readingTime", { minutes: getReadingMinutes(post.body) })}</span>
              <span>{format.dateTime(new Date(post.date), { dateStyle: "long" })}</span>
              <span>{t("author")}</span>
            </div>
          </header>

          <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-14">
            {headings.length > 0 && (
              <nav
                aria-labelledby="journal-toc-title"
                className="lg:order-2 lg:w-60 lg:shrink-0"
              >
                {/* A native disclosure: no JavaScript, keyboard-operable, and
                    it animates nothing, so reduced-motion needs no handling.
                    Open by default — the list is four to six short links, so
                    it costs little on a phone and saves a tap. On lg the
                    marker is hidden and the summary reads as a heading. */}
                <details
                  open
                  className="journal-toc rounded-2xl border border-line bg-pastel-cream p-5 lg:sticky lg:top-24"
                >
                  <summary
                    id="journal-toc-title"
                    className="cursor-pointer font-display text-sm font-bold tracking-tight text-neutral-950 lg:cursor-default"
                  >
                    {t("inThisGuide")}
                  </summary>
                  <div className="mt-4">
                    <TocLinks headings={headings} />
                  </div>
                </details>
              </nav>
            )}

            <div className="journal-prose min-w-0 max-w-[65ch] lg:order-1 lg:flex-1">
              <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {body}
              </Markdown>

              {faq && (
                <div className="journal-faq mt-14 rounded-2xl border border-line bg-pastel-cream p-7 md:p-8">
                  <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                    {faq}
                  </Markdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && <RelatedGuides posts={related} />}

      <CtaBand id="journal-post-cta" />
    </>
  );
}
