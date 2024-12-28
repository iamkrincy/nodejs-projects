const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    description:{
        type:String,
        require:true,
    },

    price:{
        type:Number,
        require:true,
    },

    qty:{
        type : Number,
        require:true,
    },

    image:{
        type:String,
        require:true,
    }


});

const product = mongoose.model('product' , UserSchema);

module.exports = product;