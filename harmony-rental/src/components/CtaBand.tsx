import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Closing "planning a stay?" band, shared by the home and about pages. */
export function CtaBand({ id = "cta" }: { id?: string }) {
  const t = useTranslations("home.cta");

  return (
    <section aria-labelledby={`${id}-title`} className="bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 md:pb-24">
        <div className="flex flex-col gap-8 rounded-2xl bg-brand px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <div className="max-w-xl">
            <h2
              id={`${id}-title`}
              className="font-display text-3xl font-bold tracking-tight text-black md:text-4xl"
            >
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-tint">{t("body")}</p>
          </div>
          <Link href="/contact" className="btn-dark shrink-0 px-7 py-3.5 hover:bg-white">
            {t("action")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
