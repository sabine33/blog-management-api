import articlesController from "@/controllers/articles.controller";
import helloController from "@/controllers/hello.controller";
import { isAuthenticated } from "@/middlewares/auth.middleware";
import { validate } from "@/middlewares/validation.middleware";
import {
  articleSchema,
  articleIdSchema,
} from "@/validators/articles.validator";
import { Request, Response, Router } from "express";

const router = Router();
export default () => {
  router.get("/", articlesController.index);
  router.get(
    "/:id",
    validate(articleIdSchema),

    articlesController.getById
  );
  router.get(
    "/author/:id",
    validate(articleIdSchema),
    articlesController.getByAuthor
  );
  router.get("/category/:category", articlesController.getByCategory);
  router.put(
    "/:id",
    validate(articleIdSchema),
    articlesController.updateArticle
  );
  router.delete(
    "/:id",
    validate(articleIdSchema),
    articlesController.deleteArticle
  );
  router.post("/", articlesController.createArticle);

  return router;
};
