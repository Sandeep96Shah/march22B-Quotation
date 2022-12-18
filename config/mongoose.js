const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0/March-Quotation')
.then(() => {console.log("Connected to MongoDB")})
.catch((err) => {console.log("Error while connecting to mongodb")})