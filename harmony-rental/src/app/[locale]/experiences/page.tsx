import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperiencesSections } from "@/components/ExperiencesSections";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experiences">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences" });

  return {
    title: "Experiences — Harmony Rental",
    description: t("lead"),
  };
}

export default async function ExperiencesPage({
  params,
}: PageProps<"/[locale]/experiences">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExperiencesSections />;
}
