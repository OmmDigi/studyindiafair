import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
});

export async function sendMail(to: string, subject: string, html: string) {
  if (!env.SMTP_USER && env.NODE_ENV !== "production") {
    console.log(`[mail] to=${to} subject=${subject}\n${html}`);
    return;
  }
  await transporter.sendMail({ from: env.MAIL_FROM, to, subject, html });
}
