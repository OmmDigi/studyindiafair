import { Router } from "express";
import { can, requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createPageSchema, idParamSchema, listPagesSchema, updatePageSchema } from "./constant.js";
import * as service from "./service.js";

export const pageRoutes = Router();

pageRoutes.get(
  "/public",
  asyncHandler(async (_req, res) => {
    res.json(await service.listPublic());
  })
);

pageRoutes.use(requireAuth);

pageRoutes.get(
  "/",
  validate(listPagesSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listPagesSchema.parse(req.query)));
  })
);

pageRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

pageRoutes.post(
  "/",
  can("create"),
  validate(createPageSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body, req.user!.id));
  })
);

pageRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updatePageSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

pageRoutes.delete(
  "/:id",
  can("delete"),
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  })
);
