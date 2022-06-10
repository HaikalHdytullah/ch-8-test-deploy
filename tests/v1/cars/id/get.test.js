const request = require("supertest");
const app = require("../../../../app");
const email = "admin@gmail.com";
const password = "123";
const createCar = {
  name: "Car",
  price: 100000,
  size: "S",
  image: "https://source.unsplash.com/500x500",
};

describe("GET /v1/cars/:id", () => {
  let car, accessToken;
  beforeEach(async () => {
    accessToken = await request(app).post("/v1/auth/login").send({
      email,
      password,
    });

    car = await request(app)
      .post("/v1/cars")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${accessToken.body.accessToken}`)
      .send(createCar);

    return car;
  });

  it("should response with 200 as status code", async () => {
    const response = await request(app).get("/v1/cars/" + car.body.id);

    expect(response.statusCode).toBe(200);
    if (response.body === null) {
      expect(response.body).toBeNull();
      return;
    }
    expect(response.body).toEqual(response.body);
  });

  afterEach(async () => {
    request(app)
      .delete("/v1/cars/" + car.body.id)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${accessToken.body.accessToken}`);
  });
});
