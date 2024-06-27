
const Profile = require('../models/profileModel'); 

const getAllProfiles = async () => {  
    try
    {
        
        const profiles = await Profile.find().exec();
        console.log(profiles);
        return profiles;
    }
    catch (error)
    {
        throw error;
    }
};

module.exports = {
    getAllProfiles
}


