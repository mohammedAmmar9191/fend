// Setup empty JS array to act as endpoint for all routes
projectData = {};

// require body parser
const bodyParser = require('body-parser');
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;

// Run the server
const server = app.listen(port, listen);

// listen function
function listen() {
  console.log("server works!");
}

//get route

app.get("/getAll", sendData);

//define callback fun.
function sendData(req, res) {
  res.send(projectData);
}

//post data
app.post("/add", addData);

//define callback fun.
function addData(req, res) {
  console.log(req.body);
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['content'] = req.body.content;
  res.send(projectData);
}
