"use client";

import { Suspense, useActionState, useId } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Property } from "@/content/types";
import { submitInquiry, type InquiryState } from "@/lib/inquiry";

const initialState: InquiryState = { ok: false };

const fieldLabel = "text-[11px] font-medium tracking-[0.14em] text-ink/50 uppercase";
const fieldControl =
  "w-full rounded-lg border border-sea/15 bg-paper px-3.5 py-2.5 font-body text-sm text-ink outline-none placeholder:text-ink/40 focus-visible:border-terracotta";

/**
 * The booking / contact form. Used two ways: mounted with a `property` on
 * the apartment detail page (dates + guests required, subject names the
 * apartment), or bare on the contact page (name/email/message only, subject
 * "Website inquiry" — see `submitInquiry`).
 *
 * The detail route deliberately never reads `searchParams` (keeps the page
 * statically generated), so any prefill of dates/guests carried over from
 * the availability search happens here instead, client-side, via
 * `useSearchParams` — which requires the `Suspense` boundary below.
 */
export function InquiryCta({ property }: { property?: Property }) {
  return (
    <Suspense fallback={<InquiryForm property={property} />}>
      <PrefilledInquiryForm property={property} />
    </Suspense>
  );
}

function PrefilledInquiryForm({ property }: { property?: Property }) {
  // `useSearchParams` can come back null outside a router context (e.g. a
  // component test that renders `InquiryCta` without the app router) —
  // fall back to no prefill rather than throwing.
  const params = useSearchParams();
  return (
    <InquiryForm
      property={property}
      defaultFrom={params?.get("from") ?? undefined}
      defaultTo={params?.get("to") ?? undefined}
      defaultGuests={params?.get("guests") ?? undefined}
    />
  );
}

function InquiryForm({
  property,
  defaultFrom,
  defaultTo,
  defaultGuests,
}: {
  property?: Property;
  defaultFrom?: string;
  defaultTo?: string;
  defaultGuests?: string;
}) {
  const t = useTranslations("inquiry");
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const honeypotId = useId();

  if (state.ok) {
    return (
      <p role="status" className="mt-6 rounded-xl border border-sea/10 bg-sand px-5 py-4 text-sm text-ink/80">
        {t("success")}
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4" noValidate>
      {property && <input type="hidden" name="propertySlug" value={property.slug} />}

      {/* Honeypot: hidden from sighted and AT users alike, real visitors
          never fill it. A filled value tells submitInquiry to drop the
          submission silently. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor={honeypotId}>{t("honeypotLabel")}</label>
        <input id={honeypotId} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>{t("name")}</span>
        <input name="name" type="text" required minLength={2} className={fieldControl} />
      </label>
      {state.fieldErrors?.name && (
        <p className="-mt-2 text-xs text-terracotta">{state.fieldErrors.name}</p>
      )}

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>{t("email")}</span>
        <input name="email" type="email" required className={fieldControl} />
      </label>
      {state.fieldErrors?.email && (
        <p className="-mt-2 text-xs text-terracotta">{state.fieldErrors.email}</p>
      )}

      {property && (
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={fieldLabel}>{t("from")}</span>
            <input
              name="from"
              type="date"
              required
              defaultValue={defaultFrom}
              className={fieldControl}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={fieldLabel}>{t("to")}</span>
            <input name="to" type="date" required defaultValue={defaultTo} className={fieldControl} />
          </label>
        </div>
      )}
      {state.fieldErrors?.to && <p className="-mt-2 text-xs text-terracotta">{state.fieldErrors.to}</p>}

      {property && (
        <label className="flex flex-col gap-1.5">
          <span className={fieldLabel}>{t("guests")}</span>
          <input
            name="guests"
            type="number"
            min={1}
            max={12}
            required
            defaultValue={defaultGuests ?? "2"}
            className={fieldControl}
          />
        </label>
      )}
      {state.fieldErrors?.guests && (
        <p className="-mt-2 text-xs text-terracotta">{state.fieldErrors.guests}</p>
      )}

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>{t("message")}</span>
        <textarea
          name="message"
          rows={4}
          placeholder={t("messagePlaceholder")}
          className={`${fieldControl} resize-none`}
        />
      </label>

      {state.error === "send-failed" && (
        <p className="text-xs text-terracotta">{t("errors.sendFailed")}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-center text-sm font-medium text-paper transition hover:bg-terracotta/90 disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
