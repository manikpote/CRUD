const { Pool } = require("pg");
const express = require("express");

//initialize db
const conn = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "manik123",
  database: "crud",
});

//connects to postgres db
conn.connect();

const app = express();
app.use(express.json());

app.post("/postUsers", (req, res) => {
  const { name, age, email } = req.body;
  const post_query = "Insert into users (name, age, email) values ($1,$2,$3)";
  conn.query(post_query, [name, age, email], (err, result) => {
    if (err) {
      return res.status(500).json({ success: "false", error: err.message });
    }
    res.status(201).json({
      success: "true",
      message: "Data successfully added!!!",
    });
  });
});

app.put("/updateUsers", (req, res) => {
  const { name, age, email } = req.body;
  const update_query = "Update users set name=$1, age=$2, email=$3 where id=$4";
  conn.query(update_query, [name, age, email], (err, result) => {
    if (err) {
      return res.status(500).json({ success: "false", error: err.message });
    }
    res.status(201).json({
      success: "true",
      message: "Data successfully updated!!!",
    });
  });
});

app.get("/getUsers", (req, res) => {
  const get_query = "select * from users";
  conn.query(get_query, (err, result) => {
    if (err) {
      return res.status(500).json({ success: "false", error: err.message });
    }
    res.status(200).json({
      success: "true",
      data: result.rows,
    });
  });
});

app.get("/getUsers/:id", (req, res) => {
  const param = req.params.id;
  const get_query = "select * from users where id=$1";

  conn.query(get_query, [param], (err, result) => {
    if (err) {
      return res.status(500).json({ success: "false", error: err.message });
    }

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: "false", message: "User not found" });
    }
    res.status(200).json({
      success: "true",
      data: result.rows,
    });
  });
});

app.delete("/delUser/:id", (req, res) => {
  const param = req.params.id;
  const del_query = "delete from users where id = $1";
  conn.query(del_query, [param], (err, result) => {
    if (err) {
      return res.status(500).json({ success: "false", error: err.message });
    }
    res.status(200).json({
      success: "true",
      message: "Data successfully deleted!!!",
    });
  });
});

app.listen(3000, () => console.log("server running..."));
