const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// user auth routes
router.post("/login", authController.logIn);
router.post("/signup", authController.signUp);

module.exports = router