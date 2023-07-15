const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../authorization/auth");

// Route for auth routes
router.use("/", require("./auth"));

// Route for Swagger routes
router.use("/", isLoggedIn, require("./swagger"));

// Route for resume routes
router.use("/", isLoggedIn, require("./resume_temps"));

// Route for resumes
router.use('/', isLoggedIn, require('./resumes'));

// Route for feedback routes
router.use("/", require("./feedback"));

// Route for user routes
router.use("/users", require("./users"));

module.exports = router;

