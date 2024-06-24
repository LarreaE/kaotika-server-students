const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");



router.get("/", playerController.getAllPlayers);
//router.get("/players/:playerId", playerController.getOnePlayer);
router.get("/email/:email", playerController.getPlayerByEmail);

router.post("/", playerController.createNewPlayer);
router.patch("/email/:email", playerController.updateOnePlayer);

module.exports = router;