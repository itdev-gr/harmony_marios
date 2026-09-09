import { useLocale, useTranslations } from "next-intl";

const GUEST_OPTIONS = [1, 2, 3, 4, 5] as const;

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-neutral-950"
    >
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M8 3v4M16 3v4M3.5 10h17" strokeLinecap="round" />
    </svg>
  );
}

function GuestIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-neutral-950"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" strokeLinecap="round" />
    </svg>
  );
}

const fieldLabel = "font-display text-xs font-bold tracking-wide text-neutral-500 uppercase";
const fieldControl =
  "w-full bg-transparent font-display text-sm font-semibold text-neutral-950 outline-none placeholder:text-neutral-400";

export function Hero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="relative z-10 isolate bg-pastel-cream">
      {/* hero photo slot: /images/hero.jpg — client to supply a golden-hour
          Riviera / Acropolis shot. Until it exists the ground is a soft pastel
          wash only, so nothing 404s and the section never collapses. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(90%_70%_at_85%_0%,rgba(112,244,109,0.20)_0%,rgba(112,244,109,0)_60%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-16 md:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 font-display text-xs font-bold tracking-wide text-black uppercase">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-black" />
          {t("heroBadge")}
        </p>

        <h1 className="mt-7 max-w-4xl font-display text-5xl leading-[1.02] font-extrabold tracking-tight text-balance text-neutral-950 md:text-6xl lg:text-7xl">
          {t("heroTitle")}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg">
          {t("heroSubtitle")}
        </p>

        {/* Carento's `box-search-advance`: a white card floating over the seam
            between the hero and the section below. No-JS — a plain GET to the
            apartments page, which reads from/to/guests off the query string. */}
        <form
          method="get"
          action={`/${locale}/apartments`}
          aria-label={t("search.legend")}
          className="relative z-10 mt-12 -mb-10 grid gap-y-5 rounded-2xl border border-line bg-white p-6 shadow-float sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-x-2 lg:p-7"
        >
          <label className="flex items-center gap-3 lg:px-5">
            <CalendarIcon />
            <span className="flex min-w-0 flex-col gap-1">
              <span className={fieldLabel}>{t("search.arrival")}</span>
              <input type="date" name="from" className={fieldControl} />
            </span>
          </label>

          <label className="flex items-center gap-3 lg:border-l lg:border-line lg:px-5">
            <CalendarIcon />
            <span className="flex min-w-0 flex-col gap-1">
              <span className={fieldLabel}>{t("search.departure")}</span>
              <input type="date" name="to" className={fieldControl} />
            </span>
          </label>

          <label className="flex items-center gap-3 lg:border-l lg:border-line lg:px-5">
            <GuestIcon />
            <span className="flex min-w-0 flex-col gap-1">
              <span className={fieldLabel}>{t("search.guests")}</span>
              <select name="guests" defaultValue="2" className={fieldControl}>
                {GUEST_OPTIONS.map((count) => (
                  <option key={count} value={count}>
                    {t("search.guestsOption", { count })}
                  </option>
                ))}
                <option value="6">{t("search.guestsMax")}</option>
              </select>
            </span>
          </label>

          <button type="submit" className="btn-primary w-full px-8 py-3.5 sm:col-span-2 lg:col-span-1 lg:w-auto">
            {tCommon("checkAvailability")}
          </button>
        </form>
      </div>
    </section>
  );
}
