import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createFaqSchema,
  idParamSchema,
  listFaqsSchema,
  publicListSchema,
  updateFaqSchema,
} from "./constant.js";
import * as service from "./service.js";

export const faqRoutes = Router();

faqRoutes.get(
  "/public",
  validate(publicListSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.listPublic(publicListSchema.parse(req.query)));
  })
);

faqRoutes.use(requireAuth);

faqRoutes.get(
  "/",
  validate(listFaqsSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listFaqsSchema.parse(req.query)));
  })
);

faqRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

faqRoutes.post(
  "/",
  validate(createFaqSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body, req.user!.id));
  })
);

faqRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateFaqSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

faqRoutes.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  })
);
