// I have a question about the reworks I did to this file, specifically with using the .use(/api_docs) and the routes before/after the db connection
// Also, try to run this once your IP is correct again.

const express = require("express");
const session = require('express-session');
const dotenv = require("dotenv");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connect");
// const elements = require("./routes/elements.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { auth } = require("express-openid-connect");
const resumeTempsRouter = require('./routes/resume_temps');

const passport = require('passport');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: "https://elements-richard.onrender.com",
  clientID: "DciNcQ4tiRf3MyaFzGCd94yuWOIv4BOu",
  issuerBaseURL: "https://dev-c05tuxzqaokwihrb.us.auth0.com",
};

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(session({ secret: 'test' }));
app.use(passport.initialize());
app.use(passport.session());


app
  .use(bodyParser.json())
  .use(cors())
  .use(auth(config))
  .use('/', require('./routes'))
  // .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  // .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);

    // Use routes after DB connection is established
    // app.use('/resume-templates', resumeTempsRouter);
  }
});
