const express = require('express');
const bodyParser = require('body-parser');


const port = 8080;

const app = express();

const path = require('path')

const database = require('./config/db');

app.use(bodyParser.urlencoded({ extended: true }));

const cookieparser = require('cookie-parser');

app.set('view engine' , 'ejs');

app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use("/images", express.static(path.join(__dirname, "images"))); // Serve images from the images folder

app.use(cookieparser());

app.use(express.urlencoded());

app.use('/',require('./routes/indexRoutes'));

app.listen(port , (err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is running on :- ${port}`);
})