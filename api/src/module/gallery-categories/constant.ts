import { z } from "zod";
import { SLUG_PATTERN } from "../testimonial-categories/constant.js";

export { slugify } from "../testimonial-categories/constant.js";

const slug = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().toLowerCase().max(120).regex(SLUG_PATTERN, "Slug may only contain lowercase letters, numbers and hyphens").optional()
);

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const listCategoriesSchema = z.object({
  search: z.string().trim().optional(),
  is_active: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
});

export const reorderSchema = z.object({
  ids: z
    .array(z.number().int().positive())
    .min(1)
    .max(1000)
    .refine((ids) => new Set(ids).size === ids.length, "Duplicate ids"),
});

const fields = {
  name: z.string().trim().min(2).max(120),
  slug,
  is_active: z.boolean(),
};

export const createCategorySchema = z.object({
  ...fields,
  is_active: fields.is_active.default(true),
});

export const updateCategorySchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type ListCategoriesQuery = z.infer<typeof listCategoriesSchema>;
export type ReorderInput = z.infer<typeof reorderSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
