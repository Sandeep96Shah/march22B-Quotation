const express = require('express');
const router = express.Router();

//import the user controller
const userController = require('../controller/user');


// api
router.post('/sign-up', userController.signUp);

module.exports = router;