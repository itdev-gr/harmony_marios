import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { display, body } from "../fonts";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { BASE_URL } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Harmony Rental",
  description: "Harmony Rental",
  openGraph: {
    siteName: "Harmony Rental",
    type: "website",
    images: ["/images/coastal-harmony-alimos/01.jpg"],
  },
};

/** schema.org LodgingBusiness card for the operator — rendered once per page. */
const ORGANIZATION_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Harmony Rental",
  url: BASE_URL,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vizantiou 2",
    addressLocality: "Athens",
    postalCode: "117 41",
    addressCountry: "GR",
  },
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ORGANIZATION_JSON_LD }}
        />
        <NextIntlClientProvider>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
