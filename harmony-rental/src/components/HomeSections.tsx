import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { properties } from "@/content/properties";
import { site } from "@/content/site";
import { getPosts } from "@/lib/journal";
import { JournalCard } from "./JournalSections";
import { Hero } from "./Hero";
import { Section } from "./Section";
import { PropertyCard } from "./PropertyCard";
import { ServiceRow } from "./ServiceRow";
import { HostsBand } from "./HostsBand";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { CtaBand } from "./CtaBand";

const FEATURED_COUNT = 3;

/**
 * The home page body, kept out of `page.tsx` so it can be rendered (and
 * asserted on) without a Next request context.
 */
export function HomeSections() {
  const tJournal = useTranslations("home.journal");
  const t = useTranslations("home");
  const tServices = useTranslations("services");
  const featured = properties.slice(0, FEATURED_COUNT);

  return (
    <>
      <Hero />

      <Section
        id="featured"
        tone="paper"
        eyebrow={t("featured.eyebrow")}
        title={t("featured.title")}
        lead={t("featured.lead")}
        action={
          <Link href="/apartments" className="btn-outline btn-sm">
            {t("featured.all")}
            <span aria-hidden="true">→</span>
          </Link>
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.slug} property={property} />
          ))}
        </div>
      </Section>

      <Section
        id="services"
        tone="green"
        eyebrow={tServices("eyebrow")}
        title={tServices("title")}
        lead={tServices("lead")}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service) => (
            <ServiceRow key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <HostsBand />

      <Testimonials tone="blue" />

      <Faq items={site.faqs.guest} tone="paper" />

      <Section
        id="home-journal"
        tone="sand"
        eyebrow={tJournal("eyebrow")}
        title={tJournal("title")}
        lead={tJournal("lead")}
        action={
          <Link href="/journal" className="btn-outline btn-sm">
            {tJournal("viewAll")}
            <span aria-hidden="true">→</span>
          </Link>
        }
      >
        <div className="grid gap-6 md:grid-cols-3">
          {getPosts()
            .slice(0, 3)
            .map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
        </div>
      </Section>

      <CtaBand id="home-cta" />
    </>
  );
}
