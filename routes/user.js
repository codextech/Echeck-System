const express = require('express');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth'); // verify token for Api request
const router = express.Router();


// user companies routes
router.get("/getall",checkAuth, userController.getUsers);

module.exports = router;
