import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { cached, invalidateOnWrite } from "../../utils/cache.js";
import { publicRateLimit } from "../../utils/rateLimit.js";
import { createCategorySchema, idParamSchema, listCategoriesSchema, reorderSchema, updateCategorySchema } from "./constant.js";
import * as service from "./service.js";

export const galleryCategoryRoutes = Router();

galleryCategoryRoutes.get(
  "/public",
  publicRateLimit,
  cached("gallery-categories", "gallery"),
  asyncHandler(async (_req, res) => {
    res.json(await service.listPublic());
  })
);

galleryCategoryRoutes.use(requireAuth);
galleryCategoryRoutes.use(invalidateOnWrite("gallery-categories"));

galleryCategoryRoutes.get(
  "/",
  validate(listCategoriesSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listCategoriesSchema.parse(req.query)));
  })
);

galleryCategoryRoutes.put(
  "/reorder",
  validate(reorderSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.reorder(req.body, req.user!.id));
  })
);

galleryCategoryRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

galleryCategoryRoutes.post(
  "/",
  validate(createCategorySchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body, req.user!.id));
  })
);

galleryCategoryRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateCategorySchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

galleryCategoryRoutes.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  })
);
