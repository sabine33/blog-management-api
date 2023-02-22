import request from "supertest";
import config from "../../src/config";

describe("GET /", () => {
  it("Returns success message on healthcheck route", async () => {
    const res = await request(config.baseURL).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});
