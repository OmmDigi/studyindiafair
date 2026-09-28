import { z } from "zod";
import { editorContent } from "../../utils/editorContent.js";

export type { EditorContent } from "../../utils/editorContent.js";

export const UPLOAD_FOLDER = "scholarship";
export const POSITIONS = ["left", "right"] as const;

const uploadPath = z
  .string()
  .trim()
  .min(1, "Image is required")
  .max(500)
  .refine((v) => v.startsWith(`/uploads/${UPLOAD_FOLDER}/`) && !v.includes(".."), "Invalid file path");

const heading = z.string().trim().min(1, "Heading is required").max(200);
const requiredContent = editorContent.refine((v) => v !== null, "Description is required");

const eligibilityPoint = z.object({
  heading,
  description: requiredContent,
});

const applyPoint = z.object({
  heading,
  description: requiredContent,
  icon_path: uploadPath,
  position: z.enum(POSITIONS),
});

export const updateScholarshipSchema = z.object({
  about_heading: heading,
  about_description: requiredContent,
  about_image_path: uploadPath,
  eligibility_heading: heading,
  eligibility_description: requiredContent,
  eligibility_points: z.array(eligibilityPoint).min(1, "Add at least one point").max(50),
  eligibility_notice: editorContent,
  apply_heading: heading,
  apply_description: requiredContent,
  apply_points: z.array(applyPoint).min(1, "Add at least one point").max(50),
});

export type UpdateScholarshipInput = z.infer<typeof updateScholarshipSchema>;
export type EligibilityPoint = z.infer<typeof eligibilityPoint>;
export type ApplyPoint = z.infer<typeof applyPoint>;
