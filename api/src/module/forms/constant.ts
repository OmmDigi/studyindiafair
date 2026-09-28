import { z } from "zod";
import { SLUG_PATTERN } from "../testimonial-categories/constant.js";

export { slugify } from "../testimonial-categories/constant.js";

export const SUBMIT_RATE_LIMIT = { windowMs: 60_000, max: 10 };
export const MAX_DETAILS_BYTES = 10_000;

const formId = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().toLowerCase().max(120).regex(SLUG_PATTERN, "Form ID may only contain lowercase letters, numbers and hyphens").optional()
);

const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
  .optional();

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const enquiryParamSchema = z.object({
  id: z.coerce.number().int().positive(),
  enquiryId: z.coerce.number().int().positive(),
});

export const formIdParamSchema = z.object({
  formId: z.string().trim().toLowerCase().regex(SLUG_PATTERN, "Invalid form ID"),
});

export const listFormsSchema = z.object({
  search: z.string().trim().optional(),
});

const fields = {
  name: z.string().trim().min(2).max(120),
  form_id: formId,
};

export const createFormSchema = z.object(fields);

export const updateFormSchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export const enquiryFilterSchema = z.object({
  search: z.string().trim().optional(),
  from: date,
  to: date,
});

export const listEnquiriesSchema = enquiryFilterSchema.extend({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const submitEnquirySchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{6,20}$/, "Invalid phone number"),
  })
  .catchall(z.unknown())
  .transform(({ name, phone, details, ...rest }) => ({
    name,
    phone,
    details: {
      ...(details && typeof details === "object" && !Array.isArray(details)
        ? (details as Record<string, unknown>)
        : details !== undefined
          ? { details }
          : {}),
      ...rest,
    },
  }))
  .refine((v) => JSON.stringify(v.details).length <= MAX_DETAILS_BYTES, "Details are too large");

export type ListFormsQuery = z.infer<typeof listFormsSchema>;
export type CreateFormInput = z.infer<typeof createFormSchema>;
export type UpdateFormInput = z.infer<typeof updateFormSchema>;
export type EnquiryFilter = z.infer<typeof enquiryFilterSchema>;
export type ListEnquiriesQuery = z.infer<typeof listEnquiriesSchema>;
export type SubmitEnquiryInput = z.infer<typeof submitEnquirySchema>;
