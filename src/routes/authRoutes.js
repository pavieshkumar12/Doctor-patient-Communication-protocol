const express = require("express");
const {login, signup} = require('../controllers/authControllers')
const router = express.Router();

//user-login api
router.post("/login",login);

//user-Register api
router.post("/signup",signup);


module.exports = router;