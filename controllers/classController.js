
const classService = require("../services/classService");

const getAllClasses = async (req, res) => {
  try {
    const allClasses = await classService.getAllClasses();
    if (!allClasses) {
        res.status(404).send({message: 'No existen clases'});
    }
    res.send({ status: "OK", data: allClasses });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};

module.exports = {
    getAllClasses
}