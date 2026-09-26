import { z } from "zod";
import { SLUG_PATTERN } from "../testimonial-categories/constant.js";

export { slugify } from "../testimonial-categories/constant.js";

export const UPLOAD_FOLDER = "upcoming-events";
export const LOGO_FOLDER = "university-logos";

const slug = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().toLowerCase().max(120).regex(SLUG_PATTERN, "Slug may only contain lowercase letters, numbers and hyphens").optional()
);

const image = z.object({
  path: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v.startsWith(`/uploads/${UPLOAD_FOLDER}/`) && !v.includes(".."), "Invalid image path"),
  alt_text: z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    z.string().trim().max(250).nullable().default(null)
  ),
});

const emptyToNull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);

const logo = z.object({
  path: z
    .string()
    .trim()
    .max(500)
    .refine((v) => v.startsWith(`/uploads/${LOGO_FOLDER}/`) && !v.includes(".."), "Invalid logo path"),
  alt_text: z.preprocess(emptyToNull, z.string().trim().max(250).nullable().default(null)),
  link: z.preprocess(
    emptyToNull,
    z.string().trim().max(1000).pipe(z.url({ protocol: /^https?$/ })).nullable().default(null)
  ),
});

export const updateLogosSchema = z.object({
  logos: z.array(logo).max(300),
});

const schedule = z.object({
  location: z.string().trim().min(1, "Location is required").max(200),
  date: z.string().trim().min(1, "Date is required").max(120),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const slugParamSchema = z.object({ slug: z.string().trim().toLowerCase().max(120) });

export const listEventsSchema = z.object({
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
  images: z
    .array(image)
    .max(30)
    .refine((list) => new Set(list.map((i) => i.path)).size === list.length, "Duplicate images"),
  schedules: z.array(schedule).min(1, "Add at least one location and date").max(50),
  is_active: z.boolean(),
};

export const createEventSchema = z.object({
  ...fields,
  images: fields.images.default([]),
  is_active: fields.is_active.default(true),
});

export const updateEventSchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type EventImage = z.infer<typeof image>;
export type EventLogo = z.infer<typeof logo>;
export type UpdateLogosInput = z.infer<typeof updateLogosSchema>;
export type EventSchedule = z.infer<typeof schedule>;
export type ListEventsQuery = z.infer<typeof listEventsSchema>;
export type ReorderInput = z.infer<typeof reorderSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
