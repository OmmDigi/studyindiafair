import type { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError.js";
import { redis } from "./redis.js";

type Options = { name: string; windowMs: number; max: number };

export function rateLimit({ name, windowMs, max }: Options) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
  }, windowMs).unref();

  function hitMemory(ip: string) {
    const now = Date.now();
    const entry = hits.get(ip);
    if (!entry || entry.resetAt <= now) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
      return { count: 1, resetMs: windowMs };
    }
    entry.count++;
    return { count: entry.count, resetMs: entry.resetAt - now };
  }

  async function hit(ip: string) {
    const client = redis();
    if (!client) return hitMemory(ip);
    const key = `ratelimit:${name}:${ip}`;
    try {
      const result = await client.multi().incr(key).pexpire(key, windowMs, "NX").pttl(key).exec();
      if (!result) return hitMemory(ip);
      return { count: Number(result[0][1]), resetMs: Math.max(Number(result[2][1]), 0) };
    } catch {
      return hitMemory(ip);
    }
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    const { count, resetMs } = await hit(req.ip ?? "unknown");
    res.setHeader("RateLimit-Limit", max);
    res.setHeader("RateLimit-Remaining", Math.max(max - count, 0));
    if (count > max) {
      res.setHeader("Retry-After", Math.ceil(resetMs / 1000));
      return next(new AppError(429, "Too many requests, please try again later"));
    }
    next();
  };
}

export const publicRateLimit = rateLimit({ name: "public", windowMs: 60_000, max: 120 });
