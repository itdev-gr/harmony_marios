import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuestInfoSections } from "@/components/GuestInfoSections";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/guest-info">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guestInfo" });

  return {
    title: `${t("metaTitle")} — Harmony Rental`,
    description: t("lead"),
    alternates: languageAlternates("/guest-info", locale),
  };
}

export default async function GuestInfoPage({ params }: PageProps<"/[locale]/guest-info">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GuestInfoSections />;
}
