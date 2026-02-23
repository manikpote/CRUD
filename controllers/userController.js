const conn = require("../db/db");

exports.getAllUsers = (req, res) => {
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
};

exports.getUserById = (req, res) => {
  const param = req.params.id;

  const getUser = "select * from users where id = $1";

  conn.query(getUser, [param], (err, result) => {
    //return 404 if no user is found with the given id
    if (result.rows.length == 0) {
      return res.status(404).json({
        success: "false",
        message: `User with id ${param} not found`,
      });
    }
    // Return 500 Internal Server Error if the query fails
    if (err) {
      return res.status(500).json({ success: "false", error: err.message });
    }

    res.status(200).json({
      success: "true",
      data: result.rows,
    });
  });
};

exports.postUser = (req, res) => {
  const { name, email, age } = req.body;

  const post_query = "insert into users (name, email, age) values ($1,$2,$3)";

  conn.query(post_query, [name, email, age], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: "false",
        message: err,
      });
    }
    res.status(201).json({
      success: "true",
      message: "New user successfully inserted",
    });
  });
};

exports.updateUser = (req, res) => {
  const { name, age, email } = req.body;
  const id = req.params.id;

  const update_query = "Update users set name=$1, age=$2, email=$3 where id=$4";

  conn.query(update_query, [name, age, email, id], (err, result) => {
    console.log(result);
    if(result.rows.length == 0){
      return res.status(404).json({
        success: "false",
        message: `User with id ${id} not found`,
      });
    }
    if (err) {
      return res.status(500).json({
        success: "false",
        message: err,
      });
    }
    res.status(204).json({
      success: "true",
      message: "User updated successfully",
    });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const del_query = "delete from users where id = $1";

  conn.query(del_query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: "false",
        message: "Something went wrong",
      });
    }
    res.status(200).json({
      success: "true",
      message: "Deleted User succesfully",
    });
  });
};
