const express = require("express");
const accountController = require("../controllers/accountController");
const checkAuth = require("../middleware/check-auth"); // verify token for Api request
const router = express.Router();
var multer = require("multer");
// var upload = multer({ dest: './uploads/' })

// --------------multer file upload settings -------------
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});



// -------------------------------------------------------

// user account routes
router.get("/profile", checkAuth, accountController.getProfile);
router.post(
  "/update-profile",
  checkAuth,
  multer({ storage: fileStorage }).single("image"),
  accountController.updateProfile
);


router.post(
  "/kyc-Idverification",
  checkAuth,
  multer({ storage: fileStorage }).single("kycDocument"),
  accountController.kycIdVerification
);

module.exports = router;
