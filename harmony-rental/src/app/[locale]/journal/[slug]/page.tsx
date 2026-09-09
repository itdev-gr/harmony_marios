import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPosts, getPost } from "@/lib/journal";
import { JournalArticle } from "@/components/JournalSections";
import { languageAlternates } from "@/lib/seo";

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

export default async function JournalPostPage({
  params,
}: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  setRequestLocale(locale);

  return <JournalArticle post={post} />;
}
