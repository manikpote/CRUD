const conn = require("../db/db");

exports.login = (req, res) => {

    console.log("Request body:", req.body)
  const userName = req.body[0].userName;
  const password = req.body[0].password;


  if (!userName || !password) {
    return res?.status(402).json({
      status: "failure",
      message: "User Name or password not provided",
    });
  }

  const userCredentials =
    "Select u.name from users u where lower(u.name) ilike lower($1)";

  conn.query(userCredentials, [userName], (err, result) => {
    console.log(err)
    if (err) {
      return res?.status(500).json({
        status: "failure",
        message: err,
      });
    }

    if (result?.rows?.length <= 0) {
      return res?.status(404).json({
        status: "failure",
        message: "No user found",
      });
    }
    if (userName?.toLowerCase() == result?.rows[0]?.name?.toLowerCase()) {
      return res?.status(200).json({
        status: "success",
        message: "Login success",
      });
    } else {
      return res?.status(500).json({
        status: "failure",
        message: "Something went wrong",
      });
    }
  });
};
