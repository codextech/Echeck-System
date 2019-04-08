const express = require("express");
const router = express.Router();

const userauthRoutes = require("./userauth");
const accountRoutes = require("./useraccount");
const companyRoutes = require("./user-company");
const bankRoutes = require("./user-bank");



router.use("/auth", userauthRoutes);
router.use("/account", accountRoutes);
router.use("/company", companyRoutes);
router.use("/bank", bankRoutes);


module.exports = router
