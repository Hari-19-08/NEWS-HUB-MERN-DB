const express = require('express');
const router = express.Router();
const UserModel = require('../models/admin');

router.post('/adminlogin', async (req, res) => {
    try {
        const { id, password } = req.body;
        const check = await UserModel.findOne({ id });
        if (check) {
            if(check.password  === password){
                res.json("done");
                return;
            }
            console.log("not done")   
        }
        console.log("not done")

    }
    catch (err) {
        console.log(err)
    }
})



module.exports = router;
