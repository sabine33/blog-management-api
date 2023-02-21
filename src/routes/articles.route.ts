import articlesController from "@/controllers/articles.controller";
import helloController from "@/controllers/hello.controller";
import { Request, Response, Router } from "express";

const router = Router();
export default () => {
  router.get("/", articlesController.index);

  return router;
};
