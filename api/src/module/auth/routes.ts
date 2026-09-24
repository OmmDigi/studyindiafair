import { Router } from "express";
import { env } from "../../config/env.js";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { loginSchema, TOKEN_COOKIE } from "./constant.js";
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
    res.json(result);
  })
);

authRoutes.post("/logout", (_req, res) => {
  res.clearCookie(TOKEN_COOKIE);
  res.json({ message: "Logged out" });
});

authRoutes.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json(await service.getMe(req.user!.id));
  })
);
