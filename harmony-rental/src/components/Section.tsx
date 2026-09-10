import type { ReactNode } from "react";

/** `sand | paper` are the original names (sand now maps to the pale blue
 *  cream); `green | blue` are the alternating pastel section grounds. */
type Tone = "sand" | "paper" | "green" | "blue";

const TONE: Record<Tone, { section: string; eyebrow: string; title: string; lead: string }> = {
  paper: {
    section: "bg-white",
    eyebrow: "text-brand-tint",
    title: "text-neutral-950",
    lead: "text-neutral-500",
  },
  sand: {
    section: "bg-pastel-cream",
    eyebrow: "text-brand-tint",
    title: "text-neutral-950",
    lead: "text-neutral-500",
  },
  green: {
    section: "bg-pastel-green",
    eyebrow: "text-brand-tint",
    title: "text-neutral-950",
    lead: "text-neutral-700",
  },
  blue: {
    section: "bg-pastel-blue",
    eyebrow: "text-brand-tint",
    title: "text-neutral-950",
    lead: "text-neutral-700",
  },
};

/**
 * The one section shell every page block uses: consistent rhythm (py-20/24),
 * one container width, eyebrow → display heading → lead, plus an optional
 * action that sits beside the heading on wide screens.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  action,
  tone = "sand",
  align = "left",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  tone?: Tone;
  /** "center" centers the header block — for sections without a side action. */
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const styles = TONE[tone];
  const centered = align === "center";

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <div
          className={
            centered
              ? "flex flex-col items-center gap-6 text-center"
              : "flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          }
        >
          <div className="max-w-2xl">
            {eyebrow && (
              <p className={`font-display text-sm font-bold tracking-wide uppercase ${styles.eyebrow}`}>
                {eyebrow}
              </p>
            )}
            <h2
              id={`${id}-title`}
              className={`mt-3 font-display text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl lg:text-[44px] ${styles.title}`}
            >
              {title}
            </h2>
            {lead && (
              <p className={`mt-5 text-base leading-relaxed md:text-lg ${styles.lead}`}>{lead}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {children && <div className="mt-12 md:mt-14">{children}</div>}
      </div>
    </section>
  );
}
