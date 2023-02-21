import articlesController from "@/controllers/articles.controller";
import helloController from "@/controllers/hello.controller";
import { Request, Response, Router } from "express";

const router = Router();
export default () => {
  router.get("/", articlesController.index);
  router.get("/:id", articlesController.getById);
  router.get("/author/:id", articlesController.getByAuthor);
  router.put("/:id", articlesController.updateArticle);
  router.delete("/:id", articlesController.deleteArticle);
  router.post("/", articlesController.createArticle);

  return router;
};
