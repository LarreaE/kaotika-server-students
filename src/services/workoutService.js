// In src/services/workoutServices.js
//const { v4: uuid } = require("uuid");
//const Workout = require("../database/Workout");

const Workout = require('../models/workoutModel');

const getAllWorkouts = async () => {  
    try
    {
        const workouts = await Workout.find();
        console.log(workouts);
        return workouts;
    }
    catch (error)
    {
        throw error;
    }
};

const getOneWorkout = async (workoutId) => { 
    try 
    {
        const workout = await Workout.findById(workoutId);     
        return workout;
    } 
    catch (error) 
    {
        throw error;
    }
};

const createNewWorkout = async (newWorkout) => {
    try 
    {
        let workoutToInsert = new Workout(newWorkout);
        const createdWorkout = await workoutToInsert.save();   
        return createdWorkout;
    } 
    catch (error) 
    {
        throw error;
    }
};

const updateOneWorkout = async (workoutId, changes) => {
    try 
    {
        let updatedWorkout = await Workout.findByIdAndUpdate(workoutId,{$set:changes},{new:true});
        return updatedWorkout;       
    } 
    catch (error) 
    {
        throw error;
    }
};

const deleteOneWorkout = async (workoutId) => {
    try 
    {
        let deletedWorkout = await Workout.findByIdAndRemove(workoutId);       
        return deletedWorkout;     
    } 
    catch (error) 
    {
        throw error;
    }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
};