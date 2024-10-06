
const diseaseService = require("../services/diseaseService");

const getAlldiseases = async (req, res) => {
  try {
    const alldiseases = await diseaseService.getAllDiseases();
    if (!alldiseases) {
        res.status(404).send({message: 'No existen clases'});
    }
    res.send({ status: "OK", data: alldiseases });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};



module.exports = {
    getAlldiseases
}