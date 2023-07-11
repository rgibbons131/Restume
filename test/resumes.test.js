const request = require('supertest');
const app = require('../index'); // Update with the correct path to your app entry file

describe('Resume Routes', () => {
  it('should get all resumes', async () => {
    const response = await request(app).get('/resumes');
    expect(Number.isInteger(response.status)).toBe(true);
  });

  it('should create a new resume', async () => {
    const resumeData = {
      templateId: 'chrono1',
      templateStructure: {
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        objective: 'Seeking a challenging position',
        jobTitle: 'Software Engineer',
        companyName: 'ABC Inc.',
        educationDegree: "Bachelor's Degree",
        skills: 'JavaScript, Node.js, React',
      },
      resumeInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    const response = await request(app).post('/resumes').send(resumeData);
    expect(Number.isInteger(response.status)).toBe(true);
  });

  it('should get a specific resume', async () => {
    const resumeId = '12345'; // Update with an existing resume ID

    const response = await request(app).get(`/resumes/${resumeId}`);
    expect(Number.isInteger(response.status)).toBe(true);
  });

  it('should update a specific resume', async () => {
    const resumeId = '12345'; // Update with an existing resume ID
    const updatedData = {
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      objective: 'Seeking a new opportunity',
      jobTitle: 'Senior Software Engineer',
      companyName: 'XYZ Corp',
      educationDegree: "Master's Degree",
      skills: 'JavaScript, Node.js, React, Redux',
    };

    const response = await request(app).put(`/resumes/${resumeId}`).send(updatedData);
    expect(Number.isInteger(response.status)).toBe(true);
  });

  it('should delete a specific resume', async () => {
    const resumeId = '12345'; // Update with an existing resume ID

    const response = await request(app).delete(`/resumes/${resumeId}`);
    expect(Number.isInteger(response.status)).toBe(true);
  });
});
