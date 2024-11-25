const express = require('express');

const passport = require('passport');

const routes = express.Router();

const { loginPage, registerPage, dashboardPage, registeruser, loginuser } = require('../controller/authController');


routes.get('/' , loginPage);
routes.get('/register',registerPage);
routes.get('/dashboard',passport.checkUser,dashboardPage);
routes.post('/registeruser',registeruser);
routes.post('/loginuser',passport.authenticate('local',{failureRedirect:'/'}),loginuser);

module.exports = express;