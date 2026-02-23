// Import the Pool class from the 'pg' (node-postgres) library for managing DB connections
const { Pool } = require("pg");
// Import Express framework to create the REST API server
const express = require("express");

// Initialize a connection pool with PostgreSQL database credentials
const conn = new Pool({
  host: "localhost", // Database server host
  user: "postgres", // Database username
  port: 5432, // Default PostgreSQL port
  password: "manik123", // Database password
  database: "crud", // Target database name
});

// Establish the connection to the PostgreSQL database
conn.connect();

// Create an Express application instance
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

/**
 * POST /postUsers
 * Creates a new user record in the database.
 * Request body: { name, age, email }
 */
app.post("/postUsers", (req, res) => {
  // Destructure user fields from the request body
  const { name, age, email } = req.body;

  // Parameterized query to safely insert user data (prevents SQL injection)
  const post_query = "Insert into users (name, age, email) values ($1,$2,$3)";

  conn.query(post_query, [name, age, email], (err, result) => {
    if (err) {
      // Return 500 Internal Server Error if the query fails
      return res.status(500).json({ success: "false", error: err.message });
    }
    // Return 201 Created on successful insertion
    res.status(201).json({
      success: "true",
      message: "Data successfully added!!!",
    });
  });
});

/**
 * PUT /updateUsers
 * Updates an existing user's details in the database.
 * Request body: { name, age, email, id }
 */
app.put("/updateUsers", (req, res) => {
  // Destructure updated fields from the request body
  const { name, age, email } = req.body;

  // Parameterized query to update user fields matched by ID
  const update_query = "Update users set name=$1, age=$2, email=$3 where id=$4";

  conn.query(update_query, [name, age, email], (err, result) => {
    if (err) {
      // Return 500 Internal Server Error if the update fails
      return res.status(500).json({ success: "false", error: err.message });
    }
    // Return 201 on successful update
    res.status(201).json({
      success: "true",
      message: "Data successfully updated!!!",
    });
  });
});

/**
 * GET /getUsers
 * Retrieves all user records from the database.
 */
app.get("/getUsers", (req, res) => {
  // Query to fetch all rows from the users table
  const get_query = "select * from users";

  conn.query(get_query, (err, result) => {
    if (err) {
      // Return 500 Internal Server Error if the query fails
      return res.status(500).json({ success: "false", error: err.message });
    }
    // Return 200 OK with all user records
    res.status(200).json({
      success: "true",
      data: result.rows,
    });
  });
});

/**
 * GET /getUsers/:id
 * Retrieves a single user record by their ID.
 * URL param: id - the unique identifier of the user
 */
app.get("/getUsers/:id", (req, res) => {
  // Extract the user ID from the URL parameters
  const param = req.params.id;

  // Parameterized query to fetch a specific user by ID
  const get_query = "select * from users where id=$1";

  conn.query(get_query, [param], (err, result) => {
    if (err) {
      // Return 500 Internal Server Error if the query fails
      return res.status(500).json({ success: "false", error: err.message });
    }

    // Return 404 Not Found if no user matches the given ID
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: "false", message: "User not found" });
    }

    // Return 200 OK with the matched user record
    res.status(200).json({
      success: "true",
      data: result.rows,
    });
  });
});

/**
 * DELETE /delUser/:id
 * Deletes a user record from the database by their ID.
 * URL param: id - the unique identifier of the user to delete
 */
app.delete("/delUser/:id", (req, res) => {
  // Extract the user ID from the URL parameters
  const param = req.params.id;

  // Parameterized query to delete the user with the given ID
  const del_query = "delete from users where id = $1";

  conn.query(del_query, [param], (err, result) => {
    if (err) {
      // Return 500 Internal Server Error if the deletion fails
      return res.status(500).json({ success: "false", error: err.message });
    }
    // Return 200 OK on successful deletion
    res.status(200).json({
      success: "true",
      message: "Data successfully deleted!!!",
    });
  });
});

// Start the Express server on port 3000
app.listen(3000, () => console.log("server running..."));
