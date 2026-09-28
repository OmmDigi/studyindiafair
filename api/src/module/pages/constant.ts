import { z } from "zod";
import { SLUG_PATTERN } from "../testimonial-categories/constant.js";

export { slugify } from "../testimonial-categories/constant.js";

const slug = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().toLowerCase().max(120).regex(SLUG_PATTERN, "Slug may only contain lowercase letters, numbers and hyphens").optional()
);

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const listPagesSchema = z.object({
  search: z.string().trim().optional(),
});

const fields = {
  name: z.string().trim().min(2).max(120),
  slug,
};

export const createPageSchema = z.object(fields);

export const updatePageSchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type ListPagesQuery = z.infer<typeof listPagesSchema>;
export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
