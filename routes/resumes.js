const express = require('express');
const router = express.Router();
const resumesController = require('../controllers/resumes');
const { body, param, validationResult } = require('express-validator');



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
router.put(
    '/resumes/:id',
    [
      // Validate id
      param('id').isMongoId().withMessage('ID is invalid'),
      // Add data validation middleware
      body('templateId').notEmpty().withMessage('Template ID is required'),
      body('templateStructure').notEmpty().withMessage('Template structure is required'),
      body('resumeInfo').notEmpty().withMessage('Resume info is required'),
    ],
    resumesController.updateResume
  );
  
// Route for deleting a specific resume
router.delete('/resumes/:id', resumesController.deleteResume);

module.exports = router;
