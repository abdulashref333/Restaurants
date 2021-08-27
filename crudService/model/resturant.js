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

//this for running schema validation before update operation.
resturantSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

const Resturant = mongoose.model('resturant', resturantSchema);
module.exports.Resturant = Resturant;