import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, "Not found"));
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message, details: err.details });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}
