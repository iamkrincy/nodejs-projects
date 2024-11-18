const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    image:{
        type:String,
        require:true,
    },

    title:{
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

});

const Movie = mongoose.model('Movie' , UserSchema);

module.exports = Movie;