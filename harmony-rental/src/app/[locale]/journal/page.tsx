import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPosts } from "@/lib/journal";
import { JournalIndex } from "@/components/JournalSections";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/journal">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "journal" });

  return {
    title: `${t("title")} — Harmony Rental`,
    description: t("lead"),
    alternates: languageAlternates("/journal", locale),
  };
}

export default async function JournalPage({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <JournalIndex posts={getPosts()} />;
}
