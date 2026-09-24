import { config } from "dotenv";
import { z } from "zod";

config({
  path: process.env.NODE_ENV === "production" ? ".env" : ".env.example",
});

const schema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGINS: z.string().default(""),
});

export const env = schema.parse(process.env);
console.log(env);
