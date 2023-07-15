const db = require('../db/connect');
const { body } = require('express-validator');


const templates = [
    {
      templateId: 'chrono1',
      templateName: 'Chronological Resume',
      templateStructure: {
        fullName: '',
        email: '',
        objective: '',
        jobTitle: '',
        companyName: '',
        educationDegree: '',
        skills: ''
      }
    },
    {
      templateId: 'func1',
      templateName: 'Functional Resume',
      templateStructure: {
        fullName: '',
        email: '',
        objective: '',
        skill1: '',
        skill2: '',
        educationDegree: '',
        experienceHighlight: ''
      }
    }
  ];
  
  const getResumes = (req, res) => {
    const userId = req.user.id; // Assuming the user_id is stored in req.user.id
    const resumesCollection = db.getDb().collection('resumes');
  
    resumesCollection.find({ userId: userId }).toArray((err, resumes) => {
      if (err) {
        console.error('Error retrieving resumes:', err);
        res.status(500).send('An error occurred while retrieving resumes');
      } else {
        res.json(resumes);
      }
    });
  };
  
  const createResume = (req, res) => {
    // Get the resume details from the request body
    const { templateId, templateStructure, resumeInfo } = req.body;
    // Get the user ID from the authenticated user (req.user.id)
  
    // Find the selected template based on the templateId
    const selectedTemplate = templates.find(template => template.templateId === templateId);
  
    if (!selectedTemplate) {
      return res.status(400).json({ error: 'Invalid templateId' });
    }
  
    // Create a new resume document
    const newResume = {
      userId: req.user.id,
      templateId,
      templateName: selectedTemplate.templateName,
      templateStructure,
      resumeInfo, // Add the resumeInfo field
      // Add any additional fields required for the resume
    };
  
    // Insert the new resume into the resumes collection
    db.getDb()
      .collection('resumes')
      .insertOne(newResume)
      .then(result => {
        // Return the created resume as the response
        res.status(201).json(result.ops[0]);
      })
      .catch(error => {
        console.error('Error creating resume:', error);
        res.status(500).json({ error: 'Failed to create resume' });
      });
  };
  
  const getResume = (req, res) => {
    const resumeId = req.params.id; 
  
    // Retrieve the resume from the database using the resumeId
    db.getDb()
      .collection('resumes')
      .findOne({ _id: resumeId, userId: req.user.id }) // Assuming userId is stored in the resume document
      .then((resume) => {
        if (resume) {
          res.json(resume);
        } else {
          res.status(404).json({ message: 'Resume not found' });
        }
      })
      .catch((error) => {
        console.error('Error retrieving resume:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the resume' });
      });
  };
  
  
  const updateResume = (req, res) => {
    const resumeId = req.params.id; // Get the resume ID from the request parameters
    const updatedData = req.body; // Get the updated resume data from the request body
  
    // Update the resume in the database
    db.collection('resumes').updateOne(
      { _id: resumeId, userId: req.user.id }, // Update only if the resume ID and user ID match
      { $set: updatedData }, // Set the updated data
      (err, result) => {
        if (err) {
          console.error('Error updating resume:', err);
          res.status(500).json({ error: 'An error occurred while updating the resume' });
        } else if (result.modifiedCount === 0) {
          res.status(404).json({ error: 'Resume not found' });
        } else {
          res.status(200).json({ message: 'Resume updated successfully' });
        }
      }
    );
  };
  
  const deleteResume = (req, res) => {
    const resumeId = req.params.id; // Get the resume ID from the request parameters
  
    // Delete the resume from the database
    db.collection('resumes').deleteOne(
      { _id: resumeId, userId: req.user.id }, // Delete only if the resume ID and user ID match
      (err, result) => {
        if (err) {
          console.error('Error deleting resume:', err);
          res.status(500).json({ error: 'An error occurred while deleting the resume' });
        } else if (result.deletedCount === 0) {
          res.status(404).json({ error: 'Resume not found' });
        } else {
          res.status(200).json({ message: 'Resume deleted successfully' });
        }
      }
    );
  };
  
  // Export the controller methods
  module.exports = {
    getResumes,
    createResume,
    getResume,
    updateResume,
    deleteResume
  };
  