import { articles } from "../../constants/articles";
import { IArticleService, IArticleRepository } from "../../interfaces";
import ArticleService from "../../services/articles.service";
import { ArticleType } from "../../types";
import localRepository from "../../repositories/local.repository";
describe("ArticleService", () => {
  let articleService: IArticleService;
  const mockArticles = structuredClone(articles);

  beforeEach(() => {
    articleService = new ArticleService(localRepository);
  });

  afterEach(() => {});

  describe("listAllArticles", () => {
    it("returns all articles", async () => {
      const articles = await articleService.listAllArticles();
      expect(articles).toEqual(mockArticles);
    });
  });
  describe("getById", () => {
    it("returns the article with the given ID", async () => {
      const id = "1";
      const article = await articleService.getById({ id });
      expect(article).toEqual(mockArticles[0]);
      expect(article.title).toBe(mockArticles[0].title);
    });

    it("throws an error if the article does not exist", async () => {
      const id = "99";
      expect(await articleService.getById({ id })).toThrow(
        "No article found with given ID"
      );
    });
  });
  describe("getByAuthor", () => {
    it("returns all articles by the given author", async () => {
      const userId = 1;
      const articles = await articleService.getByAuthor({ userId });
      console.log(articles);
      expect(articles).toEqual([mockArticles[0]]);
    });
  });
  it("returns an empty array if there are no articles by the given author", async () => {
    const userId = 44;
    const articles = await articleService.getByAuthor({ userId });
    expect(articles).toEqual([]);
  });
});
