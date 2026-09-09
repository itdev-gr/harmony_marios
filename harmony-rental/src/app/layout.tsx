import type { Metadata } from "next";
import { display, body } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harmony Rental",
  description: "Harmony Rental",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
