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


const getPlayerByEmail = async (req, res) => {
  const {params: { email }}  = req;

  if (!email) {
    return res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':email' can not be empty" },
      });
  }

  try {
    const data = await playerService.getPlayerByEmail(email);
    
    //La consulta devuelve un array
    if (data.message === "NO PLAYER") {
      return res
      .status(404)
      .send({ status: "NOT FOUND", 
              data: data/*{ error:  `Can't find player with the email '${email}'`} */});
    }

    return res.send({ status: "OK", data: data.createdPlayer});

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
    console.log(player)
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

  const newPlayer = body;
  console.log("Body data received")
  //console.log(newPlayer);

  try {
    const createdPlayer = await playerService.createNewPlayer(newPlayer);

    //console.log("Player data returned to controller")
    //console.log(createdPlayer);
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


const updateTasks = async (req, res) => {
  console.log("Route players/tasks executed. updatedTasks function executed");
  console.log(req.body);

  const { body } = req;
  const taskData = body;



  try {
     const updatedIds = await playerService.updateTask(taskData);

     console.log("IDS Classroom actualizados");
     console.log(updatedIds);

     res.send({ status: "OK", data: updatedIds });
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
  getPlayerByEmail,
  createNewPlayer,
  updateOnePlayer,
  updateTasks
};