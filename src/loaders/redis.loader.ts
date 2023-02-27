import * as redis from "redis";
let redisClient = null;
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

export default redisClient = redis.createClient({ url: REDIS_URL });
