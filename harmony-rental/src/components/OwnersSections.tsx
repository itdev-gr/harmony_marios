import { useTranslations } from "next-intl";
import type { ReactElement } from "react";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import { Section } from "./Section";
import { PageHero } from "./PageHero";
import { InquiryCta } from "./InquiryCta";

const CIRCLE_STEPS = ["renovate", "furnish", "list", "host", "earn"] as const;

const StyleIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M4 20 14 10m0 0 3-3 3 3-3 3m-3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="17" r="2" />
  </svg>
);

const CameraIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1-2h7l1 2h2A1.5 1.5 0 0 1 20 8.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);

const ChatIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4z" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const SparkleIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M6 20.5v-5m0-6v-5m-3 8h6m11-3-1.1 3.3L16 12l3.3 1.1z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TagIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M12.5 4h6a1 1 0 0 1 1 1v6l-9.3 9.3a1 1 0 0 1-1.4 0l-5.6-5.6a1 1 0 0 1 0-1.4z" strokeLinejoin="round" />
    <circle cx="16" cy="8" r="1.3" />
  </svg>
);

const ShieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6z" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrowelIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M3.5 20.5 9 15m0 0-2.5-2.5m2.5 2.5L11.5 17" strokeLinecap="round" />
    <path d="M10 8.5 15.5 3l5.5 5.5-5.5 5.5z" strokeLinejoin="round" />
  </svg>
);

const SERVICE_ICONS: Record<string, ReactElement> = {
  "prep-styling": StyleIcon,
  "listing-optimization": CameraIcon,
  "guest-management": ChatIcon,
  "maintenance-cleaning": SparkleIcon,
  "pricing-revenue": TagIcon,
  "compliance-safety": ShieldIcon,
};

const CIRCLE_ICONS: Record<(typeof CIRCLE_STEPS)[number], ReactElement> = {
  renovate: TrowelIcon,
  furnish: StyleIcon,
  list: CameraIcon,
  host: ChatIcon,
  earn: TagIcon,
};

/**
 * The `/owners` page body: the legacy "Apartment Renovation" + "Home Airbnb"
 * services, rebuilt as one owner-facing story — six sub-services, four value
 * props, a compliance paragraph (AMA registration), the renovate → host →
 * earn strip, and the inquiry form. No public pricing or a revenue
 * calculator — the client hasn't published rates, so the form asks instead
 * (see task-8 brief).
 */
export function OwnersSections() {
  const t = useTranslations("owners");

  return (
    <>
      <PageHero
        id="owners"
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        media={{
          src: "/images/harmony-syngrou-residence/03.jpg",
          alt: "A bedroom in one of the apartments we furnish and host, made up for arrival",
        }}
      >
          <a href="#owner-inquiry" className="btn-primary mt-8">
            {t("heroCta")}
            <span aria-hidden="true">→</span>
          </a>
      </PageHero>

      <Section
        id="owner-services"
        tone="paper"
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        lead={t("services.lead")}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.ownerServices.map((service) => (
            <div
              key={service.slug}
              className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pastel-green text-neutral-950">
                {SERVICE_ICONS[service.slug] ?? SparkleIcon}
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight text-neutral-950">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="owner-why" tone="green" eyebrow={t("why.eyebrow")} title={t("why.title")}>
        <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {site.ownerValueProps.map((prop) => (
            <div key={prop.slug} className="border-t border-brand-tint/25 pt-6">
              <dt className="font-display text-xl font-bold tracking-tight text-neutral-950">
                {prop.title}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-neutral-700">{prop.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="owner-compliance"
        tone="blue"
        eyebrow={t("compliance.eyebrow")}
        title={t("compliance.title")}
        lead={t("compliance.body")}
      />

      <Section
        id="owner-circle"
        tone="paper"
        eyebrow={t("circle.eyebrow")}
        title={t("circle.title")}
        lead={t("circle.lead")}
        action={
          <Link href="/owners/renovation" className="btn-outline btn-sm">
            {t("crossLink.cta")}
            <span aria-hidden="true">→</span>
          </Link>
        }
      >
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-6">
          {CIRCLE_STEPS.map((step, index) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pastel-green text-brand-tint">
                  {CIRCLE_ICONS[step]}
                </span>
                <span className="font-display text-base font-bold tracking-tight text-neutral-950">
                  {t(`circle.steps.${step}`)}
                </span>
              </span>
              {index < CIRCLE_STEPS.length - 1 && (
                <span aria-hidden="true" className="font-display text-xl text-neutral-300">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-xl rounded-2xl border border-line bg-pastel-cream px-6 py-5 text-sm leading-relaxed text-neutral-700">
          {t("crossLink.body")}
        </p>
      </Section>

      <section aria-labelledby="owner-inquiry-title" id="owner-inquiry" className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-20 md:grid-cols-[minmax(0,1fr)_320px] md:py-24">
          <div className="rounded-2xl border border-line bg-white p-7 shadow-float">
            <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
              {t("inquiry.eyebrow")}
            </p>
            <h2
              id="owner-inquiry-title"
              className="mt-2 font-display text-2xl font-bold tracking-tight text-neutral-950"
            >
              {t("inquiry.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">{t("inquiry.lead")}</p>
            <InquiryCta kind="owner" />
          </div>

          <div className="flex flex-col gap-3 self-start rounded-2xl border border-line bg-pastel-cream px-7 py-6">
            <p className="text-sm leading-relaxed text-neutral-700">{site.contact.address}</p>
            <a
              href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
              className="font-display text-sm font-bold text-neutral-950 transition hover:text-link-hover"
            >
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="font-display text-sm font-bold text-neutral-950 transition hover:text-link-hover"
            >
              {site.contact.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
