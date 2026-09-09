import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { properties } from "@/content/properties";
import type { Property } from "@/content/types";
import { PropertyCard } from "./PropertyCard";
import { CtaBand } from "./CtaBand";

const AREAS = ["athens", "alimos"] as const;
const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6] as const;

type Area = (typeof AREAS)[number];

const isArea = (value: string | undefined): value is Area =>
  AREAS.includes(value as Area);

/** `?guests=4` → 4; anything unparseable is treated as "no preference". */
function parseGuests(value: string | undefined): number | null {
  if (!value) return null;
  const guests = Number.parseInt(value, 10);
  return Number.isFinite(guests) && guests > 0 ? guests : null;
}

/**
 * Two filters, both of which degrade to plain links and a GET form. An
 * apartment whose capacity we do not know yet is never hidden by the guests
 * filter — the inventory has real gaps and hiding a home over a missing
 * number would lose it a booking.
 */
export function filterProperties(
  list: Property[],
  { area, guests }: { area?: string; guests?: string },
) {
  const wantedArea = isArea(area) ? area : null;
  const wantedGuests = parseGuests(guests);

  return list.filter((property) => {
    if (wantedArea && property.area !== wantedArea) return false;
    if (wantedGuests && property.sleeps !== null && property.sleeps < wantedGuests) return false;
    return true;
  });
}

/**
 * The apartments index body, kept out of `page.tsx` so it can be rendered (and
 * asserted on) without a Next request context.
 */
export function ApartmentsList({
  area,
  guests,
  from,
  to,
}: {
  area?: string;
  guests?: string;
  from?: string;
  to?: string;
}) {
  const t = useTranslations("apartments");
  const tCommon = useTranslations("common");
  const tSearch = useTranslations("home.search");
  const locale = useLocale();

  const activeArea = isArea(area) ? area : null;
  const activeGuests = parseGuests(guests);
  const matches = filterProperties(properties, { area, guests });

  // Every filter link keeps whatever else the guest already asked for.
  const carried = {
    ...(activeGuests ? { guests: String(activeGuests) } : {}),
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
  };
  const cardQuery = {
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
    ...(activeGuests ? { guests: String(activeGuests) } : {}),
  };

  const tabs = [
    { key: "all", label: t("filters.all"), area: null },
    ...AREAS.map((value) => ({ key: value, label: t(`filters.${value}`), area: value })),
  ];

  return (
    <>
      <section aria-labelledby="apartments-title" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 pt-14 pb-20 md:pt-20 md:pb-24">
          <p className="font-display text-sm font-bold tracking-wide text-brand-tint uppercase">
            {t("eyebrow")}
          </p>
          <h1
            id="apartments-title"
            className="mt-4 max-w-3xl font-display text-4xl leading-tight font-extrabold tracking-tight text-balance text-neutral-950 md:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {t("lead")}
          </p>

          <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 shadow-float md:flex-row md:items-center md:justify-between">
            <nav aria-label={t("filters.area")} className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => {
                const isActive = tab.area === activeArea;
                return (
                  <Link
                    key={tab.key}
                    href={{
                      pathname: "/apartments",
                      query: { ...(tab.area ? { area: tab.area } : {}), ...carried },
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={
                      isActive
                        ? "rounded-full bg-neutral-950 px-5 py-2 font-display text-sm font-bold text-white"
                        : "rounded-full border border-line px-5 py-2 font-display text-sm font-bold text-neutral-700 transition hover:border-brand hover:bg-brand hover:text-black"
                    }
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>

            {/* No-JS guests filter: a plain GET back to this page. */}
            <form
              method="get"
              action={`/${locale}/apartments`}
              className="flex items-center gap-3"
            >
              {activeArea && <input type="hidden" name="area" value={activeArea} />}
              {from && <input type="hidden" name="from" value={from} />}
              {to && <input type="hidden" name="to" value={to} />}

              <label className="flex items-center gap-2 rounded-full border border-line bg-white py-2 pr-3 pl-5">
                <span className="font-display text-xs font-bold tracking-wide text-neutral-500 uppercase">
                  {t("filters.guests")}
                </span>
                <select
                  name="guests"
                  defaultValue={activeGuests ? String(activeGuests) : ""}
                  className="bg-transparent font-display text-sm font-semibold text-neutral-950 outline-none"
                >
                  <option value="">{t("filters.guestsAny")}</option>
                  {GUEST_OPTIONS.map((count) => (
                    <option key={count} value={count}>
                      {count === 6 ? tSearch("guestsMax") : tCommon("guestsCount", { count })}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="btn-primary btn-sm">
                {t("filters.apply")}
              </button>
            </form>
          </div>

          <p className="mt-6 font-display text-sm font-semibold text-neutral-500">
            {t("count", { count: matches.length })}
          </p>

          {matches.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((property) => (
                <PropertyCard key={property.slug} property={property} query={cardQuery} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-line bg-pastel-cream px-8 py-14 text-center">
              <p className="mx-auto max-w-md text-base leading-relaxed text-neutral-700">
                {t("empty")}
              </p>
              <div className="mt-6 flex justify-center">
                <Link href="/apartments" className="btn-dark btn-sm">
                  {t("filters.clear")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand id="apartments-cta" />
    </>
  );
}
