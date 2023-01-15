const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
    dbName: "Quotations-Project",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {console.log("Connected to MongoDB")})
.catch((err) => {console.log("Error while connecting to mongodb", err)})