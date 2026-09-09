import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { properties } from "@/content/properties";
import { getExperiencesByArea, type ExperienceArea } from "@/content/experiences";
import { Section } from "./Section";
import { PropertyCard } from "./PropertyCard";

const NEARBY_COUNT = 3;

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pastel-green"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3 text-brand-tint">
        <path d="m5 12.5 4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

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

  return (
    <>
      <section aria-labelledby="guide-title" className="bg-pastel-cream">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-24">
          <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
            {t(`guide.${area}.eyebrow`)}
          </p>
          <h1
            id="guide-title"
            className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-neutral-950 md:text-5xl lg:text-6xl"
          >
            {t(`guide.${area}.title`)}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {t(`guide.${area}.lead`)}
          </p>
        </div>
      </section>

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
                <div className="flex h-full items-center justify-center">
                  <span aria-hidden="true" className="font-display text-6xl font-extrabold text-neutral-300">
                    {experience.name.charAt(0)}
                  </span>
                </div>
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
          <Link href={{ pathname: "/apartments", query: { area } }} className="btn-outline btn-sm">
            {t("stayNearby.cta", { area: tFilters(area) })}
            <span aria-hidden="true">→</span>
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </Section>
    </>
  );
}
