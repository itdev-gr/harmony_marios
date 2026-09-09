import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Service = { slug: string; title: string; description: string };

const KeyIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <circle cx="8" cy="14" r="4" />
    <path d="M10.9 11.1 20 2m-3 3 2 2m-4 1 2 2" strokeLinecap="round" />
  </svg>
);

const TrowelIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M3.5 20.5 9 15m0 0-2.5-2.5m2.5 2.5L11.5 17" strokeLinecap="round" />
    <path d="M10 8.5 15.5 3l5.5 5.5-5.5 5.5z" strokeLinejoin="round" />
  </svg>
);

const CompassIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" strokeLinejoin="round" />
  </svg>
);

const HouseIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" strokeLinejoin="round" />
    <path d="M9.5 21v-6h5v6" />
  </svg>
);

const BoatIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-6 w-6">
    <path d="M3 17.5c1.5 0 1.5 1.5 3 1.5s1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5" strokeLinecap="round" />
    <path d="M5.5 14.5h13L16 9H8z" strokeLinejoin="round" />
    <path d="M12 9V3l5 4.5" strokeLinejoin="round" />
  </svg>
);

// Each legacy service maps onto one of the two audience hubs — guests
// (apartments / experiences) or owners (renovation / management).
const SERVICE_META: Record<string, { href: string; icon: ReactElement }> = {
  "apartment-rental": { href: "/apartments", icon: KeyIcon },
  "apartment-renovation": { href: "/owners", icon: TrowelIcon },
  tour: { href: "/experiences", icon: CompassIcon },
  "home-airbnb": { href: "/owners", icon: HouseIcon },
  "boat-tour": { href: "/experiences", icon: BoatIcon },
};

export function ServiceRow({ service }: { service: Service }) {
  const t = useTranslations("services");
  const meta = SERVICE_META[service.slug];

  return (
    <div className="group relative flex h-full flex-col gap-4 rounded-2xl border border-mist bg-sand/40 p-7 transition hover:border-sea/20 hover:bg-sand">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-sea ring-1 ring-mist">
        {meta?.icon ?? KeyIcon}
      </span>

      <h3 className="font-display text-xl text-sea">{service.title}</h3>
      <p className="text-sm leading-relaxed text-ink/70">{service.description}</p>

      {meta && (
        <Link
          href={meta.href}
          className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-terracotta transition after:absolute after:inset-0 hover:gap-3"
        >
          {t("more")}
          <span className="sr-only"> — {service.title}</span>
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
