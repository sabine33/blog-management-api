import redisClient from "@/loaders/redis.loader";
import { Request, Response, NextFunction } from "express";

export const redisCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.originalUrl || req.url;
    let redisResponse = await redisClient.get(key);
    return res.success({
      data: JSON.parse(redisResponse),
    });
  } catch (ex) {
    console.log("Error loading contents from redis cache.");
    return res.error({
      message: "Error loading content from redis cache.",
    });
  }
};

export const storeToCache = async (key: string, data: any) => {
  try {
    await redisClient.set(key, JSON.stringify(data));
  } catch (ex) {
    console.log(`Error storing item to cache ${key}: ${ex}`);
  }
};

//Invalidates cache
export const invalidateCache = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (ex) {
    console.log("Error invalidating cache :" + ex);
  }
};
