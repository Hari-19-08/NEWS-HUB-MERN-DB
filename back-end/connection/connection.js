const mongoose = require('mongoose');
require('dotenv').config();

const Connection = () => {
    const url = process.env.MONGODB_URL;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("DB Connected");
        })
        .catch((err) => {
            console.log("Connection Error", err);
        });
};

module.exports = Connection;
