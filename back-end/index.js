const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const Connection = require('./connection/connection');
const Books  = require('./routes/books')
const User  = require('./routes/user')
const Admin = require('./routes/admin')

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

Connection();
app.use(Books);
app.use(User);
app.use(Admin)


const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});