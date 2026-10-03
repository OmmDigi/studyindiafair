import { Router } from "express";
import { can, requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  enquiryParamSchema,
  formParamSchema,
  resendSchema,
  saveWebhookSchema,
  testWebhookSchema,
  webhookParamSchema,
} from "./constant.js";
import * as service from "./service.js";

export const formWebhookRoutes = Router();

formWebhookRoutes.use(requireAuth);

formWebhookRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(await service.listForms());
  })
);

formWebhookRoutes.post(
  "/enquiries/:enquiryId/resend",
  can("update"),
  validate(enquiryParamSchema, "params"),
  validate(resendSchema),
  asyncHandler(async (req, res) => {
    const { enquiryId } = enquiryParamSchema.parse(req.params);
    res.status(202).json(await service.resend(enquiryId, req.body));
  })
);

formWebhookRoutes.get(
  "/:formId",
  validate(formParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getSetup(Number(req.params.formId)));
  })
);

formWebhookRoutes.post(
  "/:formId",
  can("update"),
  validate(formParamSchema, "params"),
  validate(saveWebhookSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(Number(req.params.formId), req.body, req.user!.id));
  })
);

formWebhookRoutes.post(
  "/:formId/test",
  can("update"),
  validate(formParamSchema, "params"),
  validate(testWebhookSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.sendTest(Number(req.params.formId), req.body));
  })
);

formWebhookRoutes.put(
  "/:formId/:id",
  can("update"),
  validate(webhookParamSchema, "params"),
  validate(saveWebhookSchema),
  asyncHandler(async (req, res) => {
    const { formId, id } = webhookParamSchema.parse(req.params);
    res.json(await service.update(formId, id, req.body, req.user!.id));
  })
);

formWebhookRoutes.delete(
  "/:formId/:id",
  can("delete"),
  validate(webhookParamSchema, "params"),
  asyncHandler(async (req, res) => {
    const { formId, id } = webhookParamSchema.parse(req.params);
    await service.remove(formId, id);
    res.status(204).end();
  })
);
