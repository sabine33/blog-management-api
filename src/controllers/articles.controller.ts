import { IArticleService } from "@/interfaces";
import redisClient from "@/loaders/redis.loader";
import { invalidateCache, storeToCache } from "@/middlewares/redis.middleware";
import articlesService from "@/services/articles.service";
import { Request, Response, NextFunction } from "express";

class ArticlesController {
  private articlesService;
  constructor(articlesService) {
    this.articlesService = articlesService;
  }

  index = async (req: Request, res: Response) => {
    try {
      let allArticles = await this.articlesService.listAllArticles();

      console.log(req.url);
      await storeToCache(req.originalUrl || req.url, allArticles);

      res.success({
        message: "List of articles loaded successfully.",
        data: allArticles,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      let article = await this.articlesService.getById({ id });

      await storeToCache(req.originalUrl || req.url, article);

      if (!article) {
        throw new Error("Article with given ID not found.");
      }
      res.success({
        message: "Particular article loaded successfully.",
        data: article,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  };
  getByAuthor = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      let articles = await this.articlesService.getByAuthor({ userId: id });
      await storeToCache(req.originalUrl || req.url, articles);
      res.success({
        message: "Articles loaded successfully.",
        data: articles,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  };
  getByCategory = async (req: Request, res: Response) => {
    try {
      let { category } = req.params;
      console.log(category);
      let articles = await this.articlesService.getByCategory({
        category: category.toLowerCase(),
      });
      await storeToCache(req.originalUrl || req.url, articles);
      res.success({
        message: "Articles loaded successfully.",
        data: articles,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  };
  updateArticle = async (req: Request, res: Response) => {
    let { id } = req.params;
    let article = req.body;
    try {
      let updatedArticle = await this.articlesService.updateById({
        id,
        article,
      });

      //invalidate cache on update

      res.success({
        message: "Articles updated successfully.",
        data: updatedArticle,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  };
  deleteArticle = async (req: Request, res: Response) => {
    let { id } = req.params;
    console.log(id);
    try {
      let article = await this.articlesService.deleteById(id);

      res.success({
        message: "Articles deleted successfully.",
        data: article,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  };

  createArticle = async (req: Request, res: Response, next: NextFunction) => {
    let article = req.body;
    try {
      //github user ID
      if (req.session.user) {
        article.userId = req.session.user.id;
      }
      let createdArticle = await this.articlesService.add(article);
      res.success({
        message: "Articles created successfully.",
        data: createdArticle,
        statusCode: 201,
        status: true,
      });
    } catch (ex) {
      console.log(ex);
      throw new Error(ex);
    }
  };
}

export default new ArticlesController(articlesService);
