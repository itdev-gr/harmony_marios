import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperiencesSections } from "@/components/ExperiencesSections";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experiences">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences" });

  return {
    title: `${t("metaTitle")} — Harmony Rental`,
    description: t("lead"),
    alternates: languageAlternates("/experiences", locale),
  };
}

export default async function ExperiencesPage({
  params,
}: PageProps<"/[locale]/experiences">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExperiencesSections />;
}
