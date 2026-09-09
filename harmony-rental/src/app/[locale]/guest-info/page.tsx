import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuestInfoSections } from "@/components/GuestInfoSections";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/guest-info">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guestInfo" });

  return {
    title: "Guest information — Harmony Rental",
    description: t("lead"),
  };
}

export default async function GuestInfoPage({ params }: PageProps<"/[locale]/guest-info">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GuestInfoSections />;
}
