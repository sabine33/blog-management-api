import { IArticleService } from "@/interfaces";
import articlesService from "@/services/articles.service";
import { Request, Response, NextFunction } from "express";

class ArticlesController {
  constructor(private articleService: IArticleService) {}

  async index(req: Request, res: Response, next: NextFunction) {
    res.success({ message: "This route lists all articles", data: null });
  }
}

export default new ArticlesController(articlesService);
