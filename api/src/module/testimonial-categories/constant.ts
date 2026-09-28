import { z } from "zod";

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

const slug = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().toLowerCase().max(120).regex(SLUG_PATTERN, "Slug may only contain lowercase letters, numbers and hyphens").optional()
);

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const listCategoriesSchema = z.object({
  search: z.string().trim().optional(),
  is_active: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
});

const fields = {
  name: z.string().trim().min(2).max(120),
  slug,
  sort_order: z.number().int().min(0),
  is_active: z.boolean(),
};

export const createCategorySchema = z.object({
  ...fields,
  sort_order: fields.sort_order.default(0),
  is_active: fields.is_active.default(true),
});

export const updateCategorySchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type ListCategoriesQuery = z.infer<typeof listCategoriesSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
