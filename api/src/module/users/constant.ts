import { z } from "zod";
import { passwordSchema, ROLES } from "../auth/constant.js";

const email = z.string().trim().toLowerCase().email();

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export const listUsersSchema = z.object({
  search: z.string().trim().optional(),
  role: z.enum(ROLES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const createUserSchema = z.object({
  name: z.string().trim().min(2),
  email,
  password: passwordSchema,
  role: z.enum(ROLES).default("editor"),
  is_active: z.boolean().default(true),
});

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(2).optional(),
    email: email.optional(),
    role: z.enum(ROLES).optional(),
    is_active: z.boolean().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, "Nothing to update");

export const adminResetPasswordSchema = z.object({ password: passwordSchema });

export type ListUsersQuery = z.infer<typeof listUsersSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
