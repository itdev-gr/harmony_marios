import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ApartmentsList } from "@/components/ApartmentsList";
import { languageAlternates } from "@/lib/seo";

/** `?guests=2&guests=4` (hand-edited URLs) — take the first value. */
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/apartments">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "apartments" });

  return {
    title: `${t("title")} — Harmony Rental`,
    description: t("lead"),
    alternates: languageAlternates("/apartments", locale),
  };
}

export default async function ApartmentsPage({
  params,
  searchParams,
}: PageProps<"/[locale]/apartments">) {
  const { locale } = await params;
  setRequestLocale(locale);

  // `from`/`to` do not filter anything yet — there is no availability data —
  // but they ride along to the detail page so the inquiry form can pre-fill.
  const query = await searchParams;

  return (
    <ApartmentsList
      area={first(query.area)}
      guests={first(query.guests)}
      from={first(query.from)}
      to={first(query.to)}
    />
  );
}
