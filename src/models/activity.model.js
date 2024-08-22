import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title:{
        type: String
    },
    value:{
        type: Number
    }
});



export const Activities = mongoose.model('Activity', activitySchema);