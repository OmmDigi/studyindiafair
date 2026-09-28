import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { adminResetPasswordSchema, createUserSchema, idParamSchema, listUsersSchema, updateUserSchema } from "./constant.js";
import * as service from "./service.js";

export const userRoutes = Router();

userRoutes.use(requireAuth, requireRole("admin"));

userRoutes.get(
  "/",
  validate(listUsersSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listUsersSchema.parse(req.query)));
  })
);

userRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

userRoutes.post(
  "/",
  validate(createUserSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body));
  })
);

userRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateUserSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

userRoutes.post(
  "/:id/reset-password",
  validate(idParamSchema, "params"),
  validate(adminResetPasswordSchema),
  asyncHandler(async (req, res) => {
    await service.resetPassword(Number(req.params.id), req.body.password);
    res.json({ message: "Password updated" });
  })
);

userRoutes.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id), req.user!.id);
    res.status(204).end();
  })
);
