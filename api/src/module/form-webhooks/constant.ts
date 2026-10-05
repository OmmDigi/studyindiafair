import { z } from "zod";
import { VARIABLE_PATTERN } from "../form-emails/constant.js";

export const METHODS = ["GET", "POST", "PUT", "PATCH"] as const;
export type Method = (typeof METHODS)[number];

export const WEBHOOK_VARIABLES = ["enquiry_id", "submitted_at_iso"] as const;
export const EVENT_SCHEDULES_VARIABLE = "event_schedules";
export const TIMEOUT_MS = 10_000;
export const RETRY_DELAYS_MS = [5_000, 30_000, 120_000];
export const MAX_RESPONSE_CHARS = 2_000;
export const MAX_BODY_BYTES = 50_000;

const HEADER_NAME = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;

export const isHttpUrl = (value: string) => {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

export const formParamSchema = z.object({ formId: z.coerce.number().int().positive() });

export const webhookParamSchema = formParamSchema.extend({ id: z.coerce.number().int().positive() });

export const enquiryParamSchema = z.object({ enquiryId: z.coerce.number().int().positive() });

const requestFields = z.object({
  method: z.enum(METHODS).default("POST"),
  url: z
    .string()
    .trim()
    .min(1, "URL is required")
    .max(2000)
    .refine((v) => isHttpUrl(v.replace(VARIABLE_PATTERN, "x")), "Enter a valid http(s) URL"),
  headers: z
    .record(z.string().trim().regex(HEADER_NAME, "Invalid header name"), z.string().max(2000, "Header value is too long"))
    .default({})
    .refine((v) => Object.keys(v).length <= 30, "Too many headers"),
  body: z
    .unknown()
    .optional()
    .transform((v) => v ?? null)
    .refine((v) => JSON.stringify(v).length <= MAX_BODY_BYTES, "Body is too large"),
});

export const saveWebhookSchema = requestFields.extend({
  name: z.string().trim().min(1, "Name is required").max(120),
  is_enabled: z.boolean().default(false),
});

export const testWebhookSchema = requestFields;

export const resendSchema = z.object({ webhook_id: z.coerce.number().int().positive().optional() });

export type SaveWebhookInput = z.infer<typeof saveWebhookSchema>;
export type TestWebhookInput = z.infer<typeof testWebhookSchema>;
export type ResendInput = z.infer<typeof resendSchema>;
