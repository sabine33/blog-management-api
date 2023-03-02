import { ArticleType } from "@/types";
import { articles } from "../../constants/articles";
import { IRepository } from "../../interfaces";

describe("Testing repository", () => {
  let repository: IRepository;

  beforeEach(() => {
    repository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      add: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
      getByKey: jest.fn(),
    };
  });
  describe("getAll", () => {
    it("should return all articles", async () => {
      (repository.getAll as jest.Mock).mockResolvedValue(articles);
      const result = await repository.getAll();
      expect(result).toEqual(articles);
      expect(repository.getAll).toHaveBeenCalledTimes(1);
    });
  });
  describe("getById", () => {
    it("should return the article with the given ID", async () => {
      const article = articles.find((article) => article.id == "1");
      (repository.getById as jest.Mock).mockResolvedValue(article);

      const result = await repository.getById("1");

      expect(result).toEqual(article);
      expect(repository.getById).toHaveBeenCalledWith("1");
    });
  });
  describe("add", () => {
    it("should add a new article", async () => {
      const newArticle: ArticleType = {
        title: "New Article 1",
        content: "New Content 1",
        status: true,
        thumbnailUrl: "",
        createdAt: Date.now(),
        userId: 10,
        id: "3333",
      };
      const addedArticle = { ...newArticle };
      (repository.add as jest.Mock).mockResolvedValue(addedArticle);

      const result = await repository.add(newArticle);

      expect(result).toEqual(addedArticle);
      expect(repository.add).toHaveBeenCalledWith(newArticle);
    });
  });
  describe("updateById", () => {
    it("should update the article with the given ID", async () => {
      const updatedArticle = {
        title: "Updated Title",
        content: "Updated Content",
        isFeatured: false,
        status: true,
        category: "world",
        thumbnailUrl: "",
      };
      (repository.updateById as jest.Mock).mockResolvedValue(updatedArticle);

      const result = await repository.updateById("1", {
        title: "Updated Title",
        content: "Updated Content",
        isFeatured: false,
        status: true,
        category: "world",
        thumbnailUrl: "",
      });

      expect(result).toEqual(updatedArticle);
      expect(repository.updateById).toHaveBeenCalledWith("1", {
        title: "Updated Title",
        content: "Updated Content",
        isFeatured: false,
        status: true,
        category: "world",
        thumbnailUrl: "",
      });
    });
  });

  describe("deleteById", () => {
    it("should delete the article with the given ID", async () => {
      (repository.deleteById as jest.Mock).mockResolvedValue(true);

      const result = await repository.deleteById("1");

      expect(result).toEqual(true);
      expect(repository.deleteById).toHaveBeenCalledWith("1");
    });
  });

  describe("getByKey", () => {
    it("should return the articles that match the given key and value", async () => {
      let expectedArticles = articles.filter((article) => article.userId == 1);

      (repository.getByKey as jest.Mock).mockResolvedValue(expectedArticles);

      const result = await repository.getByKey("userId", 1);

      expect(result).toEqual(expectedArticles);
      expect(repository.getByKey).toHaveBeenCalledWith("userId", 1);
    });
  });
});
