import type { Metadata } from "next";
import { display, body } from "../fonts";
import "../globals.css";

// `/stay` sits outside the `[locale]` tree (the middleware excludes it — see
// src/middleware.ts), so it gets its own root layout with its own <html>/
// <body> rather than nesting under `[locale]/layout.tsx`. Next.js supports
// multiple root layouts for exactly this case (see layout.md "Root Layout").
export const metadata: Metadata = {
  title: "Harmony Rental — Your stay",
  // Belt-and-braces default; the page itself sets this again per token.
  robots: { index: false, follow: false },
};

export default function StayLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-body text-neutral-700">
        {/* Minimal shell: wordmark only, no nav — guests land here from a
            direct link in their booking confirmation, not by browsing. */}
        <header className="border-b border-line bg-white">
          <div className="mx-auto flex max-w-3xl items-center px-6 py-5">
            <span className="flex items-center gap-1.5 font-display text-xl font-extrabold tracking-tight text-neutral-950">
              Harmony Rental
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            </span>
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
