// Import statements
const express = require("express");
const connectDb = require("./config/dbConnection"); // For database connection
const errorHandler = require("./middleware/errorHandler"); // Middleware for error handling
const dotenv = require("dotenv").config(); // So we can read from our .env file using process.env

connectDb(); // Connect to the database (method from ./config/dbConnection)

const app = express(); // Make app an instance of express

// Get our port
const port = process.env.PORT || 5000;

// Specify hour middleware
app.use(express.json()); // For parsing JSON from data stream from client
app.use('/api/users', require('./routes/userRoutes')); // For private user routes (authentication required)
app.use('/api/recipes', require('./routes/recipeRoutes.js')); // For recipe queries
app.use(errorHandler); // For parsing thrown Error objects into JSON

// For making our app listen on the port we specified
app.listen(port, () => {
    console.log(`ResourceFull server is running on port ${port}.`);
});

