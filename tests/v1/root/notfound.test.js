const request = require("supertest");
const app = require("../../../app");

describe("GET /*", () => {
  it("should response with 404 as status code", async () => {
    const response = await request(app).get("/*");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          name: expect.any(String),
          message: expect.any(String),
          details: expect.objectContaining({
            method: expect.any(String),
            url: expect.any(String),
          }),
        }),
      })
    );
  });
});
