import { z } from "zod";

export const editorContent = z
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
