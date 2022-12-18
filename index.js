const express = require('express');
const PORT = 8000;
const app = express();
const dataBase = require('./config/mongoose');
const routes = require('./routes/index');

app.use(express.urlencoded());
app.use('/', routes);

app.listen(PORT, (error) => {
    if(error) {
        console.log("Issue while running the server")
    }
    console.log("Server is up and running on port: 8000");
})