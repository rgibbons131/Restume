const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const { isLoggedIn } = require("../authorization/auth");

// Get all users
router.get("/", userController.getUsers);

// Get a single user
router.get("/:id", userController.getSingleUser);

module.exports = router;