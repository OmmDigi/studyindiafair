import { z } from "zod";

export const UPLOAD_FOLDER = "gallery";

const imagePath = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v.startsWith(`/uploads/${UPLOAD_FOLDER}/`) && !v.includes(".."), "Invalid image path");

const altText = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? null : v),
  z.string().trim().max(250).nullable()
);

const categoryId = z.number().int().positive();

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const listGallerySchema = z.object({
  category_id: z.coerce.number().int().positive(),
  is_active: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
});

export const publicListSchema = z.object({
  category: z.string().trim().toLowerCase().max(120).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(24),
});

export const reorderSchema = z.object({
  category_id: categoryId,
  ids: z
    .array(z.number().int().positive())
    .min(1)
    .max(1000)
    .refine((ids) => new Set(ids).size === ids.length, "Duplicate ids"),
});

export const createGallerySchema = z.object({
  category_id: categoryId,
  is_active: z.boolean().default(true),
  items: z
    .array(z.object({ image_path: imagePath, alt_text: altText.default(null) }))
    .min(1)
    .max(50),
});

export const updateGallerySchema = z
  .object({
    category_id: categoryId,
    image_path: imagePath,
    alt_text: altText,
    is_active: z.boolean(),
  })
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type ListGalleryQuery = z.infer<typeof listGallerySchema>;
export type PublicListQuery = z.infer<typeof publicListSchema>;
export type ReorderInput = z.infer<typeof reorderSchema>;
export type CreateGalleryInput = z.infer<typeof createGallerySchema>;
export type UpdateGalleryInput = z.infer<typeof updateGallerySchema>;
