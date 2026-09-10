import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { properties, getProperty } from "@/content/properties";
import { ApartmentDetail } from "@/components/ApartmentDetail";
import { BASE_URL, languageAlternates } from "@/lib/seo";

const MAX_DESCRIPTION = 155;

/** First sentence of the summary, trimmed at a word boundary. */
function excerpt(summary: string) {
  if (summary.length <= MAX_DESCRIPTION) return summary;
  const clipped = summary.slice(0, MAX_DESCRIPTION);
  return `${clipped.slice(0, clipped.lastIndexOf(" ")).replace(/[\s,;–—-]+$/, "")}…`;
}

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/apartments/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};

  return {
    title: `${property.name} — Harmony Rental`,
    description: excerpt(property.summary),
    alternates: languageAlternates(`/apartments/${slug}`, locale),
    openGraph: property.images.length > 0 ? { images: [property.images[0]] } : undefined,
  };
}

export default async function ApartmentPage({
  params,
}: PageProps<"/[locale]/apartments/[slug]">) {
  const { locale, slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  setRequestLocale(locale);

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: property.name,
    description: property.summary,
    ...(property.sizeSqm !== null && {
      floorSize: { "@type": "QuantitativeValue", value: property.sizeSqm, unitCode: "MTK" },
    }),
    ...(property.bedrooms !== null && { numberOfBedrooms: property.bedrooms }),
    ...(property.sleeps !== null && {
      occupancy: { "@type": "QuantitativeValue", maxValue: property.sleeps },
    }),
    address: {
      "@type": "PostalAddress",
      addressLocality: property.area === "alimos" ? "Alimos" : "Athens",
      addressCountry: "GR",
    },
    image: property.images.map((src) => `${BASE_URL}${src}`),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ApartmentDetail property={property} />
    </>
  );
}
