const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");
const middleware = require("../middlewares/verifyData");


router.get("/players/", playerController.getAllPlayers);
//router.get("/players/:playerId", playerController.getOnePlayer);
router.get("/players/:email", playerController.getPlayerByEmail);

router.post("/players/", playerController.createNewPlayer);
router.patch("/players/:playerId", playerController.updateOnePlayer);

module.exports = router;