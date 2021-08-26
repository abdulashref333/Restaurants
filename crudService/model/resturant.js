const mongoose = require('mongoose');

const resturantSchema = new mongoose.Schema({
  name:{
      type:String,
      trim:true,
      required:true
  },
  address:[{
    city:{
      type:String,
      required:true
    },
    street:String
  }],
  userId:{
    type:String,
  },
  description:String,
  age:Number,
  
});


const Resturant = mongoose.model('resturant', resturantSchema);
module.exports.Resturant = Resturant;