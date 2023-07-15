const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },

  // host: "restume.onrender.com",
  host: "localhost:8080",
<<<<<<< HEAD
  schemes: ["http"],
=======
  schemes: ["http"], 
>>>>>>> 0963f9b299d41a5d6e2e26d8aefbc4fa896e9385
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
