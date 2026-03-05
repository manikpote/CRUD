const conn = require("../db/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  console.log("Request body:", req.body);
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res?.status(402).json({
      status: "failure",
      message: "User Name or password not provided",
    });
  }

  const userCredentials =
    "Select u.name, u.password from users u where lower(u.name) ilike lower($1)";
  conn.query(userCredentials, [userName], async (err, result) => {
    console.log(err);
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

    try {
      console.log("usercredentialspassword", userCredentials);
      if (await bcrypt.compare(password, result?.rows[0]?.password)) {
        return res?.status(200).json({
          status: "success",
          message: "Login success",
        });
      }
    } catch (e) {
      console.log("Error comparing passwords:", e);
      return res?.status(500).send("Internal server error");
    }
  });
};
