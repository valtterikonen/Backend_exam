
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Fruit = require("../models/fruitModel");
const fruits = [
  {
    "name": "Sample title",
    "color": "2024-03-07T16:02:31.405Z",
    "weight": 12,
    "calories": 59,
    "extras": "Sample extras"
  },
  {
    "name": "Apple",
    "color": "red",
    "weight": 13,
    "calories": 78,
    "extras": "nice and juicy!"
  }
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/users/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("Given there are initially some fruits saved", () => {
  beforeEach(async () => {
    await Fruit.deleteMany({});
    await api
      .post("/api/fruit")
      .set("Authorization", "bearer " + token)
      .send(fruits[0])
      .send(fruits[1]);
  });

  it("should return all fruits as JSON when GET /api/fruits is called", async () => {
    await api
      .get("/api/fruit")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one fruit when POST /api/fruits is called", async () => {
    const newFruit = {
      name: "Sample title",
      color: "2024-03-07T16:02:31.405Z",
      weight: 12,
      calories: 59,
      extras: "Sample extras"
    };
    await api
      .post("/api/fruit")
      .set("Authorization", "bearer " + token)
      .send(newFruit)
      .expect(201);
  });
  
  it("should return one fruit by ID when GET /api/fruits/:id is called", async () =>  {
    const fruit = await Fruit.findOne();
    await api
      .get("/api/fruit/" + fruit._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one fruit by ID when PUT /api/fruits/:id is called", async () => {
    const fruit = await Fruit.findOne();
    const updatedFruit = {
      name: "Sample title",
      color: "2024-03-07T16:02:31.405Z",
      weight: 12,
      calories: 59,
      extras: "Sample extras"
    };
    await api
      .put("/api/fruit/" + fruit._id)
      .set("Authorization", "bearer " + token)
      .send(updatedFruit)
      .expect(200);
    const updatedFruitCheck = await Fruit.findById(fruit._id);
    expect(updatedFruitCheck.toJSON()).toEqual(expect.objectContaining(updatedFruit));
  });

  it("should delete one fruit by ID when DELETE /api/fruits/:id is called", async () => {
    const fruit = await Fruit.findOne();
    await api
      .delete("/api/fruit/" + fruit._id)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const fruitCheck = await Fruit.findById(fruit._id);
    expect(fruitCheck).toBeNull();
  });
 
});

afterAll(() => {
  mongoose.connection.close();
});