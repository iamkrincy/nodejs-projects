const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login-cookie')

const databse = mongoose.connection;

databse.on('connected' , (err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("db is succesfully connected");
})

module.exports = databse;