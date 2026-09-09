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
 * When `SMTP_HOST` is unset (local dev, or a preview deploy without mail
 * credentials configured yet) we log the composed message instead of
 * throwing, so the booking flow can be exercised end-to-end without real
 * mail infrastructure.
 */
export async function sendMail(opts: MailOptions): Promise<void> {
  if (!process.env.SMTP_HOST) {
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
