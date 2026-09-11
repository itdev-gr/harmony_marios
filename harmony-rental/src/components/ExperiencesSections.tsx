import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { experiences, type ExperienceArea } from "@/content/experiences";
import { VideoHero } from "./VideoHero";
import { MediaRow } from "./MediaRow";
import { CtaBand } from "./CtaBand";

const AREAS = ["athens", "alimos"] as const satisfies readonly ExperienceArea[];

function requiredService(slug: string) {
  const service = site.services.find((s) => s.slug === slug);
  if (!service) throw new Error(`ExperiencesSections: missing "${slug}" service in content/site.ts`);
  return service;
}
const boatTourService = requiredService("boat-tour");
const guidedTourService = requiredService("tour");
// The FAQ line naming the boat types — reused verbatim rather than inventing
// a fresh list (inventory §1: "yachts, sailboats, and speedboats").
const boatFaq = (() => {
  const faq = site.faqs.guest.find((f) => f.question.includes("boats"));
  if (!faq) throw new Error('ExperiencesSections: missing the "boats" FAQ in content/site.ts');
  return faq;
})();

const body = "text-base leading-relaxed text-neutral-700";

/**
 * The `/experiences` page body: a video hero, then four alternating photo/copy
 * rows — the two experience services (boat tours, guided tours) and the two
 * area guides. The 16 attractions themselves live on `/experiences/[area]`,
 * which these rows lead into.
 */
export function ExperiencesSections() {
  const t = useTranslations("experiences");
  const tFilters = useTranslations("apartments.filters");

  return (
    <>
      <VideoHero
        id="experiences"
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        video="/videos/experiences-athens.mp4"
        poster="/images/experiences/hero-poster.jpg"
      />

      <MediaRow
        id="boat-tours"
        eyebrow={t("boatTours.eyebrow")}
        title={t("boatTours.title")}
        image={{ src: "/images/experiences/boat-tours.jpg", alt: t("rows.boatAlt") }}
        imageSide="right"
      >
        <p className={body}>{boatTourService.description}</p>
        <p className={`mt-4 ${body}`}>{boatFaq.answer}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary">
            {t("boatTours.cta")}
            <span aria-hidden="true">→</span>
          </Link>
          {/* client to confirm partner link — the newer harmony-rental.vercel.app
              site links boat4all.gr as the boat-tour operator */}
          <a href="https://boat4all.gr" target="_blank" rel="noopener noreferrer" className="btn-outline">
            {t("boatTours.partnerCta")}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </MediaRow>

      <MediaRow
        id="guided-tours"
        eyebrow={t("guidedTours.eyebrow")}
        title={t("guidedTours.title")}
        image={{ src: "/images/experiences/guided-tours.jpg", alt: t("rows.guidedAlt") }}
        imageSide="left"
        tone="cream"
      >
        <p className={body}>{guidedTourService.description}</p>
        <p className={`mt-4 ${body}`}>{t("guidedTours.lead")}</p>
        <Link href="/contact" className="btn-outline mt-8">
          {t("guidedTours.cta")}
          <span aria-hidden="true">→</span>
        </Link>
      </MediaRow>

      {AREAS.map((area, index) => {
        const count = experiences.filter((experience) => experience.area === area).length;
        return (
          <MediaRow
            key={area}
            id={`area-${area}`}
            eyebrow={t(`guide.${area}.eyebrow`)}
            title={t(`guide.${area}.title`)}
            image={{ src: `/images/experiences/${area}.jpg`, alt: t(`rows.${area}Alt`) }}
            // Rows keep alternating from where the services left off.
            imageSide={index % 2 === 0 ? "right" : "left"}
            tone={index % 2 === 0 ? "paper" : "cream"}
          >
            <p className={body}>{t(`guide.${area}.lead`)}</p>
            <p className="mt-4 font-display text-sm font-bold text-brand-tint">
              {t("areas.count", { count })}
            </p>
            <Link href={`/experiences/${area}`} className="btn-primary mt-8">
              {t("areas.cta", { area: tFilters(area) })}
              <span aria-hidden="true">→</span>
            </Link>
          </MediaRow>
        );
      })}

      <CtaBand id="experiences-cta" />
    </>
  );
}
