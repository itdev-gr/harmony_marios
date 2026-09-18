import { useTranslations } from "next-intl";
import { Section } from "./Section";
import { PageHero } from "./PageHero";
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
      <PageHero
          id="about"
          eyebrow={t("eyebrow")}
          title={t("title")}
          lead={t("lead")}
          media={{
            src: "/images/experiences/alimos.jpg",
            alt: "The Alimos coast, a short tram ride from the apartments we host in Athens",
          }}
        />

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
