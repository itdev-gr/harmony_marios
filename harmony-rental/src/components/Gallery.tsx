"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Property } from "@/content/types";
import { PhotoPlate } from "./PhotoPlate";

function ArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white font-display text-lg font-extrabold text-neutral-950 shadow-card transition hover:bg-brand hover:text-white ${
        direction === "prev" ? "left-3" : "right-3"
      }`}
    >
      <span aria-hidden="true">{direction === "prev" ? "←" : "→"}</span>
    </button>
  );
}

/**
 * Filmstrip gallery for an apartment: one large stage with prev/next arrows
 * and an "N / M" counter, plus a thumbnail strip beneath it. A single photo
 * drops the controls; no photos at all keeps the monogram plate, so the page
 * never collapses while the inventory waits on photography.
 */
export function Gallery({ property }: { property: Property }) {
  const t = useTranslations("apartments.detail");
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState<number[]>([]);

  const photos = property.images;
  const total = photos.length;
  const initial = property.name.charAt(0);

  const step = useCallback(
    (delta: number) => setCurrent((prev) => (prev + delta + total) % total),
    [total],
  );

  if (total === 0) {
    return (
      <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-line md:aspect-[21/9]">
        <PhotoPlate initial={initial} caption={t("photosSoon")} />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t("gallery", { name: property.name })}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-neutral-100 md:aspect-[21/9]">
        {failed.includes(current) ? (
          <PhotoPlate initial={initial} caption={t("photosSoon")} />
        ) : (
          <Image
            key={photos[current]}
            src={photos[current]}
            alt={t("photoOf", { name: property.name, index: current + 1 })}
            fill
            priority={current === 0}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
            onError={() => setFailed((prev) => [...prev, current])}
          />
        )}

        {total > 1 && (
          <>
            <ArrowButton direction="prev" label={t("prevPhoto")} onClick={() => step(-1)} />
            <ArrowButton direction="next" label={t("nextPhoto")} onClick={() => step(1)} />
            <p
              aria-live="polite"
              className="absolute right-3 bottom-3 z-10 rounded-full bg-neutral-950/75 px-3 py-1 font-display text-xs font-bold text-white"
            >
              {current + 1} / {total}
            </p>
          </>
        )}
      </div>

      {total > 1 && (
        <div role="tablist" aria-label={t("thumbnails")} className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {photos.map((src, index) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={t("photoOf", { name: property.name, index: index + 1 })}
              onClick={() => setCurrent(index)}
              className={`relative h-16 w-[92px] shrink-0 overflow-hidden rounded-xl border-2 transition ${
                index === current ? "border-brand" : "border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              {failed.includes(index) ? (
                <PhotoPlate initial={initial} />
              ) : (
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="92px"
                  className="object-cover"
                  onError={() => setFailed((prev) => [...prev, index])}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
