// routes/feedback.js
const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedback");
const { isLoggedIn } = require("../authorization/auth");

router.get("/feedback", isLoggedIn, feedbackController.getFeedback);
router.post("/feedback", feedbackController.addFeedback);
router.delete(
  "/feedback:commentID",
  isLoggedIn,
  feedbackController.deleteFeedbackId
);
router.delete(
  "/feedback/all/:resumeID",
  isLoggedIn,
  feedbackController.deleteFeedbackAll
);

module.exports = router;
