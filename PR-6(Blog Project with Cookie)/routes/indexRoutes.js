const express = require('express');
const app = express();
const multer = require('multer');

const routes = express.Router();

const { loginPage, registerPage, dashboardPage, registerrecord, loginrecord, logout, travel, eat, relax, add, addRecord, view, deleteData, editData, updateRecord } = require('../controller/AuthController');

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

routes.get('/' , loginPage);
routes.get('/register',registerPage);
routes.get('/dashboard' , dashboardPage);
routes.post('/registerrecord',registerrecord);
routes.post('/loginrecord',loginrecord);
routes.get('/logout',logout);
routes.get('/travel',travel);
routes.get('/eat',eat);
routes.get('/relax',relax);
routes.get('/add', add);
routes.post('/addRecord', fileUpload,addRecord);
routes.get('/view',view);
routes.get('/deleteData',deleteData);
routes.get('/edit',editData);
routes.post('/update',fileUpload,updateRecord)

module.exports = routes;