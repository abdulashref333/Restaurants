const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxlength:50,
        minlength:3,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        validate (value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password shouldn\'t contain \"password\"');
            }
        }
    },
});

// assign a function to user schema so could use to generate jwt.
userSchema.methods.genrateToken = async function(){
    const token = await jwt.sign({"id":this._id.toString()},process.env.JWT_SCERET_KEY);
    return token;
}

// for hashing the password before any Attempt to save the password.
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
});

// this for deleting the password property before send any user docoument.
userSchema.methods.toJSON  = function (){
    const userObj = this.toObject();
    delete userObj.password; 
    return userObj;
}


const User = mongoose.model('users',userSchema);

module.exports.User = User;