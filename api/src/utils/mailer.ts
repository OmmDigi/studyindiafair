import axios from "axios";
import nodemailer from "nodemailer";
import { env } from "../config/env.js";

type MailExtra = { cc?: string[]; bcc?: string[]; replyTo?: string };
type Mail = { to: string[]; subject: string; html: string } & MailExtra;
type Provider = { configured: boolean; send: (mail: Mail) => Promise<void> };

const smtpTransport = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
});

const smtp: Provider = {
  configured: !!env.SMTP_USER,
  async send({ to, ...rest }) {
    await smtpTransport.sendMail({ from: env.MAIL_FROM, to, ...rest });
  },
};

// "Name <email>" -> { name, email }
function parseAddress(address: string) {
  const match = address.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return match ? { name: match[1].replace(/^"|"$/g, "") || undefined, email: match[2] } : { email: address.trim() };
}

const toList = (emails?: string[]) => (emails?.length ? emails.map((email) => ({ email })) : undefined);

const brevoClient = axios.create({
  baseURL: "https://api.brevo.com/v3",
  timeout: 15000,
  headers: { "api-key": env.BREVO_API_KEY, accept: "application/json", "content-type": "application/json" },
});

const brevo: Provider = {
  configured: !!env.BREVO_API_KEY,
  async send({ to, subject, html, cc, bcc, replyTo }) {
    try {
      await brevoClient.post("/smtp/email", {
        sender: parseAddress(env.MAIL_FROM),
        to: toList(to),
        cc: toList(cc),
        bcc: toList(bcc),
        replyTo: replyTo ? parseAddress(replyTo) : undefined,
        subject,
        htmlContent: html,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.message ?? err.message;
        throw new Error(`Brevo: ${detail}`);
      }
      throw err;
    }
  },
};

const provider = env.MAIL_PROVIDER === "brevo" ? brevo : smtp;

export async function sendMail(to: string | string[], subject: string, html: string, extra: MailExtra = {}) {
  if (!provider.configured && env.NODE_ENV !== "production") {
    console.log(`[mail:${env.MAIL_PROVIDER}] to=${to} cc=${extra.cc ?? ""} bcc=${extra.bcc ?? ""} subject=${subject}\n${html}`);
    return;
  }
  await provider.send({ to: Array.isArray(to) ? to : [to], subject, html, ...extra });
}
