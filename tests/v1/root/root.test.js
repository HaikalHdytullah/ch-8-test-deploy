const request = require("supertest");
const app = require("../../../app");

describe("GET /", () => {
  it("should response with 200 as status code", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: expect.any(String),
        message: expect.any(String),
      })
    );
  });
});
