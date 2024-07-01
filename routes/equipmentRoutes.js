const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");



router.get("/", equipmentController.getAllEquipment);
router.get("/profile/:profile", equipmentController.getEquipmentByIdProfile);


module.exports = router;