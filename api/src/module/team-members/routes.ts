import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { cached, invalidateOnWrite } from "../../utils/cache.js";
import { publicRateLimit } from "../../utils/rateLimit.js";
import {
  createTeamMemberSchema,
  idParamSchema,
  listTeamMembersSchema,
  moveSchema,
  publicListSchema,
  updateTeamMemberSchema,
} from "./constant.js";
import * as service from "./service.js";

export const teamMemberRoutes = Router();

teamMemberRoutes.get(
  "/public",
  publicRateLimit,
  cached("team-members"),
  validate(publicListSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.listPublic(publicListSchema.parse(req.query)));
  })
);

teamMemberRoutes.use(requireAuth);
teamMemberRoutes.use(invalidateOnWrite("team-members"));

teamMemberRoutes.get(
  "/",
  validate(listTeamMembersSchema, "query"),
  asyncHandler(async (req, res) => {
    res.json(await service.list(listTeamMembersSchema.parse(req.query)));
  })
);

teamMemberRoutes.get(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  })
);

teamMemberRoutes.post(
  "/",
  validate(createTeamMemberSchema),
  asyncHandler(async (req, res) => {
    res.status(201).json(await service.create(req.body, req.user!.id));
  })
);

teamMemberRoutes.patch(
  "/:id",
  validate(idParamSchema, "params"),
  validate(updateTeamMemberSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.update(Number(req.params.id), req.body, req.user!.id));
  })
);

teamMemberRoutes.post(
  "/:id/move",
  validate(idParamSchema, "params"),
  validate(moveSchema),
  asyncHandler(async (req, res) => {
    res.json(await service.move(Number(req.params.id), req.body, req.user!.id));
  })
);

teamMemberRoutes.delete(
  "/:id",
  validate(idParamSchema, "params"),
  asyncHandler(async (req, res) => {
    await service.remove(Number(req.params.id));
    res.status(204).end();
  })
);
