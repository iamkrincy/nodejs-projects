const express = require('express');

const routes = express.Router();

const addComment = require('../controllers/CommentsController');

const { Admin, verifyToken } = require('../middleware/Auth');

routes.get('/addcomment',verifyToken,Admin,addComment)

module.exports = routes