const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://krincy:krincy22@cluster0.ywzpz.mongodb.net/api');

const db = mongoose.connection;

db.on('connected' ,(err) =>{
    if(err){
        console.log(err);
        return false; 
    }
    console.log('DB is connected');const mongoose = require('mongoose');
});


module.exports = {db}