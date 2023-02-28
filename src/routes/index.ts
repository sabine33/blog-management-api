import { Request, Router } from "express";
import articlesRoute from "./articles.route";
import authRoute from "./auth.route";
import helloRoutes from "./hello.route";
import uploadRoutes from "./upload.route";
import docsRoutes from "./docs.route";

export default () => {
  const router = Router();
  router.use("/", helloRoutes());
  router.use("/articles", articlesRoute());
  router.use("/auth", authRoute());
  router.use("/upload", uploadRoutes());
  router.use("/docs", docsRoutes());

  return router;
};
