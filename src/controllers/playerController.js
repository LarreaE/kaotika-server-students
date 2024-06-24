// In src/controllers/playerController.js
const playerService = require("../services/playerService");

const getAllPlayers = async (req, res) => {
  try {
    const allPlayers = await playerService.getAllPlayers();
    if (!allPlayers) {
        res.status(404).send({message: 'No existen players'});
    }
    res.send({ status: "OK", data: allPlayers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};


const getOnePlayer = async (req, res) => {
  const {params: { playerId }}  = req;

  if (!playerId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':playerId' can not be empty" },
      });
  }

  try {
    const player = await playerService.getOnePlayer(playerId);
    if (!player) {
      return res
      .status(404)
      .send({ status: "FAILED", 
              data: { error:  `Can't find player with the id '${playerId}'`} });
    }

    return res.send({ status: "OK", data: player });

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};


const createNewPlayer = async (req, res) => {
  const { body } = req;
  // if (
  //   !body.name ||
  //   !body.mode ||
  //   !body.equipment 
  // ) {
  //   res
  //     .status(400)
  //     .send({
  //       status: "FAILED",
  //       data: {
  //         error:
  //           "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment'",
  //       },
  //     });
  //   return;
  // }

  const newPlayer = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment
  };

  try {
    const createdPlayer = await playerService.createNewPlayer(newPlayer);
    res.status(201).send({ status: "OK", data: createdPlayer });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};


const updateOnePlayer = async (req, res) => {
  const {
    body,
    params: { playerId },
  } = req;

  if (!playerId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':playerId' can not be empty" },
      });
  }

  try {
    const updatedPlayer = await playerService.updateOnePlayer(playerId, body);


    if (!updatedPlayer) {
      return res
      .status(404)
      .send({ status: "FAILED", 
              data: { error:  `Can't find player with the id '${playerId}'`} });
    }

    res.send({ status: "OK", data: updatedPlayer });

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};



module.exports = {
  getAllPlayers,
  getOnePlayer,
  createNewPlayer,
  updateOnePlayer
};