import ArticlesController from "@/controllers/articles.controller";
import helloController from "@/controllers/hello.controller";
import { isAuthenticated } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import articleRepository from "@/repositories/article.repository";
import ArticleService from "@/services/articles.service";
import {
  articleSchema,
  articleIdSchema,
} from "@/validators/articles.validator";
import { Request, Response, Router } from "express";

const router = Router();
const articlesController = new ArticlesController(
  new ArticleService(articleRepository)
);
export default () => {
  router.get("/", articlesController.index);
  router.get("/:id", validate(articleIdSchema), articlesController.getById);
  router.get(
    "/author/:id",
    validate(articleIdSchema),
    articlesController.getByAuthor
  );
  router.get("/category/:category", articlesController.getByCategory);
  router.put(
    "/:id",
    validate(articleIdSchema),
    isAuthenticated,
    articlesController.updateArticle
  );
  router.delete(
    "/:id",
    validate(articleIdSchema),
    isAuthenticated,
    articlesController.deleteArticle
  );
  router.post("/", isAuthenticated, articlesController.createArticle);

  return router;
};
