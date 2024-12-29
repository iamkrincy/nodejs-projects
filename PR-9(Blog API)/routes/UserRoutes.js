const express = require('express');

const routes = express.Router();

const { verifyToken, Admin } = require('../middleware/Auth');
const { registerUser, loginUser } = require('../controllers/UserController');

routes.get('/registeruser' , registerUser);
routes.get('/loginuser',loginUser)


module.exports = routes;