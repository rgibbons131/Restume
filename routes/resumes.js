const express = require('express');
const router = express.Router();
const resumesController = require('../controllers/resumes');
const { body } = require('express-validator');

// Route for getting all resumes
router.get('/resumes', resumesController.getResumes);

router.post(
    '/resumes',
    [
      // Add data validation middleware
      body('templateId').notEmpty().withMessage('Template ID is required'),
      body('templateStructure').notEmpty().withMessage('Template structure is required'),
      body('resumeInfo').notEmpty().withMessage('Resume info is required'),
    ],
    resumesController.createResume
  );
  

// Route for getting a specific resume
router.get('/resumes/:id', resumesController.getResume);

// Route for updating a specific resume
router.put(
    '/resumes/:id',
    [
      // Add data validation middleware
      param('id').notEmpty().withMessage('Resume ID is required'),
      body('templateId').notEmpty().withMessage('Template ID is required'),
      body('templateStructure').notEmpty().withMessage('Template structure is required'),
      body('resumeInfo').notEmpty().withMessage('Resume info is required'),
    ],
    resumesController.updateResume
  );

// Route for deleting a specific resume
router.delete('/resumes/:id', resumesController.deleteResume);

module.exports = router;
