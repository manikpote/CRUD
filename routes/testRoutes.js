const express = require('express');
const app = express.Router();
const testRoute = require('../controllers/testController')

app.get('/', testRoute.testUserGet)

module.exports= app;