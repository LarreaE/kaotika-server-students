const Disease = require('../models/diseaseModel');

const getAllDiseases = async () => {  
    try
    {
        
        const diseases = await Disease.find().exec();
        //console.log(players);
        return diseases;
    }
    catch (error)
    {
        throw error;
    }
};


module.exports = {
    getAllDiseases,
    
  };