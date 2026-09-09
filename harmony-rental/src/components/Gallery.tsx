"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Property } from "@/content/types";

const MAX_TILES = 5;

/**
 * The calm monogram plate we show instead of a broken image — the same one the
 * cards use, since the photo slots (/images/<slug>/NN.jpg) are still with the
 * client.
 */
function PhotoPlate({ initial, caption }: { initial: string; caption?: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-neutral-100">
      <span aria-hidden="true" className="font-display text-6xl font-extrabold text-neutral-300">
        {initial}
      </span>
      {caption && (
        <p className="font-display text-xs font-bold tracking-wide text-neutral-400 uppercase">
          {caption}
        </p>
      )}
    </div>
  );
}

/**
 * Photo grid for an apartment: the first shot runs the full width, the rest
 * pair up beneath it. One image (or none) still fills the same frame, so the
 * page never collapses while the inventory waits on photography.
 */
export function Gallery({ property }: { property: Property }) {
  const t = useTranslations("apartments.detail");
  const [failed, setFailed] = useState<number[]>([]);

  const tiles = property.images.slice(0, MAX_TILES);
  const initial = property.name.charAt(0);

  if (tiles.length === 0) {
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
      className="grid gap-3 sm:grid-cols-2"
    >
      {tiles.map((src, index) => {
        const isLead = index === 0;
        return (
          <div
            key={src}
            className={`relative overflow-hidden rounded-2xl border border-line bg-neutral-100 ${
              isLead ? "aspect-[16/9] sm:col-span-2 md:aspect-[21/9]" : "aspect-[4/3]"
            }`}
          >
            {failed.includes(index) ? (
              <PhotoPlate initial={initial} caption={isLead ? t("photosSoon") : undefined} />
            ) : (
              <Image
                src={src}
                alt={t("photoOf", { name: property.name, index: index + 1 })}
                fill
                priority={isLead}
                sizes={isLead ? "(min-width: 1024px) 1024px, 100vw" : "(min-width: 640px) 512px, 100vw"}
                className="object-cover"
                onError={() => setFailed((prev) => [...prev, index])}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
