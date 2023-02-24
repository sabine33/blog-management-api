import request from "supertest";
import config from "../../src/config";

const GITHUB_CODE = "XXX";

describe("GET /articles", () => {
  it("GET Returns list of articles.", async () => {
    const res = await request(config.baseURL + "/articles").get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
  it("GET Returns a particular article.", async () => {});
});
