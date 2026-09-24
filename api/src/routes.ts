import { Router } from "express";
import { authRoutes } from "./module/auth/routes.js";
import { faqRoutes } from "./module/faqs/routes.js";
import { galleryCategoryRoutes } from "./module/gallery-categories/routes.js";
import { galleryRoutes } from "./module/gallery/routes.js";
import { siteSettingsRoutes } from "./module/site-settings/routes.js";
import { teamMemberRoutes } from "./module/team-members/routes.js";
import { testimonialCategoryRoutes } from "./module/testimonial-categories/routes.js";
import { testimonialRoutes } from "./module/testimonials/routes.js";
import { userRoutes } from "./module/users/routes.js";

export const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/testimonial-categories", testimonialCategoryRoutes);
routes.use("/testimonials", testimonialRoutes);
routes.use("/faqs", faqRoutes);
routes.use("/team-members", teamMemberRoutes);
routes.use("/gallery-categories", galleryCategoryRoutes);
routes.use("/gallery", galleryRoutes);
routes.use("/site-settings", siteSettingsRoutes);
