import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { enquiryStatsSchema } from "./constant.js";
import * as service from "./service.js";

export const dashboardRoutes = Router();

dashboardRoutes.use(requireAuth, requireRole("admin", "editor"));

dashboardRoutes.get(
  "/enquiries",
  validate(enquiryStatsSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.enquiryStats(enquiryStatsSchema.parse(req.query)));
  })
);
