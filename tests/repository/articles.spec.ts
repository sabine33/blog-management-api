import articlesService from "@/services/articles.service";
import { ArticleType } from "@/types";

const article: ArticleType = {
  id: Math.random() * 100,
  title: "Hello World #1",
  content: "Hello World details #1",
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: new Date(),
  authorId: Math.random() * 10,
};

describe("Article Repository", () => {
  it("should add article when add method is called", async () => {
    await articlesService.add(article);
  });
  it("should update article when update method is called", async () => {});
  it("should delete article when delete method is called", async () => {});
  it("should get article when get method is called", async () => {});
  it("should get all articles when list method is called", async () => {});
});
