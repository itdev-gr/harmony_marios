import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RenovationSections } from "@/components/RenovationSections";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/owners/renovation">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "owners.renovation" });

  return {
    title: "Apartment renovation — Harmony Rental",
    description: t("lead"),
  };
}

export default async function RenovationPage({
  params,
}: PageProps<"/[locale]/owners/renovation">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RenovationSections />;
}
