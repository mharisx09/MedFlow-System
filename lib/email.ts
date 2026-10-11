import { Resend } from "resend";
import nodemailer from "nodemailer";

export interface SendEmailArgs {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

const DEFAULT_FROM =
  process.env.SMTP_FROM || "Med Flow System <noreply@medflowsystem.co>";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY!);
  }
  return resendClient;
}

let transporter: nodemailer.Transporter | null = null;

function getSmtpTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    });
  }
  return transporter;
}

/**
 * Send an email. Uses Resend when RESEND_API_KEY is set, otherwise falls back
 * to SMTP via nodemailer.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailArgs): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    await getResend().emails.send({
      from: DEFAULT_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    });
    return;
  }

  await getSmtpTransporter().sendMail({
    from: DEFAULT_FROM,
    to,
    subject,
    html,
    text,
  });
}

export interface LeadInfo {
  type: string;
  name: string;
  email: string;
  phone?: string;
  practiceName?: string;
  specialty?: string;
  message?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Notify the site owner about a new lead AND send the visitor a thank-you
 * email. Both sends are fire-and-forget safe: errors are logged, never thrown.
 */
export async function sendLeadNotifications(lead: LeadInfo): Promise<void> {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  const rows: Array<[string, string | undefined]> = [
    ["Form type", lead.type],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Practice name", lead.practiceName],
    ["Specialty", lead.specialty],
    ["Message", lead.message],
  ];
  const filled = rows.filter(([, v]) => v && v.trim().length > 0);

  const ownerHtml = `
    <h2>New ${escapeHtml(lead.type)} lead — Med Flow System</h2>
    <table>${filled
      .map(
        ([label, value]) =>
          `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(
            value!,
          )}</td></tr>`,
      )
      .join("")}</table>
  `;

  const ownerText = `New ${lead.type} lead — Med Flow System\n\n${filled
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")}`;

  const visitorHtml = `
    <p>Hi ${escapeHtml(lead.name)},</p>
    <p>Thank you for contacting <strong>Med Flow System</strong>. We've received your message and a member of our team will be in touch shortly.</p>
    <p>If your matter is urgent, call us at <a href="tel:+12138906560">+1 (213) 890-6560</a>.</p>
    <p>Best regards,<br />The Med Flow System Team</p>
  `;

  const jobs: Promise<void>[] = [];

  if (notifyEmail) {
    jobs.push(
      sendEmail({
        to: notifyEmail,
        subject: `New ${lead.type} lead: ${lead.name}`,
        html: ownerHtml,
        text: ownerText,
      }).catch((err) => {
        console.error("Owner lead notification email failed:", err);
      }),
    );
  } else {
    console.warn("NOTIFY_EMAIL is not set; skipping owner lead notification.");
  }

  jobs.push(
    sendEmail({
      to: lead.email,
      subject: "Thanks for contacting Med Flow System",
      html: visitorHtml,
      text: `Hi ${lead.name},\n\nThank you for contacting Med Flow System. We've received your message and a member of our team will be in touch shortly.\n\nIf your matter is urgent, call us at +1 (213) 890-6560.\n\nBest regards,\nThe Med Flow System Team`,
    }).catch((err) => {
      console.error("Visitor thank-you email failed:", err);
    }),
  );

  await Promise.all(jobs);
}
