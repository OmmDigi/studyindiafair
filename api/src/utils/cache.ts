import type { NextFunction, Request, Response } from "express";
import { redis } from "./redis.js";

export const CACHE_TAGS = [
  "faqs",
  "gallery",
  "gallery-categories",
  "pages",
  "scholarship",
  "seo",
  "site-settings",
  "team-members",
  "testimonials",
  "testimonial-categories",
  "upcoming-events",
] as const;

type Tag = (typeof CACHE_TAGS)[number];

const TTL_SECONDS = 3600;
const tagKey = (tag: Tag) => `cachetag:${tag}`;

export function cached(...tags: Tag[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const client = redis();
    if (!client) return next();

    const key = `cache:${req.originalUrl}`;
    try {
      const hit = await client.get(key);
      if (hit !== null) {
        res.setHeader("X-Cache", "HIT");
        return res.type("application/json").send(hit);
      }
    } catch {
      return next();
    }

    res.setHeader("X-Cache", "MISS");
    const json = res.json.bind(res);
    res.json = (body: unknown) => {
      if (res.statusCode === 200) {
        const multi = client.multi().set(key, JSON.stringify(body), "EX", TTL_SECONDS);
        for (const tag of tags) multi.sadd(tagKey(tag), key).expire(tagKey(tag), TTL_SECONDS);
        multi.exec().catch(() => {});
      }
      return json(body);
    };
    next();
  };
}

export async function invalidate(...tags: Tag[]) {
  const client = redis();
  if (!client) return;
  try {
    for (const tag of tags) {
      const keys = await client.smembers(tagKey(tag));
      await client.del(tagKey(tag), ...keys);
    }
  } catch (err) {
    console.error("Cache invalidation failed:", (err as Error).message);
  }
}

export function invalidateOnWrite(...tags: Tag[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      res.on("finish", () => {
        if (res.statusCode < 400) void invalidate(...tags);
      });
    }
    next();
  };
}
