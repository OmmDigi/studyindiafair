import { z } from "zod";
import { editorContent } from "../../utils/editorContent.js";

export type { EditorContent } from "../../utils/editorContent.js";

export const UPLOAD_FOLDER = "site-settings";

const uploadPath = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v.startsWith(`/uploads/${UPLOAD_FOLDER}/`) && !v.includes(".."), "Invalid file path")
  .nullable();

const label = z.string().trim().max(80).default("");
const httpUrl = z.string().trim().max(1000).pipe(z.url({ protocol: /^https?$/ }));

const singlePrimary = <T extends { is_primary: boolean }>(items: T[]) => items.filter((i) => i.is_primary).length <= 1;

const phone = z.object({
  label,
  number: z.string().trim().min(5).max(30).regex(/^[+\d\s()-]+$/, "Invalid phone number"),
  is_primary: z.boolean().default(false),
  is_whatsapp: z.boolean().default(false),
});

const email = z.object({
  label,
  email: z.string().trim().max(160).pipe(z.email()),
  is_primary: z.boolean().default(false),
});

const address = z.object({
  label,
  address: z.string().trim().min(3).max(1000),
  map_link: httpUrl.nullable().default(null),
});

const socialLink = z.object({
  name: z.string().trim().min(1).max(60),
  url: httpUrl,
  icon_path: uploadPath.default(null),
});

export const updateSiteSettingsSchema = z
  .object({
    phones: z.array(phone).max(20).refine(singlePrimary, "Only one primary phone allowed"),
    emails: z.array(email).max(20).refine(singlePrimary, "Only one primary email allowed"),
    addresses: z.array(address).max(20),
    social_links: z.array(socialLink).max(30),
    logo_path: uploadPath,
    favicon_path: uploadPath,
    notice: editorContent,
    notice_active: z.boolean(),
  })
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export type UpdateSiteSettingsInput = z.infer<typeof updateSiteSettingsSchema>;
export type Phone = z.infer<typeof phone>;
export type Email = z.infer<typeof email>;
export type Address = z.infer<typeof address>;
export type SocialLink = z.infer<typeof socialLink>;
