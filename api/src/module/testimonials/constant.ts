import { z } from "zod";

export const TESTIMONIAL_TYPES = ["text", "text_image", "video"] as const;
export type TestimonialType = (typeof TESTIMONIAL_TYPES)[number];

export const UPLOAD_FOLDER = "testimonials";

const YOUTUBE_ID = /^[\w-]{11}$/;

export function extractYoutubeId(input: string) {
  const value = input.trim();
  if (YOUTUBE_ID.test(value)) return value;
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^(www\.|m\.)/, "");
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.slice(1);
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      id = url.searchParams.get("v") ?? url.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]+)/)?.[1] ?? null;
    }
    return id && YOUTUBE_ID.test(id) ? id : null;
  } catch {
    return null;
  }
}

const optionalText = z.preprocess((v) => (v === "" ? null : v), z.string().trim().max(5000).nullable());

const editorContent = z
  .object({
    time: z.number().optional(),
    version: z.string().max(20).optional(),
    blocks: z
      .array(
        z.object({
          id: z.string().max(50).optional(),
          type: z.string().min(1).max(50),
          data: z.record(z.string(), z.unknown()),
          tunes: z.record(z.string(), z.unknown()).optional(),
        })
      )
      .max(500),
  })
  .nullable()
  .transform((v) => (v && v.blocks.length ? v : null))
  .refine((v) => !v || JSON.stringify(v).length <= 200_000, "Content is too large");

export type EditorContent = z.infer<typeof editorContent>;

const imagePath = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v.startsWith(`/uploads/${UPLOAD_FOLDER}/`) && !v.includes(".."), "Invalid image path")
  .nullable();

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const listTestimonialsSchema = z.object({
  search: z.string().trim().optional(),
  type: z.enum(TESTIMONIAL_TYPES).optional(),
  is_active: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const publicListSchema = z.object({
  type: z.enum(TESTIMONIAL_TYPES).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

const fields = {
  type: z.enum(TESTIMONIAL_TYPES),
  name: z.string().trim().min(2).max(120),
  designation: optionalText,
  content: editorContent,
  image_path: imagePath,
  youtube_url: optionalText,
  sort_order: z.number().int().min(0),
  is_active: z.boolean(),
};

export const createTestimonialSchema = z.object({
  ...fields,
  designation: fields.designation.default(null),
  content: fields.content.default(null),
  image_path: fields.image_path.default(null),
  youtube_url: fields.youtube_url.default(null),
  sort_order: fields.sort_order.default(0),
  is_active: fields.is_active.default(true),
});

export const updateTestimonialSchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type ListTestimonialsQuery = z.infer<typeof listTestimonialsSchema>;
export type PublicListQuery = z.infer<typeof publicListSchema>;
export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
