import { Router } from "express";
import { authRoutes } from "./module/auth/routes.js";

export const routes = Router();

routes.use("/auth", authRoutes);
