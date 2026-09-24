import { Router } from "express";
import { env } from "../../config/env.js";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  forgotPasswordSchema,
  loginSchema,
  PERMISSIONS,
  resetPasswordSchema,
  TOKEN_COOKIE,
  updateProfileSchema,
} from "./constant.js";
import * as service from "./service.js";

export const authRoutes = Router();

authRoutes.post(
  "/login",
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const result = await service.login(req.body);
    res.cookie(TOKEN_COOKIE, result.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ ...result, permissions: PERMISSIONS[result.user.role] });
  })
);

authRoutes.post("/logout", (_req, res) => {
  res.clearCookie(TOKEN_COOKIE);
  res.json({ message: "Logged out" });
});

authRoutes.get("/me", requireAuth, (req, res) => {
  res.json({ ...req.user, permissions: PERMISSIONS[req.user!.role] });
});

authRoutes.patch(
  "/me",
  requireAuth,
  validate(updateProfileSchema),
  asyncHandler(async (req, res) => {
    const user = await service.updateProfile(req.user!.id, req.body);
    res.json({ ...user, permissions: PERMISSIONS[user.role as keyof typeof PERMISSIONS] });
  })
);

authRoutes.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  asyncHandler(async (req, res) => {
    await service.forgotPassword(req.body.email);
    res.json({ message: "If the email is registered, an OTP has been sent" });
  })
);

authRoutes.post(
  "/reset-password",
  validate(resetPasswordSchema),
  asyncHandler(async (req, res) => {
    await service.resetPassword(req.body);
    res.json({ message: "Password updated. Please log in." });
  })
);
