import { IArticleService } from "@/interfaces";
import articlesService from "@/services/articles.service";
import { Request, Response, NextFunction } from "express";

class ArticlesController {
  private articlesService: IArticleService;
  constructor(articlesService: IArticleService) {
    this.articlesService = articlesService;
  }

  index = async (req: Request, res: Response) => {
    let allArticles = await this.articlesService.listAllArticles();

    res.success({
      message: "List of articles loaded successfully.",
      data: allArticles,
    });
  };

  getById = async (req: Request, res: Response) => {
    let { id } = req.params;
    let article = await this.articlesService.getById({ articleId: id });
    res.success({
      message: "Particular article loaded successfully.",
      data: article,
    });
  };
  getByAuthor = async (req: Request, res: Response) => {
    let { id } = req.params;
    let article = await this.articlesService.getByAuthor({ authorId: id });
    res.success({
      message: "Articles loaded successfully.",
      data: article,
    });
  };
  updateArticle = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { article } = req.body;
    let updatedArticle = await this.articlesService.updateById({ id, article });
    res.success({
      message: "Articles updated successfully.",
      data: updatedArticle,
    });
  };
  deleteArticle = async (req: Request, res: Response) => {
    let { id } = req.params;
    let article = await this.articlesService.deleteById(id);
    res.success({
      message: "Articles deleted successfully.",
      data: article,
    });
  };

  createArticle = async (req: Request, res: Response, next: NextFunction) => {
    let article = req.body;
    let articles = await this.articlesService.add(article);
    res.success({
      message: "Articles listed successfully.",
      data: articles,
    });
  };
}

export default new ArticlesController(articlesService);
