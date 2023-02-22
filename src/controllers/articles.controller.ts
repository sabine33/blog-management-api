import { IArticleService } from "@/interfaces";
import articlesService from "@/services/articles.service";
import { Request, Response, NextFunction } from "express";

class ArticlesController {
  private articlesService: IArticleService;
  constructor(articlesService: IArticleService) {
    this.articlesService = articlesService;
  }

  index = async (req: Request, res: Response) => {
    try {
      let allArticles = await this.articlesService.listAllArticles();

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
      let article = await this.articlesService.getById({ articleId: id });

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
      let articles = await this.articlesService.getByAuthor({ authorId: id });
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
      let articles = await this.articlesService.add(article);
      res.success({
        message: "Articles created successfully.",
        data: articles,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  };
}

export default new ArticlesController(articlesService);
