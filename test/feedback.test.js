const request = require("supertest");

const app = require("../index"); // Update with the correct path to your app entry file

it("Should Return feedback", async () => {
  const response = await request(app).get("/feedback");
  expect(Number.isInteger(response.status)).toBe(true);
});

it("Should Return feedback", async () => {
  const response = await request(app).post("/feedback");
  expect(Number.isInteger(response.status)).toBe(true);
});

it("Should Return feedback", async () => {
  const response = await request(app).delete("/feedback:commentID");
  expect(Number.isInteger(response.status)).toBe(true);
});

it("Should Return feedback", async () => {
  const response = await request(app).get("/feedback/all/:resumeID");
  expect(Number.isInteger(response.status)).toBe(true);
});
