const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/", profileController.getAllProfiles);

module.exports = router;