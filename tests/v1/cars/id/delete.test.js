const request = require("supertest");
const app = require("../../../../app");
const emailAdmin = "admin@gmail.com";
const emailCustomer = "customer@gmail.com";
const password = "123";
const createCar = {
  name: "Car",
  price: 10000,
  size: "S",
  image: "https://source.unsplash.com/500x500",
};

describe("DELETE /v1/cars/:id", () => {
  let car, TokenAdmin, TokenCustomer;

  beforeEach(async () => {
    TokenAdmin = await request(app).post("/v1/auth/login").send({
      email: emailAdmin,
      password,
    });

    TokenCustomer = await request(app).post("/v1/auth/login").send({
      email: emailCustomer,
      password,
    });

    car = await request(app)
      .post("/v1/cars")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TokenAdmin.body.accessToken}`)
      .send(createCar);

    return car, TokenAdmin, TokenCustomer;
  });

  it("should response with 204 as status code", async () => {
    const response = await request(app)
      .delete("/v1/cars/" + car.body.id)
      .set("Authorization", `Bearer ${TokenAdmin.body.accessToken}`);

    expect(response.status).toBe(204);
  });

  it("should response with 401 as status code", async () => {
    const response = await request(app)
      .delete("/v1/cars/" + car.body.id)
      .set("Authorization", `Bearer ${TokenCustomer.body.accessToken}`);

    expect(response.status).toBe(401);
    if (response.body.details === null) {
      expect(response.body).toEqual({
        error: expect.objectContaining({
          name: expect.any(String),
          message: expect.any(String),
          details: null,
        }),
      });
      return;
    }
    expect(response.body).toEqual({
      error: expect.objectContaining({
        name: expect.any(String),
        message: expect.any(String),
        details: expect.objectContaining({
          role: expect.any(String),
          reason: expect.any(String),
        }),
      }),
    });
  });
  afterEach(async () => {
    await request(app)
      .delete("/v1/cars/" + car.body.id)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${TokenAdmin.body.accessToken}`);
  });
});
