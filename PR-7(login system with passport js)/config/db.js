const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login-passport');

const database = mongoose.connection;

database.on('connected' , (err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Database is succesfully connected");
})