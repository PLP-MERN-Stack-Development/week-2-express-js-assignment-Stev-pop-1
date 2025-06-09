// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const productRoute = require('./productRoute')
const mongoose = require('mongoose')
const logger = require('./middleware/logger'); // from middleware folder/model
const errorHandler = require('./middleware/errorHandler'); // from middleware folder/model
require('dotenv').config();


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

const URI = "mongodb://localhost:27017/productsDB"

// Middleware setup
app.use(bodyParser.json());
app.use(logger);
app.use('/products', productRoute)

// Global error handler
app.use(errorHandler);



mongoose.connect(URI, {
  UseNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> console.log("Connection to Mongo Established"))
  .catch((err)=>console.log("No connection to MongoDB", err))



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 