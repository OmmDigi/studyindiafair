import { Router } from "express";
import { authRoutes } from "./module/auth/routes.js";
import { userRoutes } from "./module/users/routes.js";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
