const express = require("express");
const router = express.Router();
console.log("Index router Loaded");
const HomeController = require("./../controllers/Home_Controller");
router.get("/", HomeController.home);
module.exports = router;
