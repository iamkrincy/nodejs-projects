const express = require('express');

const port = 1010;

const app = express();

const path = require('path')

const databse = require('./config/db');

const cookieparser = require('cookie-parser');

app.set('view engine','ejs');

app.use(cookieparser());

app.use(express.urlencoded());

app.use("/uploads",express.static(path.join(__dirname,"uploads")))


app.use("/images", express.static(path.join(__dirname, "images"))); // Serve images from the images folder


app.use('/' , require('./routes/indesRoute'));

app.listen(port ,(err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`Server is running on := ${port}`);  
})