import type { ReactNode } from "react";
import { useTranslations, useFormatter } from "next-intl";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import type { JournalPost } from "@/lib/journal";
import { CtaBand } from "./CtaBand";

/** Wraps every rendered table in a bordered, horizontally-scrollable plate —
 *  the neighborhood and cost-breakdown tables run wider than the ~65ch
 *  reading column on small screens. */
const markdownComponents: Components = {
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-xl border border-line">
      <table>{children}</table>
    </div>
  ),
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
 * One article on the journal index — Carento's blog card language: white
 * rounded-2xl plate, category pill + date, title, excerpt (the post's meta
 * description doubles as the card excerpt), and a "Read more" pill link.
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

/** `/journal` — hero + card grid of every post, newest first. */
export function JournalIndex({ posts }: { posts: JournalPost[] }) {
  const t = useTranslations("journal");

  return (
    <>
      <section aria-labelledby="journal-title" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-20 md:pt-20 md:pb-24">
          <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
            {t("eyebrow")}
          </p>
          <h1
            id="journal-title"
            className="mt-4 max-w-3xl font-display text-4xl leading-tight font-extrabold tracking-tight text-balance text-neutral-950 md:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {t("lead")}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand id="journal-cta" />
    </>
  );
}

/** `/journal/[slug]` — a comfortable ~65ch reading column: brand-tint
 *  category eyebrow, title, date + author line, then the markdown body. */
export function JournalArticle({ post }: { post: JournalPost }): ReactNode {
  const t = useTranslations("journal");
  const tCategories = useTranslations("journal.categories");
  const format = useFormatter();

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

          <header className="mx-auto mt-8 max-w-[65ch]">
            <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
              {tCategories(post.category)}
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight font-extrabold tracking-tight text-balance text-neutral-950 md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm font-medium text-neutral-500">
              {format.dateTime(new Date(post.date), { dateStyle: "long" })} · {t("author")}
            </p>
          </header>

          <div className="journal-prose mx-auto mt-10 max-w-[65ch]">
            <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.body}
            </Markdown>
          </div>
        </div>
      </article>

      <CtaBand id="journal-post-cta" />
    </>
  );
}
