const express = require('express');
const cmsController = require('../controllers/cmsController');
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

router.post(
  "/homeicon",
  multer({ storage: fileStorage }).any(),
  cmsController.addHomeIcon
);
router.put(
  "/homeicon",
  multer({ storage: fileStorage }).any(),
  cmsController.editHomeIcon
);

router.post(
  "/process",
  cmsController.addAppProcess
);
router.put(
  "/process",
  cmsController.editAppProcess
);


router.post(
  "/contact",
  cmsController.addContact
);
router.put(
  "/contact",
  cmsController.editContact
);



router.post(
  "/faq",
  cmsController.addFaq
);

router.post(
  "/policy",
  cmsController.addPolicy
);

router.post(
  "/term",
  cmsController.addTerm
);

router.post(
  "/about",
  cmsController.addAbout
);

router.post(
  "/story",
  cmsController.addStory
);

router.delete(
  "/story",
  cmsController.deleteStory
);


router.post(
  "/footerlink",
  cmsController.addFooterLink
);

router.delete(
  "/footerlink",
  cmsController.deleteFooterLink
);



router.get("/getAll",cmsController.getAllData)

module.exports = router
