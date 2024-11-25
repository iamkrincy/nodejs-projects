const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:Number,
        require:true
    },
});

const user = mongoose.model('user',UserSchema);

module.exports = user;