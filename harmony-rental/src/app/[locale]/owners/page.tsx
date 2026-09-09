import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OwnersSections } from "@/components/OwnersSections";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/owners">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "owners" });

  return {
    title: `${t("metaTitle")} — Harmony Rental`,
    description: t("lead"),
    alternates: languageAlternates("/owners", locale),
  };
}

export default async function OwnersPage({ params }: PageProps<"/[locale]/owners">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OwnersSections />;
}
