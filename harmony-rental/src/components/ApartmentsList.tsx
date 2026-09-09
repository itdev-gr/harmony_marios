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
      <section aria-labelledby="apartments-title" className="bg-sand">
        <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <p className="text-xs font-medium tracking-[0.18em] text-terracotta uppercase">
            {t("eyebrow")}
          </p>
          <h1
            id="apartments-title"
            className="mt-4 max-w-3xl font-display text-4xl leading-tight text-balance text-sea md:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
            {t("lead")}
          </p>

          <div className="mt-10 flex flex-col gap-5 border-y border-sea/10 py-5 md:flex-row md:items-center md:justify-between">
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
                        ? "rounded-full bg-sea px-5 py-2 text-sm font-medium text-sand"
                        : "rounded-full border border-sea/15 px-5 py-2 text-sm font-medium text-ink/70 transition hover:border-sea/40 hover:text-sea"
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

              <label className="flex items-center gap-2 rounded-full border border-sea/15 bg-paper py-2 pr-3 pl-5">
                <span className="text-[11px] font-medium tracking-[0.14em] text-ink/50 uppercase">
                  {t("filters.guests")}
                </span>
                <select
                  name="guests"
                  defaultValue={activeGuests ? String(activeGuests) : ""}
                  className="bg-transparent font-body text-sm text-ink outline-none"
                >
                  <option value="">{t("filters.guestsAny")}</option>
                  {GUEST_OPTIONS.map((count) => (
                    <option key={count} value={count}>
                      {count === 6 ? tSearch("guestsMax") : tCommon("guestsCount", { count })}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="rounded-full border border-sea/15 px-5 py-2.5 text-sm font-medium text-sea transition hover:border-sea hover:bg-sea hover:text-sand"
              >
                {t("filters.apply")}
              </button>
            </form>
          </div>

          <p className="mt-6 text-sm text-ink/55">{t("count", { count: matches.length })}</p>

          {matches.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((property) => (
                <PropertyCard key={property.slug} property={property} query={cardQuery} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-sea/10 bg-paper px-8 py-14 text-center">
              <p className="mx-auto max-w-md text-base leading-relaxed text-ink/70">
                {t("empty")}
              </p>
              <Link
                href="/apartments"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sea px-6 py-2.5 text-sm font-medium text-sand transition hover:bg-sea/90"
              >
                {t("filters.clear")}
              </Link>
            </div>
          )}
        </div>
      </section>

      <CtaBand id="apartments-cta" />
    </>
  );
}
