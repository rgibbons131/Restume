// I have a question about the reworks I did to this file, specifically with using the .use(/api_docs) and the routes before/after the db connection
// Also, try to run this once your IP is correct again.

const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connect");
// const elements = require("./routes/elements.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { auth } = require("express-openid-connect");
const resumeTempsRouter = require("./routes/resume_temps");
const feedbackRouter = require("./routes/feedback");

const passport = require("passport");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(session({ secret: "test" }));
app.use(passport.initialize());
app.use(passport.session());

app
  .use(bodyParser.json())
  .use(cors())
  .use("/", require("./routes"))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    const server = app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

module.exports = app;
