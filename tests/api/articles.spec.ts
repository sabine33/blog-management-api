import request from "supertest";
import config from "../../src/config";

describe("GET /articles", () => {
  it("Returns list of articles if article is present.", async () => {
    const res = await request(config.baseURL + "/articles").get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
