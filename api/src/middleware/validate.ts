import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { AppError } from "../utils/AppError.js";

export const validate =
  (schema: ZodType, source: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) return next(new AppError(422, "Validation failed", result.error.flatten()));
    if (source === "body") req.body = result.data;
    next();
  };
