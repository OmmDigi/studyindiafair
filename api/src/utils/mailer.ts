import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
});

type MailExtra = { cc?: string[]; bcc?: string[]; replyTo?: string };

export async function sendMail(to: string | string[], subject: string, html: string, extra: MailExtra = {}) {
  if (!env.SMTP_USER && env.NODE_ENV !== "production") {
    console.log(`[mail] to=${to} cc=${extra.cc ?? ""} bcc=${extra.bcc ?? ""} subject=${subject}\n${html}`);
    return;
  }
  await transporter.sendMail({ from: env.MAIL_FROM, to, subject, html, ...extra });
}
