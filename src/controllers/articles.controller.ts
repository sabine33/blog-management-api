import { CustomError } from "@/error";
import { IArticleService } from "@/interfaces";
import { invalidateCache, storeToCache } from "@/middlewares/redis.middleware";

export function sayHello() {
  console.log("SayeHello");
}
class ArticlesController {
  private articlesService: IArticleService;
  constructor(articlesService) {
    this.articlesService = articlesService;
  }

  index = async (req, res) => {
    try {
      let allArticles = await this.articlesService.listAllArticles();

      await storeToCache(req.originalUrl || req.url, allArticles);

      sayHello();

      res.success({
        message: "List of articles loaded successfully.",
        data: allArticles,
      });
    } catch (ex) {
      throw new CustomError({
        message: "Unable to fetch articles:" + ex.message,
        status: false,
        statusCode: 403,
      });
    }
  };

  getById = async (req, res) => {
    let { id } = req.params;
    let article = await this.articlesService.getById({ id });

    // await storeToCache(req.originalUrl || req.url, article);

    if (!article) {
      throw new CustomError({
        message: "Article with given ID not found.",
        statusCode: 404,
        status: false,
      });
    }
    res.success({
      message: "Particular article loaded successfully.",
      data: article,
    });
  };
  getByAuthor = async (req, res) => {
    try {
      let { id } = req.params;
      console.log("Cookies: ", req.cookies);

      let articles = await this.articlesService.getByAuthor({ userId: id });
      await storeToCache(req.originalUrl || req.url, articles);
      res.success({
        message: "Articles loaded successfully.",
        data: articles,
      });
    } catch (ex) {
      throw new CustomError({
        message: "Unable to load article:" + ex.message,
        status: false,
        statusCode: 403,
      });
    }
  };
  getByCategory = async (req, res) => {
    try {
      let { category } = req.params;
      console.log(category);
      console.log(req.user);
      let articles = await this.articlesService.getByCategory({
        category: category.toLowerCase(),
      });
      await storeToCache(req.originalUrl || req.url, articles);
      res.success({
        message: "Articles loaded successfully.",
        data: articles,
      });
    } catch (ex) {
      throw new CustomError({
        message: "Unable to load articles:" + ex.message,
        status: false,
        statusCode: 403,
      });
    }
  };
  updateArticle = async (req, res) => {
    let { id } = req.params;
    let article = req.body;
    try {
      let updatedArticle = await this.articlesService.updateById({
        id,
        article,
      });
      invalidateCache(req.originalUrl || req.url);

      //invalidate cache on update
      res.success({
        message: "Articles updated successfully.",
        data: updatedArticle,
      });
    } catch (ex) {
      throw new CustomError({
        message: "Unable to update article:" + ex.message,
        status: false,
        statusCode: 403,
      });
    }
  };
  deleteArticle = async (req, res) => {
    let { id } = req.params;

    let article = await this.articlesService.deleteById(id);
    invalidateCache(req.originalUrl || req.url);

    res.success({
      message: "Articles deleted successfully.",
      data: id,
      statusCode: 200,
    });
  };

  createArticle = async (req, res, next) => {
    let article = req.body;
    try {
      //github user ID
      if (req.user) {
        article.userId = req.user.id;
      }
      let createdArticle = await this.articlesService.add(article);
      res.success({
        message: "Articles created successfully.",
        data: createdArticle,
        statusCode: 201,
        status: true,
      });
    } catch (ex) {
      throw new CustomError({
        message: "Unable to create article:" + ex.message,
        status: false,
        statusCode: 403,
      });
    }
  };
}

export default ArticlesController;
