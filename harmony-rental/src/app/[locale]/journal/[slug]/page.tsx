import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPosts, getPost, getFaq, type JournalPost } from "@/lib/journal";
import { JournalArticle } from "@/components/JournalSections";
import { BASE_URL, localizedUrl, languageAlternates } from "@/lib/seo";

/** How many other guides to offer at the foot of an article. */
const RELATED_COUNT = 3;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/journal/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Harmony Rental`,
    description: post.description,
    alternates: languageAlternates(`/journal/${slug}`, locale),
  };
}

/**
 * `Article` plus, when the post ends in a questions section, `FAQPage`.
 *
 * The four Q&As every guide closes with are already exactly what `FAQPage`
 * describes, so publishing them costs nothing and earns the expandable
 * answers in search results. Emitted as two graph nodes rather than two
 * script tags, which is what Google's own examples do for a page that is
 * both.
 */
function articleJsonLd(post: JournalPost, locale: string): string {
  const url = localizedUrl(locale, `/journal/${post.slug}`);
  const faq = getFaq(post.body);

  const article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Harmony Rental", url: BASE_URL },
    publisher: { "@type": "Organization", name: "Harmony Rental", url: BASE_URL },
  };

  const faqPage =
    faq.length > 0
      ? [
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: faq.map((entry) => ({
              "@type": "Question",
              name: entry.question,
              acceptedAnswer: { "@type": "Answer", text: entry.answer },
            })),
          },
        ]
      : [];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [article, ...faqPage],
  });
}

export default async function JournalPostPage({
  params,
}: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  setRequestLocale(locale);

  const related = getPosts()
    .filter((other) => other.slug !== post.slug)
    .slice(0, RELATED_COUNT);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleJsonLd(post, locale) }}
      />
      <JournalArticle post={post} related={related} />
    </>
  );
}
