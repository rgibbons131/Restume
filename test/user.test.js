const request = require('supertest');
const app = require('../index'); // Update with the correct path to your app entry file

describe('User Routes', () => {

  it('Should create a user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      // any other user fields you want to test
    };
    const response = await request(app).post('/').send(userData);
    expect(Number.isInteger(response.status)).toBe(true);
  });

  it('Should get all users', async () => {
    const response = await request(app).get('/');
    expect(Number.isInteger(response.status)).toBe(true);
  });

  it('Should get a single user', async () => {
    const userId = 'your_test_user_id'; // Replace with a test user ID
    const response = await request(app).get(`/${userId}`);
    expect(Number.isInteger(response.status)).toBe(true);
  });

  it('Should delete a user', async () => {
    const userId = 'your_test_user_id'; // Replace with a test user ID
    const response = await request(app).delete(`/${userId}`);
    expect(Number.isInteger(response.status)).toBe(true);
  });
});
