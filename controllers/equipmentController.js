// In src/controllers/equipmentController.js
const equipmentService = require("../services/equipmentService");

const getAllEquipment = async (req, res) => {
  try {
    const allEquipments = await equipmentService.getAllEquipment();
    if (!allEquipments) {
        res.status(404).send({message: 'No existen equipments'});
    }
    res.send({ status: "OK", data: allEquipments });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};


const getEquipmentByProfile = async (req, res) => {
  const {params: { profile }}  = req;

  if (!profile) {
    return res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':profile' can not be empty" },
      });
  }

  try {
    const data = await equipmentService.getEquipmentByProfile(profile);

    console.log(data);
    
    //La consulta devuelve un array
    // if (data.equipment.length === 0) {
    //   return res
    //   .status(404)
    //   .send({ status: "NOT FOUND", 
    //           data: data/*{ error:  `Can't find equipment with the profile '${profile}'`} */});
    // }

    return res.send({ status: "OK", data: data });

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllEquipment,
  getEquipmentByProfile
}