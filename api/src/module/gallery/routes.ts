import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createGallerySchema,
  idParamSchema,
  listGallerySchema,
  publicListSchema,
  reorderSchema,
  updateGallerySchema,
} from "./constant.js";
import * as service from "./service.js";

export const galleryRoutes = Router();

galleryRoutes.get(
  "/public",
  validate(publicListSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.listPublic(publicListSchema.parse(req.query)));
  })
);

galleryRoutes.use(requireAuth);

galleryRoutes.get(
  "/",
  validate(listGallerySchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listGallerySchema.parse(req.query)));
  })
);

galleryRoutes.put(
  "/reorder",
  validate(reorderSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.reorder(req.body, req.user!.id));
  })
);

galleryRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

galleryRoutes.post(
  "/",
  validate(createGallerySchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body, req.user!.id));
  })
);

galleryRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateGallerySchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

galleryRoutes.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  })
);
