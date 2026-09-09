import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import type { ReactElement } from "react";
import en from "@/messages/en.json";
import el from "@/messages/el.json";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Controls what `useSearchParams()` returns for the LocaleSwitcher query-
// string-preservation test below; left empty for every other test in this
// file, where it behaves the same as the un-mocked "outside a router"
// value (empty search params).
let mockSearch = "";
vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  return { ...actual, useSearchParams: () => new URLSearchParams(mockSearch) };
});

function renderWithIntl(
  ui: ReactElement,
  locale: string = "en",
  messages: AbstractIntlMessages = en,
) {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("Header", () => {
  it("shows the wordmark", () => {
    renderWithIntl(<Header />);
    expect(screen.getByText("Harmony Rental")).toBeInTheDocument();
  });

  it("links the main nav Apartments item to /apartments", () => {
    renderWithIntl(<Header />);
    const nav = screen.getByRole("navigation", { name: /main/i });
    // routing.localePrefix is "always", so the rendered href carries the
    // active locale ("/en/apartments") even though the component's own
    // <Link href> prop is the locale-agnostic "/apartments".
    expect(within(nav).getByRole("link", { name: "Apartments" })).toHaveAttribute(
      "href",
      "/en/apartments",
    );
  });

  it("shows a Book now call to action linking to /apartments", () => {
    renderWithIntl(<Header />);
    const bookLinks = screen.getAllByRole("link", { name: "Book now" });
    expect(bookLinks.length).toBeGreaterThan(0);
    for (const link of bookLinks) expect(link).toHaveAttribute("href", "/en/apartments");
  });

  it("offers an EN / ΕΛ locale toggle with no flags", () => {
    renderWithIntl(<Header />);
    expect(screen.getAllByText("EN").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ΕΛ").length).toBeGreaterThan(0);
    expect(screen.queryByText(/🇬🇧|🇬🇷/u)).not.toBeInTheDocument();
  });

  it("offers a no-JS mobile disclosure menu", () => {
    const { container } = renderWithIntl(<Header />);
    expect(container.querySelector("details")).toBeInTheDocument();
  });

  it("translates the mobile menu trigger for the el locale", () => {
    renderWithIntl(<Header />, "el", el);
    expect(screen.getByText("Μενού")).toBeInTheDocument();
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });

  it("keeps the query string when the locale toggle switches locale", () => {
    mockSearch = "area=alimos";
    renderWithIntl(<Header />);
    // The toggle renders twice (desktop nav + mobile disclosure menu) — both
    // must carry the query string through.
    const elLinks = screen.getAllByRole("link", { name: "ΕΛ" });
    expect(elLinks.length).toBeGreaterThan(0);
    for (const link of elLinks) expect(link).toHaveAttribute("href", "/el?area=alimos");
    mockSearch = "";
  });
});

describe("Footer", () => {
  it("shows the contact email", () => {
    renderWithIntl(<Footer />);
    expect(screen.getByText("info@harmonyrental.gr")).toBeInTheDocument();
  });

  it("never credits a developer", () => {
    renderWithIntl(<Footer />);
    expect(screen.queryByText(/Developed by/i)).not.toBeInTheDocument();
  });

  it("shows the current year in the legal line", () => {
    renderWithIntl(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`©\\s*${year}\\s*Harmony Rental`)),
    ).toBeInTheDocument();
  });
});
