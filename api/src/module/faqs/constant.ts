import { z } from "zod";
import { editorContent } from "../../utils/editorContent.js";

export type { EditorContent } from "../../utils/editorContent.js";

const pageSlug = z
  .string()
  .trim()
  .toLowerCase()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid page slug");

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const listFaqsSchema = z.object({
  search: z.string().trim().optional(),
  page_slug: pageSlug.optional(),
  is_active: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const publicListSchema = z.object({
  page_slug: pageSlug,
  limit: z.coerce.number().int().min(1).max(100).default(100),
});

const fields = {
  page_slug: pageSlug,
  question: z.string().trim().min(3).max(500),
  answer: editorContent.refine((v) => v !== null, "Answer is required"),
  sort_order: z.number().int().min(0),
  is_active: z.boolean(),
};

export const createFaqSchema = z.object({
  ...fields,
  sort_order: fields.sort_order.default(0),
  is_active: fields.is_active.default(true),
});

export const updateFaqSchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type ListFaqsQuery = z.infer<typeof listFaqsSchema>;
export type PublicListQuery = z.infer<typeof publicListSchema>;
export type CreateFaqInput = z.infer<typeof createFaqSchema>;
export type UpdateFaqInput = z.infer<typeof updateFaqSchema>;
