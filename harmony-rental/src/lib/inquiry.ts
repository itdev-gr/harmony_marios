"use server";

import { z } from "zod";
import { getProperty } from "@/content/properties";
import { sendMail } from "./notify";

export type InquiryFieldErrors = Partial<
  Record<"name" | "email" | "from" | "to" | "guests" | "message", string>
>;

export type InquiryState = {
  ok: boolean;
  error?: string;
  fieldErrors?: InquiryFieldErrors;
};

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker (YYYY-MM-DD).");

// The property detail page posts dates and a guest count; the generic
// contact page (no propertySlug) only ever asks for name/email/message.
const bookingSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name."),
    email: z.string().trim().email("Enter a valid email address."),
    from: isoDate,
    to: isoDate,
    guests: z.coerce.number().int().min(1).max(12, "Between 1 and 12 guests."),
    message: z.string().trim().optional(),
    propertySlug: z.string().min(1),
  })
  .refine((data) => data.to > data.from, {
    message: "Departure must be after arrival.",
    path: ["to"],
  });

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  from: isoDate.optional(),
  to: isoDate.optional(),
  guests: z.coerce.number().int().min(1).max(12).optional(),
  message: z.string().trim().optional(),
  propertySlug: z.string().optional(),
});

/** FormData yields `null` for a missing field and `""` for an empty one; fold both to `undefined` so optional zod fields short-circuit correctly. */
function str(value: FormDataEntryValue | null): string | undefined {
  if (value === null) return undefined;
  const trimmed = String(value).trim();
  return trimmed === "" ? undefined : trimmed;
}

/**
 * Server action behind both the apartment booking CTA and the generic
 * contact form. `propertySlug` present ⇒ booking inquiry (dates + guests
 * required); absent ⇒ a plain "Website inquiry".
 */
export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: a field real visitors never see or fill. A bot that fills
  // every input trips it — including one that only pads it with whitespace
  // rather than real text, so this checks the raw value (not the `str()`
  // helper below, which would trim " " down to "" and miss it). Anything
  // but a truly untouched, empty submission is treated as filled, and the
  // submission is dropped silently: no validation, no email, no signal back
  // to the bot that anything was rejected.
  const honeypot = formData.get("website");
  if (honeypot !== null && String(honeypot) !== "") {
    return { ok: true };
  }

  const propertySlug = str(formData.get("propertySlug"));
  const isBooking = propertySlug !== undefined;

  const raw = {
    name: str(formData.get("name")),
    email: str(formData.get("email")),
    from: str(formData.get("from")),
    to: str(formData.get("to")),
    guests: str(formData.get("guests")),
    message: str(formData.get("message")),
    propertySlug,
  };

  const parsed = (isBooking ? bookingSchema : contactSchema).safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: InquiryFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) {
        fieldErrors[key as keyof InquiryFieldErrors] = issue.message;
      }
    }
    return { ok: false, error: "validation", fieldErrors };
  }

  const data = parsed.data;
  const property = isBooking ? getProperty(data.propertySlug!) : undefined;
  const subject = property ? `Booking inquiry — ${property.name}` : "Website inquiry";

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    property && `Property: ${property.name}`,
    "from" in data && data.from && "to" in data && data.to && `Dates: ${data.from} → ${data.to}`,
    "guests" in data && data.guests !== undefined && `Guests: ${data.guests}`,
    data.message && `Message: ${data.message}`,
  ].filter((line): line is string => Boolean(line));

  try {
    await sendMail({ subject, text: lines.join("\n"), replyTo: data.email });
  } catch {
    return { ok: false, error: "send-failed" };
  }

  return { ok: true };
}
