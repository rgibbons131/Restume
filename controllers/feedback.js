// controllers/feedback.js
const db = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

exports.addFeedback = async (req, res) => {
  try {
    if (req.body.comment != null && req.body.resumeID != null) {
      const feedback = {
        comment: req.body.comment,
        resumeID: req.body.resumeID,
      };
      if (req.body.name != null) {
        feedback.name = req.body.name;
      }
      const database = db.getDb(); // get the db connection when a request is made
      const resume = await database
        .collection("resumes")
        .findOne({ _id: new ObjectId(req.body.resumeID) });
      feedback.userID = resume._id;
      const feedbackDB = await database.collection("feedback");
      feedbackDB.insertOne(feedback);
      res.status(200).send();
    } else {
      res.status(400).json({ error: "Invalid request" });
    }
  } catch (err) {
    console.error(err); // This will log the actual error to your console.
    res
      .status(500)
      .json({ error: "An error occurred while creating feedback" });
  }
};

exports.getFeedback = async (req, res) => {
  if (req.params.resumeID != null) {
    try {
      const database = db.getDb();
      const feedback = await database
        .collection("feedback")
        .find({ _id: req.params.resumeID })
        .toArray();
      res.status(200).json(feedback);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the feedback" });
    }
  } else {
    res.status(500).json({ error: "You must send a valid resume ID" });
  }
};

exports.deleteFeedbackId = async (req, res) => {
  if (req.params.commentID != null) {
    try {
      const database = db.getDb();
      const feedback = await database
        .collection("feedback")
        .deleteOne({ _id: new ObjectId(req.params.commentID) });
      res.status(200).send();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while accessing the feedback" });
    }
  } else {
    res.status(500).json({ error: "You must send a valid feedback ID" });
  }
};

exports.deleteFeedbackAll = async (req, res) => {
  if (req.params.resumeID != null) {
    try {
      const database = db.getDb();
      const feedback = await database
        .collection("feedback")
        .deleteMany({ resumeID: req.params.resumeID });
      res.status(200).send();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while accessing the feedback" });
    }
  } else {
    res.status(500).json({ error: "You must send a valid user ID" });
  }
};
