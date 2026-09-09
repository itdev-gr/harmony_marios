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
      <section aria-labelledby="about-title" className="bg-sea text-sand">
        <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <p className="text-xs font-medium tracking-[0.18em] text-sand/60 uppercase">{t("eyebrow")}</p>
          <h1
            id="about-title"
            className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-balance text-sand md:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-sand/80 md:text-lg">{t("lead")}</p>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-20 md:grid-cols-3 md:py-28">
          {PILLARS.map((pillar) => (
            <article key={pillar} className="rounded-2xl border border-mist bg-paper p-8">
              <h2 className="font-display text-2xl text-sea">{t(`${pillar}.title`)}</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{t(`${pillar}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      <Section
        id="why"
        tone="paper"
        eyebrow={t("why.eyebrow")}
        title={t("why.title")}
      >
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div key={reason} className="border-t border-mist pt-6">
              <dt className="font-display text-xl text-sea">{t(`why.${reason}Title`)}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink/70">{t(`why.${reason}Body`)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <HostsBand />

      <Testimonials tone="sand" />

      <CtaBand id="about-cta" />
    </>
  );
}
