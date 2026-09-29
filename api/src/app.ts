import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { routes } from "./routes.js";
import { CACHE_TAGS, invalidate } from "./utils/cache.js";

export const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin:
      env.NODE_ENV === "production"
        ? env.CORS_ORIGINS.split(",").filter(Boolean)
        : true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/init-db", async (req, res) => {
  if (!req.query.pass || req.query.pass != env.INIT_DB_PASS) {
    return res.send("Init Db Password is required");
  }

  try {
    const migrateJs = await import("./db/migrate.js");
    const seedJs = await import("./db/seed.js");

    await (migrateJs as any).run();
    await (seedJs as any).run();
    await invalidate(...CACHE_TAGS);
    res.send("Migration and Seed Done!")
  } catch (error) {
    res.send(error);
  }
});

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);
