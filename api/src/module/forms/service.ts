import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { isUniqueViolation } from "../auth/service.js";
import { dispatchEnquiryEmails } from "../form-emails/service.js";
import {
  slugify,
  type CreateFormInput,
  type EnquiryFilter,
  type ListEnquiriesQuery,
  type ListFormsQuery,
  type SubmitEnquiryInput,
  type UpdateFormInput,
} from "./constant.js";

type Row = {
  id: number;
  name: string;
  form_id: string;
  enquiry_count: number;
  created_at: Date;
  updated_at: Date;
};

type EnquiryRow = {
  id: number;
  name: string;
  phone: string;
  details: Record<string, unknown>;
  created_at: Date;
};

const ENQUIRY_EMAILS = `(SELECT COALESCE(json_agg(json_build_object(
    'id', m.id, 'type', m.type, 'recipients', m.recipients, 'subject', m.subject,
    'status', m.status, 'error', m.error, 'created_at', m.created_at) ORDER BY m.id), '[]')
  FROM form_enquiry_emails m WHERE m.enquiry_id = form_enquiries.id) AS emails`;

const SELECT = `SELECT f.id, f.name, f.form_id, f.created_at, f.updated_at,
  (SELECT COUNT(*)::int FROM form_enquiries e WHERE e.form_id = f.form_id) AS enquiry_count
  FROM forms f`;

function resolveFormId(formId: string | undefined, name: string) {
  const value = formId ?? slugify(name);
  if (!value) throw new AppError(422, "Form ID could not be generated from name, enter one");
  return value;
}

async function run<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (err) {
    if (isUniqueViolation(err)) throw new AppError(409, "A form with this form ID already exists");
    throw err;
  }
}

function enquiryWhere(formId: string, { search, from, to }: EnquiryFilter) {
  const params: unknown[] = [formId];
  const conditions = ["form_id = $1"];
  if (search) {
    params.push(`%${search}%`);
    conditions.push(`(name ILIKE $${params.length} OR phone ILIKE $${params.length})`);
  }
  if (from) {
    params.push(from);
    conditions.push(`created_at >= $${params.length}::date`);
  }
  if (to) {
    params.push(to);
    conditions.push(`created_at < $${params.length}::date + 1`);
  }
  return { clause: `WHERE ${conditions.join(" AND ")}`, params };
}

export async function list({ search }: ListFormsQuery) {
  const params: unknown[] = [];
  let clause = "";
  if (search) {
    params.push(`%${search}%`);
    clause = "WHERE f.name ILIKE $1 OR f.form_id ILIKE $1";
  }
  const { rows } = await query<Row>(`${SELECT} ${clause} ORDER BY f.name ASC`, params);
  return rows;
}

export async function getById(id: number) {
  const { rows } = await query<Row>(`${SELECT} WHERE f.id = $1`, [id]);
  if (!rows[0]) throw new AppError(404, "Form not found");
  return rows[0];
}

export async function create(input: CreateFormInput, actorId: number) {
  const formId = resolveFormId(input.form_id, input.name);
  const { rows } = await run(() =>
    query<{ id: number }>(
      "INSERT INTO forms (name, form_id, created_by, updated_by) VALUES ($1, $2, $3, $3) RETURNING id",
      [input.name, formId, actorId]
    )
  );
  return getById(rows[0].id);
}

export async function update(id: number, input: UpdateFormInput, actorId: number) {
  const current = await getById(id);
  await run(() =>
    query("UPDATE forms SET name = $2, form_id = $3, updated_by = $4, updated_at = NOW() WHERE id = $1", [
      id,
      input.name ?? current.name,
      input.form_id ?? current.form_id,
      actorId,
    ])
  );
  return getById(id);
}

export async function remove(id: number) {
  const current = await getById(id);
  if (current.enquiry_count > 0) {
    throw new AppError(
      409,
      `Form has ${current.enquiry_count} enquir${current.enquiry_count === 1 ? "y" : "ies"}, delete them first`
    );
  }
  try {
    await query("DELETE FROM forms WHERE id = $1", [id]);
  } catch (err) {
    if ((err as { code?: string })?.code === "23503") throw new AppError(409, "Form has enquiries, delete them first");
    throw err;
  }
}

export async function submit(formId: string, input: SubmitEnquiryInput, ip: string | undefined) {
  const { rows } = await query<{ form_id: string }>("SELECT form_id FROM forms WHERE form_id = $1", [formId]);
  if (!rows[0]) throw new AppError(404, "Form not found");
  const result = await query<{ id: number }>(
    "INSERT INTO form_enquiries (form_id, name, phone, details, ip_address) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [formId, input.name, input.phone, JSON.stringify(input.details), ip ?? null]
  );
  const id = result.rows[0].id;
  dispatchEnquiryEmails(id).catch((err) => console.error("[form-emails]", err));
  return { id };
}

export async function listEnquiries(id: number, { page, limit, ...filter }: ListEnquiriesQuery) {
  const form = await getById(id);
  const { clause, params } = enquiryWhere(form.form_id, filter);
  const [{ rows }, count] = await Promise.all([
    query<EnquiryRow>(
      `SELECT id, name, phone, details, created_at, ${ENQUIRY_EMAILS} FROM form_enquiries ${clause}
       ORDER BY created_at DESC, id DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
      params
    ),
    query<{ total: number }>(`SELECT COUNT(*)::int AS total FROM form_enquiries ${clause}`, params),
  ]);
  return { data: rows, page, limit, total: count.rows[0].total };
}

const csvCell = (value: unknown) => {
  let text = value === null || value === undefined ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  if (/^[=+\-@\t\r]/.test(text) && !/^[+-]?[\d\s().-]+$/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export async function exportEnquiries(id: number, filter: EnquiryFilter) {
  const form = await getById(id);
  const { clause, params } = enquiryWhere(form.form_id, filter);
  const { rows } = await query<EnquiryRow>(
    `SELECT id, name, phone, details, created_at FROM form_enquiries ${clause} ORDER BY created_at DESC, id DESC`,
    params
  );
  const keys = [...new Set(rows.flatMap((r) => Object.keys(r.details)))];
  const lines = [
    ["ID", "Name", "Phone", ...keys, "Submitted At"].map(csvCell).join(","),
    ...rows.map((r) =>
      [r.id, r.name, r.phone, ...keys.map((k) => r.details[k]), r.created_at.toISOString()].map(csvCell).join(",")
    ),
  ];
  return { filename: `${form.form_id}-enquiries.csv`, csv: `﻿${lines.join("\r\n")}` };
}

export async function removeEnquiry(id: number, enquiryId: number) {
  const form = await getById(id);
  const { rowCount } = await query("DELETE FROM form_enquiries WHERE id = $1 AND form_id = $2", [enquiryId, form.form_id]);
  if (!rowCount) throw new AppError(404, "Enquiry not found");
}
