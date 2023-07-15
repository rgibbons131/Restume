const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const { isLoggedIn } = require("../authorization/auth");

// Add user

// Get all users
router.get("/", userController.getUsers);

// Get a single user
router.get("/:id", userController.getSingleUser);

// Delete a User
router.delete('/:id', userController.deleteUser)

module.exports = router;