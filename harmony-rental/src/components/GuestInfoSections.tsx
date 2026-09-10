import { useTranslations } from "next-intl";
import { Section } from "./Section";
import { PageHero } from "./PageHero";
import { CtaBand } from "./CtaBand";

// Airport transfer pricing (docs/CONTENT_INVENTORY.md §5, entry-process
// pages) — EUR only, the one real price list the legacy site published.
const TRANSFER_RATES = [
  { key: "taxi", day: "€48", night: "€63" },
  { key: "van", day: "€100", night: "€120" },
] as const;

// "Where to eat" (legacy /entry-process-facilities/tips-for-food/), rewritten
// from pasted-email tone into a plain list. Names/addresses are proper nouns
// so they stay identical in both locales; only the short tag is translated.
const RESTAURANTS = [
  { key: "barbadimos", name: "BARBADIMOS", address: "12–14 Mitropoleos St" },
  { key: "athinaikon", name: "Athinaikon", address: "34 Mitropoleos St" },
  { key: "fouar", name: "FOUAR", address: "6 Christopoulou St" },
  { key: "cocktailBar", name: "360 Cocktail Bar", address: "2 Ifestou St, Monastiraki" },
  { key: "vintage", name: "Vintage", address: "66 Mitropoleos St" },
  { key: "lamiral", name: "L'Amiral", address: "Panos 6, Plaka" },
  { key: "loukoumades", name: "Loukoumades", address: "21 Aiolou St" },
] as const;

/**
 * The public, indexed `/guest-info` page: generic check-in/check-out policy,
 * airport transfer pricing and restaurant tips shared by every apartment.
 *
 * Deliberately carries no Wi-Fi passwords and no door/locker instructions —
 * those are per-property and live behind the token-gated `/stay/[token]`
 * pages (`src/content/stay.ts`), never here.
 */
export function GuestInfoSections() {
  const t = useTranslations("guestInfo");

  return (
    <>
      <PageHero id="guest-info" eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

      <Section
        id="policy"
        tone="paper"
        eyebrow={t("policy.eyebrow")}
        title={t("policy.title")}
        lead={t("policy.lead")}
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <dl className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-7">
            <div>
              <dt className="font-display text-xs font-bold tracking-wide text-neutral-700 uppercase">
                {t("policy.checkinLabel")}
              </dt>
              <dd className="mt-1 font-display text-lg font-bold text-neutral-950">
                {t("policy.checkinValue")}
              </dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="font-display text-xs font-bold tracking-wide text-neutral-700 uppercase">
                {t("policy.checkoutLabel")}
              </dt>
              <dd className="mt-1 font-display text-lg font-bold text-neutral-950">
                {t("policy.checkoutValue")}
              </dd>
            </div>
          </dl>

          <div className="rounded-2xl border border-line bg-white p-7">
            <p className="font-display text-sm font-bold tracking-tight text-neutral-950">
              {t("policy.requirementsTitle")}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-neutral-700">
              <li>{t("policy.requirement1")}</li>
              <li>{t("policy.requirement2")}</li>
              <li>{t("policy.requirement3")}</li>
              <li>{t("policy.requirement4")}</li>
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-neutral-500">
              {t("policy.regulationNote")}
            </p>
            <h3 className="mt-8 font-display text-base font-bold text-neutral-950">
              {t("policy.checkoutRulesTitle")}
            </h3>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-neutral-700">
              <li>{t("policy.checkoutRule1")}</li>
              <li>{t("policy.checkoutRule2")}</li>
              <li>{t("policy.checkoutRule3")}</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="transport"
        tone="green"
        eyebrow={t("transport.eyebrow")}
        title={t("transport.title")}
        lead={t("transport.lead")}
      >
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-6 py-4 font-display font-bold text-neutral-950">
                  {t("transport.vehicle")}
                </th>
                <th scope="col" className="px-6 py-4 font-display font-bold text-neutral-950">
                  {t("transport.day")}
                </th>
                <th scope="col" className="px-6 py-4 font-display font-bold text-neutral-950">
                  {t("transport.night")}
                </th>
              </tr>
            </thead>
            <tbody>
              {TRANSFER_RATES.map((rate) => (
                <tr key={rate.key} className="border-b border-line last:border-0">
                  <th
                    scope="row"
                    className="px-6 py-4 font-display font-semibold text-neutral-950"
                  >
                    {t(`transport.${rate.key}`)}
                  </th>
                  <td className="px-6 py-4 text-neutral-700">{rate.day}</td>
                  <td className="px-6 py-4 text-neutral-700">{rate.night}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="eat" tone="sand" eyebrow={t("eat.eyebrow")} title={t("eat.title")} lead={t("eat.lead")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESTAURANTS.map((place) => (
            <article
              key={place.key}
              className="rounded-2xl border border-line bg-white p-6 transition duration-300 hover:shadow-card"
            >
              <h3 className="font-display text-lg font-bold tracking-tight text-neutral-950">
                {place.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{t(`eat.${place.key}`)}</p>
              <p className="mt-3 text-sm text-neutral-700">{place.address}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand id="guest-info-cta" />
    </>
  );
}
