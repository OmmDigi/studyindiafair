import axios from "axios";
import { query } from "../../db/pool.js";
import { AppError } from "../../utils/AppError.js";
import { SINGLE_VARIABLE, VARIABLE_PATTERN } from "../form-emails/constant.js";
import {
  buildVariables,
  eventVariables,
  getForm,
  getFormEvent,
  latestEnquiry,
  toText,
  variableNames,
  type EnquiryRow,
  type EventInfo,
  type FormRow,
} from "../form-emails/service.js";
import {
  EVENT_SCHEDULES_VARIABLE,
  isHttpUrl,
  MAX_RESPONSE_CHARS,
  RETRY_DELAYS_MS,
  TIMEOUT_MS,
  WEBHOOK_VARIABLES,
  type Method,
  type ResendInput,
  type SaveWebhookInput,
  type TestWebhookInput,
} from "./constant.js";

type WebhookRow = {
  id: number;
  form_id: number;
  name: string;
  is_enabled: boolean;
  method: Method;
  url: string;
  headers: Record<string, string>;
  body: unknown;
  updated_at: Date;
};

type Vars = Record<string, unknown>;

type Request = { method: Method; url: string; headers: Record<string, string>; body: string | null };

type Result = { ok: boolean; status_code: number | null; response: string | null; error: string | null; duration_ms: number };

const truncate = (text: string, max = MAX_RESPONSE_CHARS) => (text.length > max ? `${text.slice(0, max)}…` : text);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function webhookVariables(form: Pick<FormRow, "name" | "form_id">, enquiry: EnquiryRow, event: EventInfo | null): Vars {
  const { name, phone, form_name, form_id, submitted_at } = buildVariables(form, enquiry, null);
  return {
    ...enquiry.details,
    ...eventVariables(event),
    ...(event && { [EVENT_SCHEDULES_VARIABLE]: event.schedules }),
    name,
    phone,
    form_name,
    form_id,
    submitted_at,
    enquiry_id: enquiry.id,
    submitted_at_iso: enquiry.created_at.toISOString(),
  };
}

const interpolate = (text: string, vars: Vars, encode: (v: string) => string = (v) => v) =>
  text.replace(VARIABLE_PATTERN, (_, key: string) => encode(toText(vars[key])));

function renderJson(value: unknown, vars: Vars): unknown {
  if (typeof value === "string") {
    const match = value.match(SINGLE_VARIABLE);
    return match ? (vars[match[1]] ?? "") : interpolate(value, vars);
  }
  if (Array.isArray(value)) return value.map((v) => renderJson(v, vars));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [interpolate(k, vars), renderJson(v, vars)]));
  }
  return value;
}

function buildRequest(hook: Pick<WebhookRow, "method" | "url" | "headers" | "body">, vars: Vars): Request {
  const url = interpolate(hook.url, vars, encodeURIComponent);
  if (!isHttpUrl(url)) throw new Error(`Invalid URL after filling variables: ${url}`);
  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(hook.headers ?? {})) headers[key] = interpolate(value, vars).replace(/[\r\n]+/g, " ");
  const hasBody = hook.method !== "GET" && hook.body !== null && hook.body !== undefined;
  if (hasBody && !Object.keys(headers).some((k) => k.toLowerCase() === "content-type")) {
    headers["Content-Type"] = "application/json";
  }
  return { method: hook.method, url, headers, body: hasBody ? JSON.stringify(renderJson(hook.body, vars)) : null };
}

async function send(req: Request): Promise<Result> {
  const started = Date.now();
  try {
    const res = await axios.request<string>({
      method: req.method,
      url: req.url,
      headers: req.headers,
      data: req.body ?? undefined,
      timeout: TIMEOUT_MS,
      maxRedirects: 3,
      maxContentLength: 1_000_000,
      responseType: "text",
      transformResponse: (r) => r,
      validateStatus: () => true,
    });
    const ok = res.status >= 200 && res.status < 300;
    return {
      ok,
      status_code: res.status,
      response: truncate(String(res.data ?? "")),
      error: ok ? null : `HTTP ${res.status} ${res.statusText}`.trim(),
      duration_ms: Date.now() - started,
    };
  } catch (err) {
    return { ok: false, status_code: null, response: null, error: (err as Error).message, duration_ms: Date.now() - started };
  }
}

const retryable = (r: Result) => r.status_code === null || r.status_code === 429 || r.status_code >= 500;

async function deliver(logId: number, req: Request) {
  for (let attempt = 1; ; attempt++) {
    const result = await send(req);
    const done = result.ok || attempt > RETRY_DELAYS_MS.length || !retryable(result);
    await query(
      `UPDATE form_enquiry_webhooks SET status = $2, status_code = $3, attempts = $4, response = $5, error = $6, updated_at = NOW()
       WHERE id = $1`,
      [logId, result.ok ? "success" : done ? "failed" : "pending", result.status_code, attempt, result.response, result.error]
    );
    if (done) return;
    await sleep(RETRY_DELAYS_MS[attempt - 1]);
  }
}

async function getWebhook(formId: number, id: number) {
  const { rows } = await query<WebhookRow>("SELECT * FROM form_webhooks WHERE id = $1 AND form_id = $2", [id, formId]);
  if (!rows[0]) throw new AppError(404, "Webhook not found");
  return rows[0];
}

export async function listForms() {
  const { rows } = await query(
    `SELECT f.id, f.name, f.form_id,
      (SELECT COUNT(*)::int FROM form_enquiries e WHERE e.form_id = f.form_id) AS enquiry_count,
      (SELECT COUNT(*)::int FROM form_webhooks w WHERE w.form_id = f.id) AS webhook_count,
      (SELECT COUNT(*)::int FROM form_webhooks w WHERE w.form_id = f.id AND w.is_enabled) AS enabled_count
     FROM forms f ORDER BY f.name ASC`
  );
  return rows;
}

export async function getSetup(formId: number) {
  const form = await getForm(formId);
  const enquiry = await latestEnquiry(form);
  const event = await getFormEvent(form.form_id);
  const { rows } = await query<WebhookRow>("SELECT * FROM form_webhooks WHERE form_id = $1 ORDER BY id", [formId]);
  const sample = Object.fromEntries(Object.entries(webhookVariables(form, enquiry, event)).map(([k, v]) => [k, toText(v)]));
  const variables = [...(await variableNames(form, event)), ...WEBHOOK_VARIABLES, ...(event ? [EVENT_SCHEDULES_VARIABLE] : [])];
  return { form, variables: [...new Set(variables)], sample, webhooks: rows };
}

const bodyFor = (input: SaveWebhookInput) => (input.method === "GET" || input.body === null ? null : JSON.stringify(input.body));

export async function create(formId: number, input: SaveWebhookInput, actorId: number) {
  await latestEnquiry(await getForm(formId));
  const { rows } = await query<WebhookRow>(
    `INSERT INTO form_webhooks (form_id, name, is_enabled, method, url, headers, body, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING *`,
    [formId, input.name, input.is_enabled, input.method, input.url, JSON.stringify(input.headers), bodyFor(input), actorId]
  );
  return rows[0];
}

export async function update(formId: number, id: number, input: SaveWebhookInput, actorId: number) {
  await getWebhook(formId, id);
  const { rows } = await query<WebhookRow>(
    `UPDATE form_webhooks SET name = $3, is_enabled = $4, method = $5, url = $6, headers = $7, body = $8,
      updated_by = $9, updated_at = NOW()
     WHERE id = $1 AND form_id = $2 RETURNING *`,
    [id, formId, input.name, input.is_enabled, input.method, input.url, JSON.stringify(input.headers), bodyFor(input), actorId]
  );
  return rows[0];
}

export async function remove(formId: number, id: number) {
  const { rowCount } = await query("DELETE FROM form_webhooks WHERE id = $1 AND form_id = $2", [id, formId]);
  if (!rowCount) throw new AppError(404, "Webhook not found");
}

export async function sendTest(formId: number, input: TestWebhookInput) {
  const form = await getForm(formId);
  const enquiry = await latestEnquiry(form);
  let request: Request;
  try {
    request = buildRequest(input, webhookVariables(form, enquiry, await getFormEvent(form.form_id)));
  } catch (err) {
    throw new AppError(422, (err as Error).message);
  }
  return { request, result: await send(request) };
}

async function queue(enquiryId: number, webhookId?: number) {
  const { rows } = await query<EnquiryRow & { form_pk: number; form_name: string; form_slug: string }>(
    `SELECT e.id, e.name, e.phone, e.details, e.created_at, f.id AS form_pk, f.name AS form_name, f.form_id AS form_slug
     FROM form_enquiries e JOIN forms f ON f.form_id = e.form_id WHERE e.id = $1`,
    [enquiryId]
  );
  const enquiry = rows[0];
  if (!enquiry) return null;
  const hooks = await query<WebhookRow>(
    webhookId
      ? "SELECT * FROM form_webhooks WHERE form_id = $1 AND id = $2"
      : "SELECT * FROM form_webhooks WHERE form_id = $1 AND is_enabled = TRUE ORDER BY id",
    webhookId ? [enquiry.form_pk, webhookId] : [enquiry.form_pk]
  );
  const vars = webhookVariables({ name: enquiry.form_name, form_id: enquiry.form_slug }, enquiry, await getFormEvent(enquiry.form_slug));
  const jobs: (() => Promise<void>)[] = [];

  for (const hook of hooks.rows) {
    let request: Request | null = null;
    let error: string | null = null;
    try {
      request = buildRequest(hook, vars);
    } catch (err) {
      error = (err as Error).message;
    }
    const log = await query<{ id: number }>(
      `INSERT INTO form_enquiry_webhooks (enquiry_id, webhook_id, webhook_name, method, url, request_body, status, error)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [
        enquiryId,
        hook.id,
        hook.name,
        hook.method,
        request?.url ?? hook.url,
        request?.body ? truncate(request.body, 10_000) : null,
        request ? "pending" : "failed",
        error,
      ]
    );
    if (request) jobs.push(() => deliver(log.rows[0].id, request));
  }
  return { jobs, total: hooks.rows.length };
}

const runJobs = (jobs: (() => Promise<void>)[]) =>
  Promise.all(jobs.map((job) => job().catch((err) => console.error("[form-webhooks]", err))));

export async function dispatchEnquiryWebhooks(enquiryId: number) {
  const queued = await queue(enquiryId);
  if (queued) await runJobs(queued.jobs);
}

export async function resend(enquiryId: number, input: ResendInput) {
  const queued = await queue(enquiryId, input.webhook_id);
  if (!queued) throw new AppError(404, "Enquiry not found");
  if (!queued.total) throw new AppError(422, input.webhook_id ? "Webhook not found for this form" : "No enabled webhooks for this form");
  runJobs(queued.jobs);
  return { queued: queued.total };
}
