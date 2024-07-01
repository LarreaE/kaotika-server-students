
const Equipment = require('../models/equipmentModel');
const profileService = require('../services/profileService');

const mongoose =  require ('mongoose');
const mongodbRoute = process.env.MONGODB_ROUTE;

//Willpower: Asignación de orden de turnos. Intervención mental en enemigos. Estado de salud mental.
//Strength: Daño del arma. Mínimo para usar armas melee
//Intelligence: Interviene en la prababilidad de éxito al crear y usar una poción. calidad de creación de pociones. Mínimo para usar pociones. A más inteligencia más efecto posible
//Constitution: Interviene en el cálculo de los HP iniciales.
//Dexterity: Mínimo para usar armas missile. Interviene en la probabilidad de éxito al atacar con armas.





const Profiles = {
    SCHOLAR:    0,
    PARIAH:     1,
    JUGGLER:    2,
    BLASPHEMER: 3,
    GOSSIPER:   4,
    BEGGAR:     5,
    BUMBLER:    6   
}




const connectToDB = async() => {
    try 
    {
        
        await mongoose.connect(mongodbRoute);
        console.log('Conexión con Mongo correcta.')
    }   
    catch (error)
    {   
        console.log(`Error al conectar a la base de datos: ${error.message}`);
    }
}


// const clearEquipment = async() = {
//     let deletedWorkout = await Equipment.findByIdAndRemove(remove);       
//     return deletedWorkout;  
// }

const createEquipment = async () => {
    try
    { 
        await connectToDB();

        const profiles = await profileService.getAllProfiles();


        const weapon1 = new Equipment({
            name: "Pinching Yo-yo",
            type: "weapon",
            image: "/images/equipment/weapons/sword_1.jpg",
            effect: [
                {
                    attribute: "dexterity",
                    value:     ""
                }
            ]

        })


        const weapon2 = new Equipment({
            name: "Staff of Disgreace",
            type: "weapon",
            image: "/images/equipment/weapons/staff_1.jpg"

        })



        const equipments = await Equipment.find();
        //console.log(equipments);
        return equipments;
    }
    catch (error)
    {
        throw error;
    }
};
