const express = require('express');

const routes = express.Router();

const { Admin, verifyToken } = require('../middleware/Auth');
const allBlogshow = require('../controllers/AdminController');

routes.get('/allblogshow',verifyToken,Admin,allBlogshow)

module.exports = routes;