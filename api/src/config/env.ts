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
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().default(""),
  SMTP_PASS: z.string().default(""),
  MAIL_FROM: z.string().default("Study India Fair <no-reply@studyindiafair.com>"),
  OTP_EXPIRES_MIN: z.coerce.number().default(10),
});

export const env = schema.parse(process.env);
