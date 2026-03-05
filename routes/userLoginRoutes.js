const express = require("express")
const app = express.Router();

const userLogin = require('../controllers/userLoginController')

app.post('/', userLogin.login)

module.exports = app;