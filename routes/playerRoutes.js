const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");



router.get("/", playerController.getAllPlayers);
router.get("/email/:email", playerController.getPlayerByEmail);
router.get("/hall", playerController.getHallOfFame);

router.post("/", playerController.createNewPlayer);
router.patch("/equipment/:id", playerController.updateOnePlayer);
router.patch("/bonification/:classroom_Id", playerController.updateGoldOrExperienceForOnePlayer);

router.post("/tasks/", playerController.updateTasks);

module.exports = router;