import { z } from "zod";
import { editorContent } from "../../utils/editorContent.js";

export const TEMPLATE_TYPES = ["admin", "student"] as const;
export type TemplateType = (typeof TEMPLATE_TYPES)[number];

export const BASE_VARIABLES = ["name", "phone", "form_name", "form_id", "submitted_at"] as const;
export const VARIABLE_PATTERN = /\{\{\s*([^{}]+?)\s*\}\}/g;
export const SINGLE_VARIABLE = /^\{\{\s*([^{}]+?)\s*\}\}$/;

const email = z.string().trim().toLowerCase().email();
const emails = z.array(email).max(20).default([]);

export const formParamSchema = z.object({ formId: z.coerce.number().int().positive() });

export const templateParamSchema = formParamSchema.extend({ type: z.enum(TEMPLATE_TYPES) });

const templateFields = z.object({
  is_enabled: z.boolean().default(false),
  to_emails: emails,
  recipient_field: z.string().trim().max(120).nullish().transform((v) => v || null),
  cc: emails,
  bcc: emails,
  reply_to: z
    .string()
    .trim()
    .max(200)
    .nullish()
    .transform((v) => v || null)
    .refine((v) => !v || SINGLE_VARIABLE.test(v) || email.safeParse(v).success, "Reply-To must be an email or a {{variable}}"),
  subject: z.string().trim().max(300).default(""),
  body: editorContent,
});

export const saveTemplateSchema = templateFields;

export const testTemplateSchema = templateFields.extend({ test_to: email }).superRefine((v, ctx) => {
  if (!v.subject) ctx.addIssue({ code: "custom", path: ["subject"], message: "Subject is required" });
  if (!v.body) ctx.addIssue({ code: "custom", path: ["body"], message: "Body is required" });
});

export type SaveTemplateInput = z.infer<typeof saveTemplateSchema>;
export type TestTemplateInput = z.infer<typeof testTemplateSchema>;
