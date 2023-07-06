// routes/feedback.js
const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedback");

router.get("/", feedbackController.getFeedback);
router.post("/", feedbackController.addFeedback);
router.delete("/:commentID", feedbackController.deleteFeedbackId);
router.delete("/all/:resumeID", feedbackController.deleteFeedbackAll);

module.exports = router;
