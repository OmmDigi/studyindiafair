import { z } from "zod";

export const ROLES = ["admin", "editor"] as const;
export const TOKEN_COOKIE = "token";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginSchema>;
