const db = require('../db/connect');

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
  
  const createResume = async (req, res) => {
    try {
      // Get the resume details from the request body
      const { templateId, templateStructure, resumeInfo } = req.body;
  
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
      const response = await db.getDb().collection('resumes').insertOne(newResume);
    
      // Return the created resume as the response
      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating resume:', error);
      res.status(500).json({ error: 'Failed to create resume' });
    }
  };
  
  
  const { ObjectId } = require('mongodb');
  const getResume = async (req, res) => {
    try {
      // Get the ID from the request parameters
      const { id } = req.params;
  
      // Convert string id to MongoDB's ObjectId
      const objectId = new ObjectId(id);
  
      // Query the database for a resume with the given ID
      const resume = await db.getDb().collection('resumes').findOne({ _id: objectId });
  
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
  
      // Return the found resume as the response
      res.json(resume);
    } catch (error) {
      console.error('Error retrieving resume:', error);
      res.status(500).json({ error: 'Failed to retrieve resume' });
    }
  };
  
  
  
  const updateResume = async (req, res) => {
    try {
      // Get the ID from the request parameters
      const { id } = req.params;
  
      // Convert string id to MongoDB's ObjectId
      const objectId = new ObjectId(id);
  
      // Get the updated resume data from the request body
      const { templateId, templateStructure, resumeInfo } = req.body;
  
      // Find the selected template based on the templateId
      const selectedTemplate = templates.find(template => template.templateId === templateId);
    
      if (!selectedTemplate) {
        return res.status(400).json({ error: 'Invalid templateId' });
      }
  
      // Prepare the updated resume document
      const updatedResume = {
        templateId,
        templateName: selectedTemplate.templateName,
        templateStructure,
        resumeInfo,
      };
  
      // Update the resume in the database
      const result = await db.getDb().collection('resumes').updateOne({ _id: objectId }, { $set: updatedResume });
  
      // If no document was updated, then the resume does not exist
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Resume not found' });
      }
  
      // Return success status
      res.json({ message: 'Resume updated' });
    } catch (error) {
      console.error('Error updating resume:', error);
      res.status(500).json({ error: 'Failed to update resume' });
    }
  };
  
  
  const deleteResume = async (req, res) => {
    try {
      // Get the ID from the request parameters
      const { id } = req.params;
  
      // Convert string id to MongoDB's ObjectId
      const objectId = new ObjectId(id);
  
      // Delete the resume from the database
      const result = await db.getDb().collection('resumes').deleteOne({ _id: objectId });
  
      // If no document was deleted, then the resume does not exist
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Resume not found' });
      }
  
      // Return success status
      res.json({ message: 'Resume deleted' });
    } catch (error) {
      console.error('Error deleting resume:', error);
      res.status(500).json({ error: 'Failed to delete resume' });
    }
  };
  
  
  // Export the controller methods
  module.exports = {
    createResume,
    getResume,
    updateResume,
    deleteResume
  };
  