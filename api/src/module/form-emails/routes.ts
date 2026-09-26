import { Router } from "express";
import { can, requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { formParamSchema, saveTemplateSchema, templateParamSchema, testTemplateSchema } from "./constant.js";
import * as service from "./service.js";

export const formEmailRoutes = Router();

formEmailRoutes.use(requireAuth);

formEmailRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await service.listForms());
  })
);

formEmailRoutes.get(
  "/:formId",
  validate(formParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getSetup(Number(req.params.formId)));
  })
);

formEmailRoutes.put(
  "/:formId/:type",
  can("update"),
  validate(templateParamSchema, "params"),
  validate(saveTemplateSchema),
  asyncHandler(async (req, res) => {
    const { formId, type } = templateParamSchema.parse(req.params);
    res.json(await service.save(formId, type, req.body, req.user!.id));
  })
);

formEmailRoutes.post(
  "/:formId/:type/test",
  can("update"),
  validate(templateParamSchema, "params"),
  validate(testTemplateSchema),
  asyncHandler(async (req, res) => {
    const { formId, type } = templateParamSchema.parse(req.params);
    res.json(await service.sendTest(formId, type, req.body));
  })
);
