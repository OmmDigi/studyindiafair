import { z } from "zod";

const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
  .optional();

export const RECENT_LIMIT = 10;

export const enquiryStatsSchema = z
  .object({ from: date, to: date })
  .refine((v) => !v.from || !v.to || v.from <= v.to, "From date must be before To date");

export type EnquiryStatsQuery = z.infer<typeof enquiryStatsSchema>;
