import expressLoader from "./express.loader";
import redisClient from "./redis.loader";

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
};
