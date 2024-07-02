const mongoose = require('mongoose');

const User = mongoose.Schema({
    id:{
        type:String
    }, 
    name:{
        type:String
    }, 
    password:{
        type:String
    }
});

module.exports = mongoose.model("User", User);