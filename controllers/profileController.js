
const profileService = require("../services/profileService");

const getAllProfiles = async (req, res) => {
  try {
    const allProfiles = await profileService.getAllProfiles();
    if (!allProfiles) {
        res.status(404).send({message: 'No existen clases'});
    }
    res.send({ status: "OK", data: allProfiles });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", 
              message: "Error al realizar la petición:",
              data: { error: error?.message || error } });
  }
};



module.exports = {
    getAllProfiles
}