const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
      title:{
        type:String,
        require:true,
      },

      content:{
        type:String,
        require:true,
      },

      image:{
        type:String,
        require:true,
      },
});

const travel = mongoose.model('travel',userSchema);

module.exports = travel;