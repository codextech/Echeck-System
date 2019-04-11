const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// user auth routes
router.post("/login", authController.logIn);
router.post("/signup", authController.signUp);


// POST /email-verication?verifytoken=[string]&email=[string]
router.post('/email-verification', authController.emailVerification);

// reset password
router.post("/reset-request", authController.resetPasswordRequest); // send token in mail
router.get("/resetpassword/:token", authController.getresetPassword);
router.post("/resetpassword", authController.postresetPassword);

// change password

router.post("/changepassword", authController.changePassword);




module.exports = router