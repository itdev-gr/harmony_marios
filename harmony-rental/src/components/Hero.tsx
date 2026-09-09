import { useLocale, useTranslations } from "next-intl";

const GUEST_OPTIONS = [1, 2, 3, 4, 5] as const;

const fieldLabel = "text-[11px] font-medium tracking-[0.14em] text-ink/50 uppercase";
const fieldControl =
  "w-full bg-transparent font-body text-sm text-ink outline-none placeholder:text-ink/40";

export function Hero() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="relative isolate overflow-hidden bg-sea text-paper">
      {/* hero photo slot: /images/hero.jpg — client to supply a golden-hour
          Riviera / Acropolis shot. Until it exists the ground is layered CSS
          only, so nothing 404s and the section never collapses. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_15%_0%,#1c5b68_0%,#123f4a_45%,#0d2f38_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.55] mix-blend-soft-light bg-[repeating-linear-gradient(115deg,rgba(247,244,239,0.10)_0px,rgba(247,244,239,0.10)_1px,transparent_1px,transparent_9px)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-terracotta/25 blur-3xl"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-sand/25 bg-sand/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.16em] text-sand uppercase">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terracotta" />
          {t("heroBadge")}
        </p>

        <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[0.98] text-balance text-sand md:text-6xl lg:text-7xl">
          {t("heroTitle")}
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-sand/80 md:text-lg">
          {t("heroSubtitle")}
        </p>

        {/* No-JS availability form: a plain GET to the apartments page, which
            reads from/to/guests off the query string. */}
        <form
          method="get"
          action={`/${locale}/apartments`}
          aria-label={t("search.legend")}
          className="mt-12 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-sand/20 bg-mist/70 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto]"
        >
          <label className="flex flex-col gap-1.5 bg-paper px-5 py-4">
            <span className={fieldLabel}>{t("search.arrival")}</span>
            <input type="date" name="from" className={fieldControl} />
          </label>

          <label className="flex flex-col gap-1.5 bg-paper px-5 py-4">
            <span className={fieldLabel}>{t("search.departure")}</span>
            <input type="date" name="to" className={fieldControl} />
          </label>

          <label className="flex flex-col gap-1.5 bg-paper px-5 py-4">
            <span className={fieldLabel}>{t("search.guests")}</span>
            <select name="guests" defaultValue="2" className={fieldControl}>
              {GUEST_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {t("search.guestsOption", { count })}
                </option>
              ))}
              <option value="6">{t("search.guestsMax")}</option>
            </select>
          </label>

          <button
            type="submit"
            className="bg-terracotta px-7 py-4 font-body text-sm font-medium text-paper transition hover:bg-terracotta/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand"
          >
            {tCommon("checkAvailability")}
          </button>
        </form>
      </div>
    </section>
  );
}
