const express = require('express');
const passport = require('passport');
const multer = require('multer');


const st = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        const uniq = Math.floor(Math.random() * 100000);
        cb(null,`${file.fieldname}-${uniq}`)
    }
})

const fileUpload = multer({storage:st}).single("image");



const routes = express.Router();

const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logoutUser, addProduct, viewProduct, Delete, edit, updateProduct } = require('../controllers/authController');


routes.get('/' , loginPage);
routes.get('/register',registerPage);
routes.get('/dashboard', passport.chekuser,dashboardPage);
routes.post('/registeruser' , registerUser);
routes.post('/loginuser' ,passport.authenticate('local',{failureRedirect:'/'})  , loginUser);
routes.get('/logoutUser' , logoutUser);
routes.post('/addproduct',fileUpload,addProduct);
routes.get('/view',viewProduct);
routes.get('/delete' , Delete);
routes.get('/edit' , edit);
routes.post('/updateproduct',fileUpload,updateProduct)

module.exports = routes;