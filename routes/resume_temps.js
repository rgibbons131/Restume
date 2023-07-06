// routes/resume_temps.js
const express = require('express');
const router = express.Router();

const resumeTempsController = require('../controllers/resume_temps');

router.get('/resume-templates', resumeTempsController.getResumeTemplates);

module.exports = router;
