const express = require('express');
const bankController = require('../controllers/bankController');
const checkAuth = require('../middleware/check-auth'); // verify token for Api request
const router = express.Router();
var multer = require("multer");


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
  
// user companies routes
// router.get("/getCompany",checkAuth, bankController.);
router.get("",checkAuth, bankController.getBank);
router.post("",checkAuth, bankController.creatBank);
router.get("/allbanks",checkAuth, bankController.getAllBanks);


// bank accounts
router.get("/bank-account/getall",checkAuth, bankController.getBankAccount); // all bank account

router.get("/bank-account",checkAuth, bankController.getBankAccountById); // singlee bank account

router.post("/bank-account",checkAuth,
 multer({ storage: fileStorage }).single("image"),
  bankController.creatBankAccount);

router.put("/bank-account",checkAuth,
  multer({ storage: fileStorage }).single("image"),
   bankController.updateBankAccount);
router.delete("/bank-account",checkAuth, bankController.deleteBankAccount);

//user signatures
router.get("/bank-account/signatures",checkAuth, bankController.getSignatures);




module.exports = router