// controllers/resume_temps.js
const db = require('../db/connect');

exports.getResumeTemplates = async (req, res) => {
  try {
    const database = db.getDb(); // get the db connection when a request is made
    const resumeTemplates = await database.collection('resume_temps').find({}).toArray();
    res.status(200).json(resumeTemplates);
  }catch (err) {
    console.error(err); // This will log the actual error to your console.
    res.status(500).json({ error: 'An error occurred while fetching the resume templates' });
  }
};
