import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { experiences, type ExperienceArea } from "@/content/experiences";
import { Section } from "./Section";
import { CtaBand } from "./CtaBand";

const AREAS = ["athens", "alimos"] as const satisfies readonly ExperienceArea[];

const boatTourService = site.services.find((service) => service.slug === "boat-tour")!;
const guidedTourService = site.services.find((service) => service.slug === "tour")!;
// The FAQ line naming the boat types — reused verbatim rather than inventing
// a fresh list (inventory §1: "yachts, sailboats, and speedboats").
const boatFaq = site.faqs.guest.find((faq) => faq.question.includes("boats"))!;

/**
 * The `/experiences` page body: an intro, the Boat Tours service (advertised
 * on the legacy home page but with no landing page anywhere on the old site
 * — inventory §1's "gap"), a guided-tours pitch, and two cards into the
 * Athens/Alimos area guides.
 */
export function ExperiencesSections() {
  const t = useTranslations("experiences");
  const tFilters = useTranslations("apartments.filters");

  return (
    <>
      <section aria-labelledby="experiences-title" className="bg-pastel-cream">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-24">
          <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
            {t("eyebrow")}
          </p>
          <h1
            id="experiences-title"
            className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-neutral-950 md:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {t("lead")}
          </p>
        </div>
      </section>

      <Section
        id="boat-tours"
        tone="blue"
        eyebrow={t("boatTours.eyebrow")}
        title={t("boatTours.title")}
      >
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed text-neutral-700">{boatTourService.description}</p>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">{boatFaq.answer}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              {t("boatTours.cta")}
              <span aria-hidden="true">→</span>
            </Link>
            {/* client to confirm partner link — the newer harmony-rental.vercel.app
                site links boat4all.gr as the boat-tour operator */}
            <a
              href="https://boat4all.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              {t("boatTours.partnerCta")}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </Section>

      <Section
        id="guided-tours"
        tone="green"
        eyebrow={t("guidedTours.eyebrow")}
        title={t("guidedTours.title")}
        lead={t("guidedTours.lead")}
        action={
          <Link href="/contact" className="btn-outline btn-sm">
            {t("guidedTours.cta")}
            <span aria-hidden="true">→</span>
          </Link>
        }
      >
        <p className="max-w-2xl text-base leading-relaxed text-neutral-700">
          {guidedTourService.description}
        </p>
      </Section>

      <Section
        id="experience-areas"
        tone="paper"
        eyebrow={t("areas.eyebrow")}
        title={t("areas.title")}
        lead={t("areas.lead")}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {AREAS.map((area) => {
            const count = experiences.filter((experience) => experience.area === area).length;
            return (
              <div
                key={area}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <h3 className="font-display text-2xl font-bold tracking-tight text-neutral-950">
                  {tFilters(area)}
                </h3>
                <p className="text-sm font-semibold text-brand-tint">
                  {t("areas.count", { count })}
                </p>
                <Link href={`/experiences/${area}`} className="btn-outline btn-sm mt-auto self-start">
                  {t("areas.cta", { area: tFilters(area) })}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </Section>

      <CtaBand id="experiences-cta" />
    </>
  );
}
