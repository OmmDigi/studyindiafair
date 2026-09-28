import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { updateScholarshipSchema } from "./constant.js";
import * as service from "./service.js";

export const scholarshipRoutes = Router();

scholarshipRoutes.get(
  "/public",
  asyncHandler(async (_req, res) => {
    res.json(await service.getPublic());
  })
);

scholarshipRoutes.use(requireAuth, requireRole("admin", "editor"));

scholarshipRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await service.get());
  })
);

scholarshipRoutes.put(
  "/",
  validate(updateScholarshipSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(req.body, req.user!.id));
  })
);
