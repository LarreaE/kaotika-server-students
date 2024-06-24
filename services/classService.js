
const Class = require('../models/classModel'); 

const getAllClasses = async () => {  
    try
    {
        
        const classes = await Class.find().exec();
        console.log(classes);
        return classes;
    }
    catch (error)
    {
        throw error;
    }
};

module.exports = {
    getAllClasses
}


