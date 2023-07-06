const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../authorization/auth');

// Route for auth routes
router.use('/', require('./auth'));

// Route for Swagger routes
router.use('/', isLoggedIn, require('./swagger'));

// Route for resume routes
router.use('/', isLoggedIn, require('./resume_temps'))

module.exports = router;