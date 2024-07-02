const express = require('express');
const router = express.Router();
const BooksModel = require('../models/books');
const UserModel = require('../models/user');

router.post('/addbooks/:id', async (req, res) => {
    try {
        console.log("Add Bokk")
        const { name, description, image } = req.body;
        const { id } = req.params;
        const create = await BooksModel.create({ name, description, image, uid: id });
        res.json(create._id);

    }
    catch (err) {
        console.log(err)
    }
})
router.post('/editbooks/:id', async (req, res) => {
    try {
        console.log("Add Bokk")
        const { name, description, image } = req.body;
        const { id } = req.params;
        const create = await BooksModel.findOneAndUpdate({_id:id},{ name, description});
        res.json(create._id);
    }
    catch (err) {
        console.log(err)
    }
})
router.get('/books', async (req, res) => {
    try {
        const book = await BooksModel.find();
        res.json(book);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/singlebooks/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await BooksModel.findOne({_id:id});
        res.json(book);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/mybooks/:id', async (req, res) => {
    try {
        const{id} = req.params;
        const book = await BooksModel.find({uid:id});
        res.json(book);
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/reviews/:id/:books', async(req,res)=>{
    try{
        const { id } = req.params;
        const { books } = req.params;
        const { review, user } = req.body;
        const userinfo = await UserModel.findOne({_id:id});
        const book = await BooksModel.findById(books);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        book.reviews.push({ review, user:userinfo.name });
        await book.save();
        res.json("done");
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/deletebook/:id', async (req, res) => {
    try {
        const{id} = req.params;
        const book = await BooksModel.findOneAndDelete({_id:id});
        res.json("deleted");
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;
