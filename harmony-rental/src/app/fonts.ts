import { Urbanist, Inter } from "next/font/google";

/** Carento's typeface. No Greek subset, so Inter backs it up for `el`. */
export const display = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
});

/** Greek-glyph fallback only — never the leading family. */
export const body = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
});
