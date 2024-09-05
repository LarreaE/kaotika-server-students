require('dotenv').config();
const express = require("express"); 
const bodyParser = require("body-parser");
const playerRouter = require("./routes/playerRoutes");
const profileRouter = require("./routes/profileRoutes");

const mongoose =  require ('mongoose');
const mongodbRoute = process.env.MONGODB_ROUTE;


const app = express(); 
const PORT = process.env.PORT || 3000; 


// Use bodyparser
app.use(bodyParser.json());

//Load router into /api/v1
app.use("/players", playerRouter);
app.use("/profiles", profileRouter);


async function start() {
    try 
    {
        await mongoose.connect(mongodbRoute);
        app.listen(PORT, () => { 
            console.log(`API is listening on port ${PORT}`); 
        });
        console.log('Conexión con Mongo correcta.')
    }   
    catch (error)
    {   
        console.log(`Error al conectar a la base de datos: ${error.message}`);
    }
}

start();


  

