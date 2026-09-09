import type { ReactNode } from "react";

type Tone = "sand" | "paper" | "sea";

const TONE: Record<Tone, { section: string; eyebrow: string; title: string; lead: string }> = {
  sand: {
    section: "bg-sand",
    eyebrow: "text-terracotta",
    title: "text-sea",
    lead: "text-ink/70",
  },
  paper: {
    section: "bg-paper",
    eyebrow: "text-terracotta",
    title: "text-sea",
    lead: "text-ink/70",
  },
  sea: {
    section: "bg-sea",
    eyebrow: "text-sand/60",
    title: "text-sand",
    lead: "text-sand/75",
  },
};

/**
 * The one section shell every page block uses: consistent rhythm (py-20/28),
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
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: ReactNode;
  tone?: Tone;
  children?: ReactNode;
}) {
  const styles = TONE[tone];

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className={`text-xs font-medium tracking-[0.18em] uppercase ${styles.eyebrow}`}>
                {eyebrow}
              </p>
            )}
            <h2
              id={`${id}-title`}
              className={`mt-4 font-display text-3xl leading-tight text-balance md:text-4xl lg:text-5xl ${styles.title}`}
            >
              {title}
            </h2>
            {lead && <p className={`mt-5 text-base leading-relaxed md:text-lg ${styles.lead}`}>{lead}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {children && <div className="mt-12 md:mt-16">{children}</div>}
      </div>
    </section>
  );
}
