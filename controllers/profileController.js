
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


// const createNewProfile = async (req, res) => {
//   const { body } = req;

//   // const newProfile = {
//   //   name: body.name,
//   //   description: body.description,
//   //   image: body.image,
//   //   dex: body.dexterity,
//   //   int: body.intelligence,
//   //   cha: body.charisma,
//   //   san: body.sanity,
//   //   str: body.strength,
//   //   con: body.constitution,
//   // };

//   const newProfile = {
//     name: "Scholar",
//     description: "In silent libraries and secret laboratories, the Scholar spends his days immersed in knowledge. With a brilliant mind and insatiable curiosity, he seeks to understand the mysteries of the universe and unravel the secrets hidden in ancient texts. His intelligence is his greatest weapon, capable of solving complex puzzles and devising ingenious strategies. Though he does not excel in physical strength, his insight and wisdom make him an invaluable ally. The Scholar is a beacon of light in the darkness, guided by the desire for knowledge and truth.",
//     image: "/images/scholar.jpg",
//     dex: 15,
//     int: 40,
//     cha: 23,
//     san: 12,
//     str: 33,
//     con: 13
//   };

//   console.log(newProfile) ;

//   try {
//     const createdProfile = await profileService.createNewProfile(newProfile);
//     res.status(201).send({ status: "OK", data: createdProfile });
//   } catch (error) {
//     res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", 
//               message: "Error al realizar la petición:",
//               data: { error: error?.message || error } });
//   }
// };

module.exports = {
    getAllProfiles
}