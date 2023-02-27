import * as redis from "redis";

let redisClient = null;
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

try {
  redisClient = redis.createClient({ url: REDIS_URL });
} catch (err) {
  console.error("Error connecting to Redis:", err);
}

export default redisClient;
