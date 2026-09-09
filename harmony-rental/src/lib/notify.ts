import nodemailer from "nodemailer";

type MailOptions = {
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * Sends a plain-text notification to the Harmony Rental inbox. SMTP
 * credentials are chosen at deploy time via the Vercel Marketplace (see
 * `.env.example`) — this file stays provider-agnostic.
 *
 * When `SMTP_HOST` is unset we log the composed message instead of
 * throwing, so the booking flow can be exercised end-to-end without real
 * mail infrastructure — EXCEPT in a real production deploy, where a
 * missing `SMTP_HOST` is a misconfiguration, not a dev convenience: we
 * throw instead, so `submitInquiry`'s catch reports send-failed to the
 * guest rather than silently swallowing their inquiry as a false success.
 * `VERCEL_ENV` distinguishes an actual production deploy from a Vercel
 * preview (which also has `NODE_ENV === "production"`); it is unset for
 * local `next start`, which we treat as non-production so that keeps
 * working without SMTP configured.
 */
export async function sendMail(opts: MailOptions): Promise<void> {
  if (!process.env.SMTP_HOST) {
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production") {
      throw new Error("[notify] SMTP_HOST is not set in production — refusing to fake a send.");
    }

    console.info("[notify] SMTP_HOST not set — logging inquiry instead of sending email:", opts);
    return;
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "info@harmonyrental.gr",
    ...opts,
  });
}
