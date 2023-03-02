import request from "supertest";
import config from "../../config";
import app from "../../app";
import { ArticleType } from "../../types";
import { faker } from "@faker-js/faker";

let AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6Imdob19hZ0J5UUFUdjJZQWNwVFgySnpyYlFJczQ4TUdGSGwwbnVUNmIiLCJpYXQiOjE2Nzc1NTA4MjAsImV4cCI6MTY3NzU2MTYyMH0.mk148X6Y4fNxQq84WAOXTqBWolKAQ_G_EBGu0Su9d-A";

describe("/articles", () => {
  let createdArticle;

  // Test GET /articles
  describe("GET /articles", () => {
    it("responds with json", async () => {
      const res = await request(config.baseURL).get("/articles");
      expect(res.statusCode).toEqual(200);
      expect(res.body.errors).not.toBeDefined();
      expect(res.body.status).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.message).toBeDefined();
      expect(res.headers["content-type"]).toMatch(/json/);
    });
  });

  // Test POST /articles

  describe("POST /articles", () => {
    it("creates a new article", async () => {
      const newArticle: Partial<ArticleType> = {
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        userId: +faker.random.numeric(),
        thumbnailUrl: faker.image.imageUrl(),
        createdAt: faker.date.past().getMilliseconds(),
        status: true,
        category: "world",
      };
      createdArticle = newArticle;
      const res = await request(config.baseURL)
        .post("/articles")
        .send(newArticle)
        .set("Authorization", `Bearer ${AUTH_TOKEN}`);
      expect(res.statusCode).toEqual(201);
      expect(res.body.errors).not.toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBeDefined();
      createdArticle.id = res.body.data.id;
      console.log("ID is " + createdArticle.id);
      console.log("created :" + createdArticle.id);
    });
  });
  // Test GET /articles/:id

  describe("GET /articles/:id", () => {
    it("responds with the specified article", async () => {
      const response = await request(config.baseURL).get(
        `/articles/${createdArticle.id}`
      );
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.status).toBe(true);
      expect(response.body.data.title).toBe(createdArticle.title);
      expect(response.body.data.content).toBe(createdArticle.content);
      expect(response.body.message).toBe(
        "Particular article loaded successfully."
      );
    });

    it("responds with 404 if article is not found", async () => {
      const response = await request(config.baseURL).get(
        "/articles/123456789012345678901234"
      );
      expect(response.statusCode).toBe(404);
    });
  });

  describe("GET /articles/author/:id", () => {
    it("responds with the specified article from given author", async () => {
      const response = await request(config.baseURL).get(
        `/articles/author/${createdArticle.userId}`
      );
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.status).toBe(true);
    });
  });

  describe("GET /articles/category/:id", () => {
    it("responds with the specified article from given category", async () => {
      const response = await request(config.baseURL).get(
        `/articles/category/${createdArticle.category}`
      );
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.status).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  // Test PUT /articles/:id
  describe("PUT /articles/:id", () => {
    it("updates the specified article", async () => {
      const updatedArticle = {
        title: faker.lorem.words(),
        content: faker.lorem.paragraphs(),
        category: "world",
      };
      const response = await request(config.baseURL)
        .put(`/articles/${createdArticle.id}`)
        .send(updatedArticle)
        .set("Authorization", `Bearer ${AUTH_TOKEN}`);
      expect(response.status).toBe(200);
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body.status).toBe(true);
      expect(response.body.data.title).toBe(updatedArticle.title);
      expect(response.body.data.content).toBe(updatedArticle.content);
      expect(response.body.message).toBe("Articles updated successfully.");
    });

    it("responds with 403 if article is not found", async () => {
      const updatedArticle = {
        title: "Updated Test Article",
        content: "This is an updated test article.",
      };
      const response = await request(config.baseURL)
        .put("/articles/123456789012345678901234")
        .send(updatedArticle)
        .set("Authorization", `Bearer ${AUTH_TOKEN}`);
      expect(response.body.statusCode).toBe(403);
    });
  });
  describe("DELETE /articles/:id", () => {
    it("deletes the specified article", async () => {
      const response = await request(config.baseURL)
        .delete(`/articles/${createdArticle.id}`)
        .set("Authorization", `Bearer ${AUTH_TOKEN}`);
      expect(response.statusCode).toBe(200);
    });

    it("responds with 403 if article is not found", async () => {
      const response = await request(config.baseURL)
        .delete("/articles/123456789012345678901234")
        .set("Authorization", `Bearer ${AUTH_TOKEN}`);
      expect(response.statusCode).toBe(200);
    });
  });
});
