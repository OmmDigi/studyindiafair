import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { query } from "../db/pool.js";
import { PERMISSIONS, type Action, type Role } from "../module/auth/constant.js";
import { AppError } from "../utils/AppError.js";

export type AuthUser = { id: number; name: string; email: string; role: Role };

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = req.cookies?.token ?? (header?.startsWith("Bearer ") ? header.slice(7) : undefined);
  if (!token) return next(new AppError(401, "Unauthorized"));
  let id: number;
  try {
    id = (jwt.verify(token, env.JWT_SECRET) as { id: number }).id;
  } catch {
    return next(new AppError(401, "Invalid token"));
  }
  try {
    const { rows } = await query<AuthUser & { is_active: boolean }>(
      "SELECT id, name, email, role, is_active FROM users WHERE id = $1",
      [id]
    );
    const user = rows[0];
    if (!user || !user.is_active) return next(new AppError(401, "Account disabled or not found"));
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    next();
  } catch (err) {
    next(err);
  }
}

export const requireRole =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return next(new AppError(403, "Forbidden"));
    next();
  };

export const can =
  (action: Action) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !PERMISSIONS[req.user.role].includes(action)) {
      return next(new AppError(403, `You do not have permission to ${action}`));
    }
    next();
  };
