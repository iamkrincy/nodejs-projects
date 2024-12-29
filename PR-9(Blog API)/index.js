const express = require('express');

const port = 9000;

const app = express();

app.set('view engine' ,'ejs');

const db = require('./config/db');

const path = require('path');

app.use(express.urlencoded());

app.use('/', require('./routes/indexRoutes'))

app.listen(port , (err) =>{
    if(err){
    console.log(err);
    return false;
    }
    console.log(`server is running on :- ${port}`);
}) 
