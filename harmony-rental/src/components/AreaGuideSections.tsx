import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { properties } from "@/content/properties";
import { getExperiencesByArea, type ExperienceArea } from "@/content/experiences";
import { Section } from "./Section";
import { PageHero } from "./PageHero";
import { PropertyCard } from "./PropertyCard";
import { PhotoPlate } from "./PhotoPlate";
import { CheckIcon } from "./CheckIcon";

// Up to 3 — the brief's "3 PropertyCards" assumes 3 exist in every area.
// They don't: today's inventory has only 1 Alimos apartment (the other 8 are
// all Athens), so this is a cap, not a guarantee — the grid below adapts to
// however many actually come back rather than padding with invented stock.
const NEARBY_COUNT = 3;

/**
 * Shared body for `/experiences/athens` and `/experiences/alimos`: a hero,
 * every area experience as an alternating text/image row (grouped by
 * category), and a closing "Stay nearby" rail of that area's apartments.
 * Two thin pages, one component — see task-9 brief.
 */
export function AreaGuideSections({ area }: { area: ExperienceArea }) {
  const t = useTranslations("experiences");
  const tFilters = useTranslations("apartments.filters");

  const guide = getExperiencesByArea(area)
    .slice()
    .sort((a, b) => a.category.localeCompare(b.category));
  const nearby = properties.filter((property) => property.area === area).slice(0, NEARBY_COUNT);
  // With 3 cards the grid reads as a normal 3-up row. With fewer, `1fr`
  // columns would stretch the lone card(s) full-width and leave an
  // unfinished-looking empty gap where the rest of the row would be — so
  // below 3 the columns run a fixed, card-sized width instead, and the
  // "see all" link grows into a full CTA button to carry the section.
  const nearbyGridClass =
    nearby.length >= 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : nearby.length === 2
        ? "max-w-2xl sm:grid-cols-2"
        : "max-w-sm";

  return (
    <>
      <PageHero id="guide" eyebrow={t(`guide.${area}.eyebrow`)} title={t(`guide.${area}.title`)} lead={t(`guide.${area}.lead`)} />

      <Section
        id="guide-list"
        tone="paper"
        eyebrow={t("guide.thingsEyebrow")}
        title={t("guide.thingsTitle")}
      >
        <div className="flex flex-col gap-14 md:gap-16">
          {guide.map((experience, index) => (
            <article
              key={experience.slug}
              className={`flex flex-col gap-8 md:items-center md:gap-12 ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-neutral-100 md:w-2/5">
                {/* Photo slot: real destination photography to come — a calm
                    monogram plate in the meantime, same pattern as PropertyCard. */}
                <PhotoPlate initial={experience.name.charAt(0)} />
              </div>

              <div className="flex-1">
                <span className="rounded-full bg-pastel-green px-4 py-1 font-display text-xs font-bold tracking-wide text-brand-tint uppercase">
                  {experience.category}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-neutral-950">
                  {experience.name}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-500">
                  {experience.blurb}
                </p>
                {experience.highlights.length > 0 && (
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-sm text-neutral-700">
                        <CheckIcon />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="stay-nearby"
        tone="green"
        eyebrow={t("stayNearby.eyebrow")}
        title={t("stayNearby.title")}
        lead={t("stayNearby.lead")}
        action={
          <Link
            href={{ pathname: "/apartments", query: { area } }}
            className={nearby.length >= 3 ? "btn-outline btn-sm" : "btn-primary"}
          >
            {t("stayNearby.cta", { area: tFilters(area) })}
            <span aria-hidden="true">→</span>
          </Link>
        }
      >
        <div className={`grid gap-6 ${nearbyGridClass}`}>
          {nearby.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </Section>
    </>
  );
}
