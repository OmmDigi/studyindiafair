import { Router } from "express";
import { can, requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createEventSchema,
  idParamSchema,
  listEventsSchema,
  reorderSchema,
  slugParamSchema,
  updateEventSchema,
  updateLogosSchema,
} from "./constant.js";
import * as service from "./service.js";

export const upcomingEventRoutes = Router();

upcomingEventRoutes.get(
  "/public",
  asyncHandler(async (_req, res) => {
    res.json(await service.listPublic());
  })
);

upcomingEventRoutes.get(
  "/public/:slug",
  validate(slugParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getPublic(slugParamSchema.parse(req.params).slug));
  })
);

upcomingEventRoutes.use(requireAuth);

upcomingEventRoutes.get(
  "/",
  validate(listEventsSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listEventsSchema.parse(req.query)));
  })
);

upcomingEventRoutes.put(
  "/reorder",
  validate(reorderSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.reorder(req.body, req.user!.id));
  })
);

upcomingEventRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

upcomingEventRoutes.post(
  "/",
  can("create"),
  validate(createEventSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body, req.user!.id));
  })
);

upcomingEventRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateEventSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

upcomingEventRoutes.put(
  "/:id/logos",
  validate(idParamSchema, "params"),
  validate(updateLogosSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.updateLogos(Number(req.params.id), req.body, req.user!.id));
  })
);

upcomingEventRoutes.delete(
  "/:id",
  can("delete"),
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  })
);
