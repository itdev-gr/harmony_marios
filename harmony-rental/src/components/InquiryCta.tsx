"use client";

import { Suspense, useActionState, useId } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Property } from "@/content/types";
import { submitInquiry, type InquiryState } from "@/lib/inquiry";

const initialState: InquiryState = { ok: false };

const fieldLabel = "field-label";
const fieldControl = "field-control";

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

/** A field's validation error, announced to assistive tech via `role="alert"` and wired to its input with `aria-describedby`. Renders nothing when there is no message. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="-mt-2 text-xs font-semibold text-danger">
      {message}
    </p>
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
  const uid = useId();
  const errors = state.fieldErrors ?? {};
  const errorId = {
    name: `${uid}-err-name`,
    email: `${uid}-err-email`,
    from: `${uid}-err-from`,
    to: `${uid}-err-to`,
    guests: `${uid}-err-guests`,
  };

  if (state.ok) {
    return (
      <p
        role="status"
        className="mt-6 rounded-2xl border border-brand bg-pastel-green px-5 py-4 text-sm font-medium text-brand-tint"
      >
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
        <label htmlFor={`${uid}-honeypot`}>{t("honeypotLabel")}</label>
        <input id={`${uid}-honeypot`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>{t("name")}</span>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? errorId.name : undefined}
          className={fieldControl}
        />
      </label>
      <FieldError id={errorId.name} message={errors.name} />

      <label className="flex flex-col gap-1.5">
        <span className={fieldLabel}>{t("email")}</span>
        <input
          name="email"
          type="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? errorId.email : undefined}
          className={fieldControl}
        />
      </label>
      <FieldError id={errorId.email} message={errors.email} />

      {property && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="flex flex-col gap-1.5">
              <span className={fieldLabel}>{t("from")}</span>
              <input
                name="from"
                type="date"
                required
                defaultValue={defaultFrom}
                aria-invalid={Boolean(errors.from)}
                aria-describedby={errors.from ? errorId.from : undefined}
                className={fieldControl}
              />
            </label>
            <FieldError id={errorId.from} message={errors.from} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex flex-col gap-1.5">
              <span className={fieldLabel}>{t("to")}</span>
              <input
                name="to"
                type="date"
                required
                defaultValue={defaultTo}
                aria-invalid={Boolean(errors.to)}
                aria-describedby={errors.to ? errorId.to : undefined}
                className={fieldControl}
              />
            </label>
            <FieldError id={errorId.to} message={errors.to} />
          </div>
        </div>
      )}

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
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? errorId.guests : undefined}
            className={fieldControl}
          />
        </label>
      )}
      <FieldError id={errorId.guests} message={errors.guests} />

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
        <p role="alert" className="text-xs font-semibold text-danger">
          {t("errors.sendFailed")}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary mt-2 w-full disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
