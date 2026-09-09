import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RenovationSections } from "@/components/RenovationSections";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/owners/renovation">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "owners.renovation" });

  return {
    title: `${t("metaTitle")} — Harmony Rental`,
    description: t("lead"),
    alternates: languageAlternates("/owners/renovation", locale),
  };
}

export default async function RenovationPage({
  params,
}: PageProps<"/[locale]/owners/renovation">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RenovationSections />;
}
