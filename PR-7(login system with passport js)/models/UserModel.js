const mongoose = require('mongoose');
const { type } = require('os');

const userschema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:Number,
        require:true,
    },
})

const user = mongoose.model('user' , userschema);

module.exports = user;