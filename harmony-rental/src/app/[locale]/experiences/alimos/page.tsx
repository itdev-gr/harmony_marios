import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AreaGuideSections } from "@/components/AreaGuideSections";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experiences/alimos">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences" });

  return {
    title: "Alimos guide — Harmony Rental",
    description: t("guide.alimos.lead"),
  };
}

export default async function AlimosExperiencesPage({
  params,
}: PageProps<"/[locale]/experiences/alimos">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AreaGuideSections area="alimos" />;
}
