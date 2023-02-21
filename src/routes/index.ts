import { Request, Router } from "express";
import articlesRoute from "./articles.route";
import helloRoutes from "./hello.route";

export default () => {
  const router = Router();
  router.use("/", helloRoutes());
  router.use("/articles", articlesRoute());
  return router;
};
