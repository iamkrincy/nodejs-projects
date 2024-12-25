const express = require('express');

const routes = express.Router();

const { addUser , viewUser , deleteUser , updateUser} = require('../controllers/UserController');
const { verifyToken, Admin } = require('../middleware/Auth');

routes.get('/adduser' , addUser);
routes.get('/viewuser' ,verifyToken ,Admin, viewUser);
routes.delete('/deleteuser' ,verifyToken , Admin, deleteUser);
routes.put('/updateuser' ,verifyToken , Admin, updateUser);

module.exports = routes;