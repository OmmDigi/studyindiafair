import { z } from "zod";

export const ROLES = ["admin", "editor"] as const;
export type Role = (typeof ROLES)[number];

export const ACTIONS = ["create", "read", "update", "delete"] as const;
export type Action = (typeof ACTIONS)[number];

export const PERMISSIONS: Record<Role, readonly Action[]> = {
  admin: ACTIONS,
  editor: ["read", "update"],
};

export const TOKEN_COOKIE = "token";
export const OTP_MAX_ATTEMPTS = 5;

const email = z.string().trim().toLowerCase().email();
const password = z.string().min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
  email,
  password: z.string().min(1),
});

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(2).optional(),
    email: email.optional(),
  })
  .refine((v) => v.name !== undefined || v.email !== undefined, "Nothing to update");

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z.object({
  email,
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
  password,
});

export const passwordSchema = password;

export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
