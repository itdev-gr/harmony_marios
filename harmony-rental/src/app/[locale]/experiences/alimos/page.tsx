import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AreaGuideSections } from "@/components/AreaGuideSections";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experiences/alimos">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences" });

  return {
    title: `${t("guide.alimos.metaTitle")} — Harmony Rental`,
    description: t("guide.alimos.lead"),
    alternates: languageAlternates("/experiences/alimos", locale),
  };
}

export default async function AlimosExperiencesPage({
  params,
}: PageProps<"/[locale]/experiences/alimos">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AreaGuideSections area="alimos" />;
}
