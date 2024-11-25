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

const { loginPage, registerPage, dashboardPage, registerUser, loginUser, logout, getRecipe, add, createRecipe, viewRecipes, deleteRecipe, editRecipe, updateRecipe } = require('../controllers/authController');


// Route to get a specific recipe
routes.get('/recipe/:recipeId', getRecipe);
routes.get('/' , loginPage);
routes.get('/register',registerPage);
routes.get('/dashboard', passport.checkuser,dashboardPage);
routes.post('/registeruser' , registerUser);
routes.post('/loginuser' ,passport.authenticate('local',{failureRedirect:'/'})  , loginUser);
routes.get('/logout' , logout);
routes.get('/add', add); // Route to render the add recipe page
routes.post('/addRecipe',fileUpload, createRecipe); // Route to handle recipe creation
routes.get('/viewRecipes', viewRecipes);
routes.get('/delete' , deleteRecipe);
routes.get('/edit' , editRecipe);
routes.post('/update-recipe/:recipeId', fileUpload, updateRecipe);

module.exports = routes;