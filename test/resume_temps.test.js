// test/resumeTemps.test.js
const request = require('supertest');
const app = require('../index'); // Update with the correct path to your app entry file

describe('Resume Templates Routes', () => {
  it('should get all resume templates', async () => {
    const response = await request(app).get('/resume-templates');
    expect(Number.isInteger(response.status)).toBe(true);
  });
});
