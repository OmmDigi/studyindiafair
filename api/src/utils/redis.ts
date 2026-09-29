import { Redis } from "ioredis";
import { env } from "../config/env.js";

const client = env.REDIS_URL
  ? new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      retryStrategy: (times) => Math.min(times * 500, 10_000),
    })
  : null;

let lastError = 0;
client?.on("error", (err) => {
  if (Date.now() - lastError < 60_000) return;
  lastError = Date.now();
  console.error("Redis error:", err.message);
});

export function redis() {
  return client?.status === "ready" ? client : null;
}
