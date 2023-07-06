// routes/feedback.js
const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedback");
const { isLoggedIn } = require("../authorization/auth");

router.get("/", isLoggedIn, feedbackController.getFeedback);
router.post("/", feedbackController.addFeedback);
router.delete("/:commentID", isLoggedIn, feedbackController.deleteFeedbackId);
router.delete(
  "/all/:resumeID",
  isLoggedIn,
  feedbackController.deleteFeedbackAll
);

module.exports = router;
