import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import type { EditorContent } from "../../utils/editorContent.js";
import { editorToHtml, escapeHtml } from "../../utils/editorHtml.js";
import { sendMail } from "../../utils/mailer.js";
import {
  BASE_VARIABLES,
  TEMPLATE_TYPES,
  VARIABLE_PATTERN,
  type SaveTemplateInput,
  type TemplateType,
  type TestTemplateInput,
} from "./constant.js";

type FormRow = { id: number; name: string; form_id: string; enquiry_count: number };

type TemplateRow = {
  id: number;
  form_id: number;
  type: TemplateType;
  is_enabled: boolean;
  to_emails: string[];
  recipient_field: string | null;
  cc: string[];
  bcc: string[];
  reply_to: string | null;
  subject: string;
  body: EditorContent;
  body_html: string;
  updated_at: Date;
};

type EnquiryRow = {
  id: number;
  name: string;
  phone: string;
  details: Record<string, unknown>;
  created_at: Date;
};

type Template = Pick<TemplateRow, "type" | "to_emails" | "recipient_field" | "cc" | "bcc" | "reply_to" | "subject" | "body_html">;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function getForm(formId: number) {
  const { rows } = await query<FormRow>(
    `SELECT f.id, f.name, f.form_id,
      (SELECT COUNT(*)::int FROM form_enquiries e WHERE e.form_id = f.form_id) AS enquiry_count
     FROM forms f WHERE f.id = $1`,
    [formId]
  );
  if (!rows[0]) throw new AppError(404, "Form not found");
  return rows[0];
}

async function latestEnquiry(form: FormRow) {
  const { rows } = await query<EnquiryRow>(
    "SELECT id, name, phone, details, created_at FROM form_enquiries WHERE form_id = $1 ORDER BY created_at DESC, id DESC LIMIT 1",
    [form.form_id]
  );
  if (!rows[0]) throw new AppError(422, "Submit at least one enquiry for this form before setting up emails");
  return rows[0];
}

async function variableNames(form: FormRow) {
  const { rows } = await query<{ key: string }>(
    "SELECT DISTINCT jsonb_object_keys(details) AS key FROM form_enquiries WHERE form_id = $1 ORDER BY key",
    [form.form_id]
  );
  return [...new Set([...BASE_VARIABLES, ...rows.map((r) => r.key)])];
}

const toText = (value: unknown) =>
  value === null || value === undefined ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);

function buildVariables(form: Pick<FormRow, "name" | "form_id">, enquiry: EnquiryRow) {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(enquiry.details)) vars[key] = toText(value);
  return {
    ...vars,
    name: enquiry.name,
    phone: enquiry.phone,
    form_name: form.name,
    form_id: form.form_id,
    submitted_at: enquiry.created_at.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };
}

const fillText = (text: string, vars: Record<string, string>) =>
  text.replace(VARIABLE_PATTERN, (_, key: string) => vars[key] ?? "").replace(/[\r\n]+/g, " ").trim();

const fillHtml = (html: string, vars: Record<string, string>) =>
  html.replace(VARIABLE_PATTERN, (_, key: string) => escapeHtml(vars[key] ?? "").replace(/\n/g, "<br>"));

const layout = (html: string) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#222">${html}</div>`;

function render(template: Template, vars: Record<string, string>) {
  const replyTo = template.reply_to ? fillText(template.reply_to, vars) : "";
  return {
    subject: fillText(template.subject, vars),
    html: layout(fillHtml(template.body_html, vars)),
    cc: template.cc,
    bcc: template.bcc,
    replyTo: EMAIL.test(replyTo) ? replyTo : undefined,
  };
}

function recipients(template: Template, vars: Record<string, string>) {
  if (template.type === "admin") return template.to_emails;
  const value = template.recipient_field ? vars[template.recipient_field]?.trim() : "";
  return value && EMAIL.test(value) ? [value.toLowerCase()] : [];
}

export async function listForms() {
  const { rows } = await query(
    `SELECT f.id, f.name, f.form_id,
      (SELECT COUNT(*)::int FROM form_enquiries e WHERE e.form_id = f.form_id) AS enquiry_count,
      (SELECT to_jsonb(t) FROM (SELECT is_enabled, updated_at FROM form_email_templates WHERE form_id = f.id AND type = 'admin') t) AS admin,
      (SELECT to_jsonb(t) FROM (SELECT is_enabled, updated_at FROM form_email_templates WHERE form_id = f.id AND type = 'student') t) AS student
     FROM forms f ORDER BY f.name ASC`
  );
  return rows;
}

export async function getSetup(formId: number) {
  const form = await getForm(formId);
  const enquiry = await latestEnquiry(form);
  const { rows } = await query<TemplateRow>("SELECT * FROM form_email_templates WHERE form_id = $1", [formId]);
  const templates = Object.fromEntries(TEMPLATE_TYPES.map((type) => [type, rows.find((r) => r.type === type) ?? null]));
  return { form, variables: await variableNames(form), sample: buildVariables(form, enquiry), templates };
}

export async function save(formId: number, type: TemplateType, input: SaveTemplateInput, actorId: number) {
  const form = await getForm(formId);
  await latestEnquiry(form);
  if (input.is_enabled) {
    if (!input.subject) throw new AppError(422, "Subject is required to enable this email");
    if (!input.body) throw new AppError(422, "Body is required to enable this email");
    if (type === "admin" && !input.to_emails.length) throw new AppError(422, "Add at least one admin email");
    if (type === "student" && !input.recipient_field) throw new AppError(422, "Select the field holding the student email");
  }
  if (input.recipient_field && !(await variableNames(form)).includes(input.recipient_field)) {
    throw new AppError(422, "Recipient field is not an enquiry variable");
  }
  const { rows } = await query<TemplateRow>(
    `INSERT INTO form_email_templates
      (form_id, type, is_enabled, to_emails, recipient_field, cc, bcc, reply_to, subject, body, body_html, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     ON CONFLICT (form_id, type) DO UPDATE SET
      is_enabled = EXCLUDED.is_enabled, to_emails = EXCLUDED.to_emails, recipient_field = EXCLUDED.recipient_field,
      cc = EXCLUDED.cc, bcc = EXCLUDED.bcc, reply_to = EXCLUDED.reply_to, subject = EXCLUDED.subject,
      body = EXCLUDED.body, body_html = EXCLUDED.body_html, updated_by = EXCLUDED.updated_by, updated_at = NOW()
     RETURNING *`,
    [
      formId,
      type,
      input.is_enabled,
      input.to_emails,
      type === "student" ? input.recipient_field : null,
      input.cc,
      input.bcc,
      input.reply_to,
      input.subject,
      input.body ? JSON.stringify(input.body) : null,
      editorToHtml(input.body),
      actorId,
    ]
  );
  return rows[0];
}

export async function sendTest(formId: number, type: TemplateType, input: TestTemplateInput) {
  const form = await getForm(formId);
  const enquiry = await latestEnquiry(form);
  const mail = render({ ...input, type, body_html: editorToHtml(input.body) }, buildVariables(form, enquiry));
  try {
    await sendMail(input.test_to, `[TEST] ${mail.subject}`, mail.html, { replyTo: mail.replyTo });
  } catch (err) {
    throw new AppError(502, `Email could not be sent: ${(err as Error).message}`);
  }
  return { ok: true };
}

async function log(enquiryId: number, type: TemplateType, to: string[], subject: string, status: string, error?: string) {
  await query(
    "INSERT INTO form_enquiry_emails (enquiry_id, type, recipients, subject, status, error) VALUES ($1, $2, $3, $4, $5, $6)",
    [enquiryId, type, to.join(", "), subject, status, error ?? null]
  );
}

export async function dispatchEnquiryEmails(enquiryId: number) {
  const { rows } = await query<EnquiryRow & { form_pk: number; form_name: string; form_slug: string }>(
    `SELECT e.id, e.name, e.phone, e.details, e.created_at, f.id AS form_pk, f.name AS form_name, f.form_id AS form_slug
     FROM form_enquiries e JOIN forms f ON f.form_id = e.form_id WHERE e.id = $1`,
    [enquiryId]
  );
  const enquiry = rows[0];
  if (!enquiry) return;
  const templates = await query<TemplateRow>(
    "SELECT * FROM form_email_templates WHERE form_id = $1 AND is_enabled = TRUE ORDER BY type",
    [enquiry.form_pk]
  );
  const vars = buildVariables({ name: enquiry.form_name, form_id: enquiry.form_slug }, enquiry);

  for (const template of templates.rows) {
    const mail = render(template, vars);
    const to = recipients(template, vars);
    if (!to.length) {
      await log(enquiryId, template.type, to, mail.subject, "skipped", "No valid recipient email in enquiry");
      continue;
    }
    try {
      await sendMail(to, mail.subject, mail.html, { cc: mail.cc, bcc: mail.bcc, replyTo: mail.replyTo });
      await log(enquiryId, template.type, to, mail.subject, "sent");
    } catch (err) {
      await log(enquiryId, template.type, to, mail.subject, "failed", (err as Error).message);
    }
  }
}
