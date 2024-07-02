const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    review: {
        type: String,
    },
},);

const book = mongoose.Schema({
    name:{
        type:String
    }, 
    description:{
        type:String
    },
    image:{
        type:String
    },
    uid:{
        type:String
    },
    reviews: [commentSchema]
});

module.exports = mongoose.model("Books", book);