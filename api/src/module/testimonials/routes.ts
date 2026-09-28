import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createTestimonialSchema,
  idParamSchema,
  listTestimonialsSchema,
  publicListSchema,
  updateTestimonialSchema,
} from "./constant.js";
import * as service from "./service.js";

export const testimonialRoutes = Router();

testimonialRoutes.get(
  "/public",
  validate(publicListSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.listPublic(publicListSchema.parse(req.query)));
  })
);

testimonialRoutes.use(requireAuth);

testimonialRoutes.get(
  "/",
  validate(listTestimonialsSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listTestimonialsSchema.parse(req.query)));
  })
);

testimonialRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

testimonialRoutes.post(
  "/",
  validate(createTestimonialSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body, req.user!.id));
  })
);

testimonialRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateTestimonialSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

testimonialRoutes.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  })
);
