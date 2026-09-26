import { Router } from "express";
import { can, requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { rateLimit } from "../../utils/rateLimit.js";
import {
  createFormSchema,
  enquiryFilterSchema,
  enquiryParamSchema,
  formIdParamSchema,
  idParamSchema,
  listEnquiriesSchema,
  listFormsSchema,
  SUBMIT_RATE_LIMIT,
  submitEnquirySchema,
  updateFormSchema,
} from "./constant.js";
import * as service from "./service.js";

export const formRoutes = Router();

formRoutes.post(
  "/:formId/enquiries",
  rateLimit(SUBMIT_RATE_LIMIT),
  validate(formIdParamSchema, "params"),
  validate(submitEnquirySchema),
  asyncHandler(async (req, res) => {
    const { formId } = formIdParamSchema.parse(req.params);
    res.status(201).json(await service.submit(formId, req.body, req.ip));
  })
);

formRoutes.use(requireAuth);

formRoutes.get(
  "/",
  validate(listFormsSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listFormsSchema.parse(req.query)));
  })
);

formRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

formRoutes.post(
  "/",
  can("create"),
  validate(createFormSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body, req.user!.id));
  })
);

formRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateFormSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

formRoutes.delete(
  "/:id",
  can("delete"),
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  })
);

formRoutes.get(
  "/:id/enquiries",
  validate(idParamSchema, "params"),
  validate(listEnquiriesSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.listEnquiries(Number(req.params.id), listEnquiriesSchema.parse(req.query)));
  })
);

formRoutes.get(
  "/:id/enquiries/export",
  validate(idParamSchema, "params"),
  validate(enquiryFilterSchema, "query"),
  asyncHandler(async (req, res) => {
    const { filename, csv } = await service.exportEnquiries(Number(req.params.id), enquiryFilterSchema.parse(req.query));
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  })
);

formRoutes.delete(
  "/:id/enquiries/:enquiryId",
  can("delete"),
  validate(enquiryParamSchema, "params"),
  asyncHandler(async (req, res) => {
    const { id, enquiryId } = enquiryParamSchema.parse(req.params);
    await service.removeEnquiry(id, enquiryId);
    res.status(204).end();
  })
);
