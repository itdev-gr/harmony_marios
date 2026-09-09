import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { OwnersSections } from "@/components/OwnersSections";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/owners">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "owners" });

  return {
    title: "For owners — Harmony Rental",
    description: t("lead"),
  };
}

export default async function OwnersPage({ params }: PageProps<"/[locale]/owners">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OwnersSections />;
}
