import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AreaGuideSections } from "@/components/AreaGuideSections";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experiences/athens">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences" });

  return {
    title: "Athens guide — Harmony Rental",
    description: t("guide.athens.lead"),
  };
}

export default async function AthensExperiencesPage({
  params,
}: PageProps<"/[locale]/experiences/athens">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AreaGuideSections area="athens" />;
}
