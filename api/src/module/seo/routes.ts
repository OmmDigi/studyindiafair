import { Router } from "express";
import { can, requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { pageIdParamSchema, slugParamSchema, upsertSeoSchema } from "./constant.js";
import * as service from "./service.js";

export const seoRoutes = Router();

seoRoutes.get(
  "/public/:slug",
  validate(slugParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getPublic(String(req.params.slug)));
  })
);

seoRoutes.use(requireAuth);

seoRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await service.list());
  })
);

seoRoutes.get(
  "/:pageId",
  validate(pageIdParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.get(Number(req.params.pageId)));
  })
);

seoRoutes.put(
  "/:pageId",
  can("update"),
  validate(pageIdParamSchema, "params"),
  validate(upsertSeoSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.upsert(Number(req.params.pageId), req.body, req.user!.id));
  })
);
