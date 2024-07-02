const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');

router.post('/signup', async (req, res) => {
    try {
        const { name, id, password } = req.body;
        const check = await UserModel.findOne({ id });
        if (check) {
            console.log("ALREADY EXIST")
            res.json("exist")
        }
        else {
            const create = await UserModel.create({ name, id, password });
            res.json(create._id);
        }

    }
    catch (err) {
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { id, password } = req.body;
        console.log(password);
        const check = await UserModel.findOne({ id });
        if (check) {
            if (check.password === password) {
                res.json(check._id);
            }
            else {
                res.json("wrong")
            }
        }
        else {
            res.json("wrong")
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/alluser', async (req, res) => {
    try {
        const check = await UserModel.find();
        res.json(check);
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/edituser/:id', async (req, res) => {
    try {
        console.log("Add Bokk")
        const { name } = req.body;
        const { id } = req.params;
        const create = await UserModel.findOneAndUpdate({ _id: id }, { name });
        res.json(create._id);
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/deleteuser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await UserModel.findOneAndDelete({ _id: id });
        res.json("deleted");
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;
