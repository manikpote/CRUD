const conn = require("../db/db");

exports.testUserGet = (req, res) => {
  const query = "Select * from users";
  conn.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "falure",
        message: err,
      });
    }
    return res.status(200).json({
      status: "1",
      message: result,
    });
  });
};
