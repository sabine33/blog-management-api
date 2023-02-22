import { Request, Router } from "express";
import articlesRoute from "./articles.route";
import authRoute from "./auth.route";
import helloRoutes from "./hello.route";

export default () => {
  const router = Router();
  router.use("/", helloRoutes());
  router.use("/articles", articlesRoute());
  router.use("/auth", authRoute());
  return router;
};
