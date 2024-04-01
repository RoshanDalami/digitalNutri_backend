import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    mealTitle:{
        type: String,
    },
    mealIcon:{
        type: String,
    }
})


export const Meals = mongoose.model('Meals', mealSchema); 