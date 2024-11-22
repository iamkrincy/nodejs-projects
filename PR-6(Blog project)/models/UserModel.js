const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:Number,
        require:true,
    },
})

const user = mongoose.model('user',userSchema);

module.exports = user;