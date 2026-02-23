// Import the Express framework to create and manage the HTTP server
const express = require("express");

// Create an Express application instance
const app = express();

// Load environment variables from the .env file into process.env
require("dotenv").config();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Import the user routes module containing all /testUsers endpoint handlers
const userRoutes = require("./routes/userRoutes");

// Mount user routes — all requests to /testUsers will be handled by userRoutes
app.use("/testUsers", userRoutes);

// Read the port number from environment variables (defined in .env)
const port = process.env.PORT;

// Start the server and listen on the specified port
app.listen(port, () => console.log("sever running"));
