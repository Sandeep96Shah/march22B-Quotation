const express = require('express');
const PORT = 8000;
const app = express();
const dataBase = require('./config/mongoose');
const routes = require('./routes/index');
const passportJWT = require('./config/passport_jwt');
const googleOauth = require('./config/passport-google-oauth');
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested:With, Content-Type, Accept"
    );
    next();
})
app.use('/', routes);

app.listen(PORT, (error) => {
    if(error) {
        console.log("Issue while running the server")
    }
    console.log("Server is up and running on port: 8000");
})