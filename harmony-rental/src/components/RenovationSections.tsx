import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { Section } from "./Section";
import { PageHero } from "./PageHero";
import { Faq } from "./Faq";
import { CtaBand } from "./CtaBand";

/**
 * The `/owners/renovation` page body — inventory calls the legacy
 * `/apartment-renovation/` page "the strongest, most original page on the
 * site", so the 7-step process and its copy are kept close to verbatim. The
 * before/after portfolio only renders once `site.renovationProjects` has
 * real entries (empty today — see the comment in `content/site.ts`).
 */
export function RenovationSections() {
  const t = useTranslations("owners.renovation");

  return (
    <>
      <PageHero id="renovation" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <Section
        id="renovation-process"
        tone="paper"
        eyebrow={t("process.eyebrow")}
        title={t("process.title")}
        lead={t("process.lead")}
      >
        <div className="mb-12 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-pastel-green px-6 py-5">
          <span className="font-display text-3xl font-extrabold tracking-tight text-brand-tint">
            {t("timeline.value")}
          </span>
          <span className="max-w-xs text-sm leading-relaxed text-neutral-700">
            <span className="block font-display text-sm font-bold text-neutral-950">
              {t("timeline.title")}
            </span>
            {t("timeline.body")}
          </span>
        </div>

        <ol className="flex flex-col gap-6">
          {site.renovationProcess.map((step) => (
            <li key={step.step} className="flex gap-5 md:gap-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-white font-display text-base font-bold text-brand-tint">
                {step.step}
              </span>
              <div className="flex-1 rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-xl font-bold tracking-tight text-neutral-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Faq items={site.faqs.renovation} tone="blue" id="renovation-faq" />

      {site.renovationProjects.length > 0 && (
        <Section
          id="renovation-portfolio"
          tone="paper"
          eyebrow={t("portfolio.eyebrow")}
          title={t("portfolio.title")}
          lead={t("portfolio.lead")}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.renovationProjects.map((project) => (
              <figure key={project.caption} className="overflow-hidden rounded-2xl border border-line">
                <div className="grid grid-cols-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.before} alt={`${project.caption} — before`} className="h-full w-full object-cover" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.after} alt={`${project.caption} — after`} className="h-full w-full object-cover" />
                </div>
                <figcaption className="p-4 text-sm font-semibold text-neutral-950">{project.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section
        id="renovation-crosslink"
        tone="green"
        title={t("crossLink.title")}
        lead={t("crossLink.body")}
        action={
          <Link href="/owners" className="btn-outline btn-sm">
            {t("crossLink.cta")}
            <span aria-hidden="true">→</span>
          </Link>
        }
      />

      <CtaBand id="renovation-cta" />
    </>
  );
}
