import { z } from "zod";
import { editorContent } from "../../utils/editorContent.js";

export type { EditorContent } from "../../utils/editorContent.js";

export const UPLOAD_FOLDER = "team-members";

const imagePath = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v.startsWith(`/uploads/${UPLOAD_FOLDER}/`) && !v.includes(".."), "Invalid image path")
  .nullable();

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const listTeamMembersSchema = z.object({
  search: z.string().trim().optional(),
  is_active: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const publicListSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(100),
});

export const moveSchema = z.object({ direction: z.enum(["up", "down"]) });

const fields = {
  name: z.string().trim().min(2).max(120),
  designation: z.string().trim().min(2).max(160),
  details: editorContent,
  image_path: imagePath,
  position: z.number().int().min(0),
  is_active: z.boolean(),
};

export const createTeamMemberSchema = z.object({
  ...fields,
  details: fields.details.default(null),
  image_path: fields.image_path.default(null),
  position: fields.position.optional(),
  is_active: fields.is_active.default(true),
});

export const updateTeamMemberSchema = z
  .object(fields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type ListTeamMembersQuery = z.infer<typeof listTeamMembersSchema>;
export type PublicListQuery = z.infer<typeof publicListSchema>;
export type MoveInput = z.infer<typeof moveSchema>;
export type CreateTeamMemberInput = z.infer<typeof createTeamMemberSchema>;
export type UpdateTeamMemberInput = z.infer<typeof updateTeamMemberSchema>;
