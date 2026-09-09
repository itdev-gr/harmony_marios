import { useTranslations } from "next-intl";
import type { Property } from "@/content/types";

/**
 * Mobile-only bar pinned to the bottom of an apartment page: the name you are
 * looking at, and one tap down to the booking slot. A plain anchor, so it works
 * before any JavaScript arrives — and `sticky` rather than `fixed`, so it lets
 * go at the end of the page instead of sitting on top of the footer.
 */
export function StickyBookBar({ property }: { property: Property }) {
  const t = useTranslations("common");

  return (
    <div className="sticky bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <p className="min-w-0 truncate font-display text-base font-bold text-neutral-950">
          {property.name}
        </p>
        <a href="#book" className="btn-primary btn-sm shrink-0">
          {t("requestToBook")}
        </a>
      </div>
    </div>
  );
}
