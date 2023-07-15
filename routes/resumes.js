const express = require('express');
const router = express.Router();
const resumesController = require('../controllers/resumes');


// Route for creating a new resume
router.post('/resumes', resumesController.createResume);

// Route for getting a specific resume
router.get('/resumes/:id', resumesController.getResume);

// Route for updating a specific resume
router.put('/resumes/:id', resumesController.updateResume);

// Route for deleting a specific resume
router.delete('/resumes/:id', resumesController.deleteResume);

module.exports = router;
