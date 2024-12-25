const express = require('express');

const routes = express.Router();

const allPost = require('../controllers/AdminController');
const { Admin, verifyToken } = require('../middleware/Auth');

routes.get('/allpost',verifyToken,Admin,allPost)

module.exports = routes;