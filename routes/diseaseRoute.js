const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseaseController");

router.get("/", diseaseController.getAlldiseases);

module.exports = router;