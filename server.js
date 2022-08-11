// Setup empty JS object to act as endpoint for all routes
let projectData={};

// Express to run server and routes
const express= require('express');

// Start up an instance of app
const app= express();

/* Dependencies */
/* Middleware*/
const bodyParser= require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port= 3000;

// Spin up the server 
// Arrow callback function to debug
app.listen(port, ()=> console.log(`running on localhost: ${port}`));

// Initialize all route with an arrow callback function
app.get('/all',(req,res)=>{
  res.send(projectData);
})

// Post Route
app.post('/add', (req,res)=>{
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
});


