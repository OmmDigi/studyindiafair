import { Router } from "express";
import { authRoutes } from "./module/auth/routes.js";
import { faqRoutes } from "./module/faqs/routes.js";
import { testimonialCategoryRoutes } from "./module/testimonial-categories/routes.js";
import { testimonialRoutes } from "./module/testimonials/routes.js";
import { userRoutes } from "./module/users/routes.js";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/testimonial-categories", testimonialCategoryRoutes);
routes.use("/testimonials", testimonialRoutes);
routes.use("/faqs", faqRoutes);
