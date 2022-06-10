const request = require("supertest");
const app = require("../../../app");
const emailAdmin = "admin@gmail.com";
const emailCustomer = "customer@gmail.com";
const password = "123";
const createCar = {
  name: "Car",
  price: 100000,
  size: "S",
  image: "https://source.unsplash.com/500x500",
};

describe("POST /v1/create", () => {
  let tokenAdmin, tokenCustomer, responseAdmin, responseCustomer;
  beforeEach(async () => {
    tokenAdmin = await request(app).post("/v1/auth/login").send({
      email: emailAdmin,
      password,
    });
    tokenCustomer = await request(app).post("/v1/auth/login").send({
      email: emailCustomer,
      password,
    });
    responseAdmin = await request(app)
      .post("/v1/cars")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${tokenAdmin.body.accessToken}`)
      .send(createCar);
    responseCustomer = await request(app)
      .post("/v1/cars")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${tokenCustomer.body.accessToken}`)
      .send(createCar);
  });

  it("should response with 201 as status code", async () => {
    expect(responseAdmin.status).toBe(201);
    expect(responseAdmin.body).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
      size: expect.any(String),
      image: expect.any(String),
      isCurrentlyRented: expect.any(Boolean),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it("should response with 401 as status code", async () => {
    expect(responseCustomer.status).toBe(401);
    if (responseCustomer.body.details === null) {
      expect(responseCustomer.body).toEqual({
        error: expect.objectContaining({
          name: expect.any(String),
          message: expect.any(String),
          details: null,
        }),
      });
      return;
    }
    expect(responseCustomer.body).toEqual({
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
      .delete("/v1/cars/" + responseAdmin.body.id)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${tokenAdmin.body.accessToken}`);
    await request(app)
      .delete("/v1/cars/" + responseCustomer.body.id)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${tokenAdmin.body.accessToken}`);
  });
});
