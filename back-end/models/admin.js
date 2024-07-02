const mongoose = require('mongoose');

const User = mongoose.Schema({
    id:{
        type:String
    },  
    password:{
        type:String
    }
});

module.exports = mongoose.model("admin", User);