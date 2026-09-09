import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AreaGuideSections } from "@/components/AreaGuideSections";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experiences/athens">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences" });

  return {
    title: `${t("guide.athens.metaTitle")} — Harmony Rental`,
    description: t("guide.athens.lead"),
    alternates: languageAlternates("/experiences/athens", locale),
  };
}

export default async function AthensExperiencesPage({
  params,
}: PageProps<"/[locale]/experiences/athens">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AreaGuideSections area="athens" />;
}
