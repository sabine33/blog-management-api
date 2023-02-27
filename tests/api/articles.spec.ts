import app from "@/app";
import { ArticleType } from "@/types";
import request from "supertest";

const mockArticle: Partial<ArticleType> = {
  title: "Article 4",
  content: "Hahah",
  thumbnailUrl: "https://loremflickr.com/g/320/240/nepal",
  userId: 2,
  createdAt: Date.now(),
  updatedAt: null,
  deletedAt: null,
  status: true,
};
describe("Articles API", () => {
  let articleId;
  test("should create a new blog post", async () => {
    const res = await request(app).post("/articles").send(mockArticle);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe(mockArticle.title);
    expect(res.body.content).toBe(mockArticle.content);
    articleId = res.body.id;
  });
});
