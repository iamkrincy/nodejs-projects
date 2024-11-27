const mongoose = require('mongoose');
const { type } = require('os');

const userSchema =new mongoose.Schema({

    name:{
      type:String,
      require:true,
    },

    email:{
        type:String,
        require:true,
      },

    password:{
        type:String,
        require:true,
      },
});

const user = mongoose.model('user',userSchema);

module.exports = user;