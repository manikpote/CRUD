const express = require("express");
const app = express.Router();
const userController = require("../controllers/userController");

app.get("/get", userController?.getAllUsers);
app.get("/get/:id", userController.getUserById);
app.post("/post", userController.postUser);
app.put("/update/:id", userController.updateUser);
app.delete("/delete/:id", userController.deleteUser);

module.exports = app;
