import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import type { Property } from "@/content/types";
import { Gallery } from "./Gallery";
import { StickyBookBar } from "./StickyBookBar";
import { InquiryCta } from "./InquiryCta";

const OTA_PLATFORMS = [
  { key: "airbnb", label: "Airbnb" },
  { key: "booking", label: "Booking.com" },
] as const;

/** Carento's `list-ticks-green`: a green disc with a dark tick inside. */
function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pastel-green"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-3 w-3 text-brand-tint"
      >
        <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/**
 * The apartment page body, kept out of `page.tsx` so it can be rendered (and
 * asserted on) without a Next request context. Every block is conditional on
 * the inventory actually holding the data — the legacy site printed "NA" and an
 * empty "$" wherever a field was missing.
 */
export function ApartmentDetail({ property }: { property: Property }) {
  const t = useTranslations("apartments");
  const tDetail = useTranslations("apartments.detail");
  const tCommon = useTranslations("common");

  const facts = [
    property.sizeSqm !== null && {
      key: "size",
      label: tDetail("facts.size"),
      value: tCommon("sizeSqm", { size: property.sizeSqm }),
    },
    property.bedrooms !== null && {
      key: "bedrooms",
      label: tDetail("facts.bedrooms"),
      value: String(property.bedrooms),
    },
    property.bathrooms !== null && {
      key: "bathrooms",
      label: tDetail("facts.bathrooms"),
      value: String(property.bathrooms),
    },
    property.sleeps !== null && {
      key: "sleeps",
      label: tDetail("facts.sleeps"),
      value: String(property.sleeps),
    },
  ].filter((fact): fact is { key: string; label: string; value: string } => Boolean(fact));

  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(
    `${property.neighborhood}, Athens`,
  )}`;
  // All null in today's inventory, so this renders nothing until the client
  // hands over real listing URLs.
  const listings = OTA_PLATFORMS.flatMap((platform) => {
    const href = property.otaLinks[platform.key];
    return href ? [{ ...platform, href }] : [];
  });

  return (
    <article className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 pt-8 pb-20 md:pt-10 md:pb-24">
        <Link
          href="/apartments"
          className="inline-flex items-center gap-2 font-display text-sm font-bold text-neutral-500 transition hover:text-link-hover"
        >
          <span aria-hidden="true">←</span>
          {tDetail("backToAll")}
        </Link>

        <div className="mt-6">
          <Gallery property={property} />
        </div>

        <header className="mt-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl leading-tight font-extrabold tracking-tight text-balance text-neutral-950 md:text-5xl">
              {property.name}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-neutral-500">
              <span>{property.neighborhood}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-neutral-300" />
              <span className="rounded-full bg-pastel-green px-3 py-1 font-display text-xs font-bold tracking-wide text-brand-tint uppercase">
                {t(`filters.${property.area}`)}
              </span>
            </p>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <div className="flex flex-col gap-10">
            {/* Flex rather than a fixed grid: an apartment with two known facts
                fills the plate instead of leaving empty cells. */}
            {facts.length > 0 && (
              <dl className="flex flex-wrap gap-3">
                {facts.map((fact) => (
                  <div
                    key={fact.key}
                    className="min-w-[7.5rem] flex-1 rounded-xl border border-line bg-white px-5 py-4"
                  >
                    <dt className="font-display text-xs font-bold tracking-wide text-neutral-500 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-bold text-neutral-950">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <Block title={tDetail("about")}>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-700">
                {property.summary}
              </p>
            </Block>

            {property.amenities.length > 0 && (
              <Block title={tDetail("amenities")}>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-3 text-sm text-neutral-700">
                      <CheckIcon />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {property.bedSetup.length > 0 && (
              <Block title={tDetail("beds")}>
                <ul className="flex flex-col gap-3">
                  {property.bedSetup.map((bed) => (
                    <li
                      key={bed}
                      className="rounded-xl border border-line bg-white px-5 py-3.5 text-sm text-neutral-700"
                    >
                      {bed}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {property.distances.length > 0 && (
              <Block title={tDetail("distances")}>
                <dl className="max-w-xl">
                  {property.distances.map((distance) => (
                    <div
                      key={distance.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-b-0"
                    >
                      <dt className="text-sm text-neutral-700">{distance.label}</dt>
                      <dd className="font-display text-base font-bold text-neutral-950">
                        {distance.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Block>
            )}

            {property.registrationNo && (
              <p className="text-xs text-neutral-500">
                {tDetail("registration", { number: property.registrationNo })}
              </p>
            )}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <section
              id="book"
              aria-labelledby="book-title"
              className="scroll-mt-28 rounded-2xl border border-line bg-white p-7 shadow-float"
            >
              <h2 id="book-title" className="font-display text-2xl font-bold tracking-tight text-neutral-950">
                {tDetail("book")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">{tDetail("bookLead")}</p>

              <InquiryCta property={property} />

              <p className="mt-4 text-center font-display text-sm font-bold text-neutral-700">
                {site.contact.phone}
              </p>
            </section>

            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-pastel-cream px-7 py-6">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 font-display text-sm font-bold text-neutral-950 transition hover:text-link-hover"
              >
                <span aria-hidden="true">↗</span>
                {tDetail("map")}
              </a>

              {listings.map((platform) => (
                <a
                  key={platform.key}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-sm font-medium text-neutral-700 transition hover:text-link-hover"
                >
                  <span aria-hidden="true">↗</span>
                  {tDetail("alsoOn", { platform: platform.label })}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <StickyBookBar property={property} />
    </article>
  );
}
