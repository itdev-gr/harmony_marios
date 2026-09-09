import { useTranslations } from "next-intl";
import { Section } from "./Section";
import { HostsBand } from "./HostsBand";
import { Testimonials } from "./Testimonials";
import { CtaBand } from "./CtaBand";

const PILLARS = ["vision", "mission", "goals"] as const;
const REASONS = ["local", "tailored", "quality", "circle"] as const;

/**
 * The About page body — mission / vision / goals and "why choose us", the
 * hosts band and the real reviews. No stat counters, no partner logos, no
 * placeholder agents: all three were fabrications on the legacy site.
 */
export function AboutSections() {
  const t = useTranslations("about");

  return (
    <>
      <section aria-labelledby="about-title" className="bg-pastel-cream">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-24">
          <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
            {t("eyebrow")}
          </p>
          <h1
            id="about-title"
            className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-neutral-950 md:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {t("lead")}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-20 md:grid-cols-3 md:py-24">
          {PILLARS.map((pillar) => (
            <article
              key={pillar}
              className="rounded-2xl border border-line bg-white p-8 transition duration-300 hover:shadow-card"
            >
              <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950">
                {t(`${pillar}.title`)}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">{t(`${pillar}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* client to approve: why-choose-us copy expanded beyond legacy site */}
      {/* The old site offered one line ("tailored services backed by local
          expertise… quality, personalized experiences, and professionalism");
          these four points are written for this rebuild. */}
      <Section
        id="why"
        tone="green"
        eyebrow={t("why.eyebrow")}
        title={t("why.title")}
      >
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div key={reason} className="border-t border-brand-tint/25 pt-6">
              <dt className="font-display text-xl font-bold tracking-tight text-neutral-950">
                {t(`why.${reason}Title`)}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-neutral-700">
                {t(`why.${reason}Body`)}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <HostsBand />

      <Testimonials tone="blue" />

      <CtaBand id="about-cta" />
    </>
  );
}
