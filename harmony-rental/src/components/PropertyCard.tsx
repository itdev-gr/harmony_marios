"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Property } from "@/content/types";

function GuestsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-4 w-4 text-neutral-950">
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 19c0-3 2.5-4.75 5.5-4.75S14.5 16 14.5 19" strokeLinecap="round" />
      <path d="M16 5.5a3 3 0 0 1 0 5.6M17.5 14.5c2 .6 3.5 2.1 3.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-4 w-4 text-neutral-950">
      <path d="M3 18v-9M3 13h18v5M21 18v-3.5" strokeLinecap="round" />
      <path d="M6.5 13v-2.5a1 1 0 0 1 1-1h9a3 3 0 0 1 3 3V13" strokeLinecap="round" />
    </svg>
  );
}

function SizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-4 w-4 text-neutral-950">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 3.5v3M3.5 8h3M16 20.5v-3M20.5 16h-3" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-4 w-4 shrink-0">
      <path d="M12 21s6.5-5.7 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.3 12 21 12 21z" strokeLinejoin="round" />
      <circle cx="12" cy="10.5" r="2.25" />
    </svg>
  );
}

/**
 * The apartment card used on the home page, the apartments index and the
 * "related stays" rails. Adapted from Carento's `card-journey-small`: bordered
 * white plate, area chip over the image, a divided specs row, and one pill
 * action. Only facts the inventory actually holds are shown — the legacy site
 * printed "NA" and an empty "$" for every missing field.
 */
export function PropertyCard({
  property,
  query,
}: {
  property: Property;
  /** Dates/party size carried over from a search, so the detail page can
      pre-fill its inquiry form. Omitted everywhere else. */
  query?: Record<string, string>;
}) {
  const t = useTranslations("common");
  const tFilters = useTranslations("apartments.filters");
  const [photoFailed, setPhotoFailed] = useState(false);

  const photo = property.images[0];
  const facts = [
    property.sleeps !== null && {
      key: "sleeps",
      icon: <GuestsIcon />,
      label: t("guestsCount", { count: property.sleeps }),
    },
    property.bedrooms !== null && {
      key: "bedrooms",
      icon: <BedIcon />,
      label: t("bedroomsCount", { count: property.bedrooms }),
    },
    property.sizeSqm !== null && {
      key: "size",
      icon: <SizeIcon />,
      label: t("sizeSqm", { size: property.sizeSqm }),
    },
  ].filter((fact): fact is { key: string; icon: ReactElement; label: string } => Boolean(fact));

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        {photo && !photoFailed ? (
          <Image
            src={photo}
            alt={property.name}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          // Photo slot: /images/<slug>/01.jpg — client to supply. Until then a
          // calm monogram plate rather than a broken image.
          <div className="flex h-full items-center justify-center bg-neutral-100">
            <span aria-hidden="true" className="font-display text-6xl font-extrabold text-neutral-300">
              {property.name.charAt(0)}
            </span>
          </div>
        )}

        <p className="absolute top-5 left-5 rounded-full bg-white px-4 py-1 font-display text-xs font-bold tracking-wide text-brand-tint uppercase">
          {tFilters(property.area)}
        </p>
        {property.sizeSqm !== null && (
          <p className="absolute top-5 right-5 rounded-full bg-neutral-950/75 px-3 py-1 font-display text-xs font-bold tracking-wide text-white">
            {t("sizeSqm", { size: property.sizeSqm })}
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl leading-snug font-bold tracking-tight text-neutral-950">
          {property.name}
        </h3>

        <p className="flex items-center gap-2 text-sm font-medium text-neutral-500">
          <PinIcon />
          {property.neighborhood}
        </p>

        {facts.length > 0 && (
          <ul className="mt-1 flex flex-wrap items-center gap-y-2 border-t border-line pt-4 text-sm font-medium text-neutral-950">
            {facts.map((fact) => (
              <li
                key={fact.key}
                className="flex items-center gap-2 border-l border-line px-4 first:border-l-0 first:pl-0"
              >
                {fact.icon}
                <span>{fact.label}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-end border-t border-line pt-5">
          <Link
            href={
              query && Object.keys(query).length > 0
                ? { pathname: `/apartments/${property.slug}`, query }
                : `/apartments/${property.slug}`
            }
            className="btn-outline btn-sm after:absolute after:inset-0"
          >
            {t("viewApartment")}
            <span className="sr-only"> — {property.name}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
