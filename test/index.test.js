const request = require("supertest");

const app = require("../index"); // Update with the correct path to your app entry file

it("Should Return feedback", async () => {
  const response = await request(app).get("/");
  expect(Number.isInteger(response.status)).toBe(true);
});
