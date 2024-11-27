const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login-cookie');

const database =  mongoose.connection;

database.on('connected' , (err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("DB is succesfully connected");
})