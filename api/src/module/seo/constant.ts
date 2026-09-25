import { z } from "zod";

export const UPLOAD_FOLDER = "seo";
export const SCHEMA_POSITIONS = ["head", "body"] as const;

const SCRIPT_BLOCK = /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/gi;

const optionalText = (max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    z.string().trim().max(max).nullable()
  );

const httpUrl = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? null : v),
  z.string().trim().max(1000).pipe(z.url({ protocol: /^https?$/ })).nullable()
);

const uploadPath = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v.startsWith(`/uploads/${UPLOAD_FOLDER}/`) && !v.includes(".."), "Invalid image path")
  .nullable();

export function isValidSchemaScript(value: string) {
  const blocks = [...value.matchAll(SCRIPT_BLOCK)];
  if (!blocks.length || value.replace(SCRIPT_BLOCK, "").trim() !== "") return false;
  return blocks.every(([, body]) => {
    try {
      const parsed = JSON.parse(body);
      return typeof parsed === "object" && parsed !== null;
    } catch {
      return false;
    }
  });
}

const schemaScript = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? null : v),
  z
    .string()
    .trim()
    .max(50000)
    .refine(isValidSchemaScript, 'Must contain only <script type="application/ld+json"> blocks with valid JSON')
    .nullable()
);

export const pageIdParamSchema = z.object({ pageId: z.coerce.number().int().positive() });
export const slugParamSchema = z.object({ slug: z.string().trim().min(1).max(120) });

export const upsertSeoSchema = z.object({
  meta_title: optionalText(200),
  meta_description: optionalText(500),
  canonical_url: httpUrl,
  og_title: optionalText(200),
  og_description: optionalText(500),
  og_image_path: uploadPath,
  schema_script: schemaScript,
  schema_position: z.enum(SCHEMA_POSITIONS),
});

export type UpsertSeoInput = z.infer<typeof upsertSeoSchema>;
