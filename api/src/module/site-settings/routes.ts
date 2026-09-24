import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { updateSiteSettingsSchema } from "./constant.js";
import * as service from "./service.js";

export const siteSettingsRoutes = Router();

siteSettingsRoutes.get(
  "/public",
  asyncHandler(async (_req, res) => {
    res.json(await service.getPublic());
  })
);

siteSettingsRoutes.use(requireAuth, requireRole("admin", "editor"));

siteSettingsRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await service.get());
  })
);

siteSettingsRoutes.put(
  "/",
  validate(updateSiteSettingsSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(req.body, req.user!.id));
  })
);
