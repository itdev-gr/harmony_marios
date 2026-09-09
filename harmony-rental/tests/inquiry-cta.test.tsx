import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import type { ReactElement } from "react";
import en from "@/messages/en.json";
import { getProperty } from "@/content/properties";
import { InquiryCta } from "@/components/InquiryCta";

// submitInquiry is imported and called directly by InquiryCta (no RSC/network
// boundary under vitest), so these render tests exercise the real server
// action. None of the paths below reach sendMail — validation failures never
// call it, and the honeypot path returns before validation even runs — so
// nothing here needs `@/lib/notify` mocked.

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

const property = getProperty("coastal-harmony-alimos")!;

describe("InquiryCta", () => {
  it("renders only name/email/message for the generic contact variant (no property)", () => {
    const { container } = renderWithIntl(<InquiryCta />);
    expect(screen.getByLabelText(en.inquiry.name)).toBeInTheDocument();
    expect(screen.getByLabelText(en.inquiry.email)).toBeInTheDocument();
    expect(screen.queryByLabelText(en.inquiry.from)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(en.inquiry.to)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(en.inquiry.guests)).not.toBeInTheDocument();
    expect(container.querySelector('input[name="propertySlug"]')).not.toBeInTheDocument();
  });

  it("wires every field's validation error to its input via aria-invalid/aria-describedby and role=alert, including 'from'", async () => {
    renderWithIntl(<InquiryCta property={property} />);

    const nameInput = screen.getByLabelText(en.inquiry.name);
    const emailInput = screen.getByLabelText(en.inquiry.email);
    const fromInput = screen.getByLabelText(en.inquiry.from);
    const toInput = screen.getByLabelText(en.inquiry.to);

    // Everything invalid/blank: name too short, email malformed, dates
    // never filled in. `noValidate` on the form means the `required`
    // attributes don't block this from reaching the server action.
    fireEvent.change(nameInput, { target: { value: "J" } });
    fireEvent.change(emailInput, { target: { value: "not-an-email" } });

    fireEvent.click(screen.getByRole("button", { name: en.inquiry.submit }));

    await waitFor(() => expect(nameInput).toHaveAttribute("aria-invalid", "true"));

    for (const input of [nameInput, emailInput, fromInput, toInput]) {
      expect(input).toHaveAttribute("aria-invalid", "true");
      const describedBy = input.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
      const error = document.getElementById(describedBy!);
      expect(error).toHaveAttribute("role", "alert");
      expect(error?.textContent?.length).toBeGreaterThan(0);
    }
  });

  it("clears a field's error state once the resubmitted form passes validation", async () => {
    renderWithIntl(<InquiryCta property={property} />);

    fireEvent.change(screen.getByLabelText(en.inquiry.name), { target: { value: "J" } });
    fireEvent.click(screen.getByRole("button", { name: en.inquiry.submit }));

    const nameInput = await screen.findByLabelText(en.inquiry.name);
    await waitFor(() => expect(nameInput).toHaveAttribute("aria-invalid", "true"));

    fireEvent.change(nameInput, { target: { value: "Jamie Rivera" } });
    fireEvent.change(screen.getByLabelText(en.inquiry.email), {
      target: { value: "jamie@example.com" },
    });
    fireEvent.change(screen.getByLabelText(en.inquiry.from), { target: { value: "2026-10-01" } });
    fireEvent.change(screen.getByLabelText(en.inquiry.to), { target: { value: "2026-10-05" } });
    fireEvent.click(screen.getByRole("button", { name: en.inquiry.submit }));

    expect(await screen.findByRole("status")).toHaveTextContent(en.inquiry.success);
  });

  it("drops a whitespace-only honeypot submission silently — success shown, no field errors", async () => {
    const { container } = renderWithIntl(<InquiryCta property={property} />);

    // The honeypot input is visually/AT hidden but still present in the DOM
    // for a script (bot) to fill — pad it with whitespace, the case the
    // silent-drop fix specifically covers.
    const honeypot = container.querySelector('input[name="website"]') as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    fireEvent.change(honeypot, { target: { value: " " } });

    // Every other field is left blank — if the honeypot didn't short-circuit
    // before validation, this would come back with field errors instead.
    fireEvent.click(screen.getByRole("button", { name: en.inquiry.submit }));

    expect(await screen.findByRole("status")).toHaveTextContent(en.inquiry.success);
  });
});
