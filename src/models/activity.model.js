import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    activityName:{
        type: String
    },
    activityValue:{
        type: Number
    }
});



export const Activities = mongoose.model('Activity', activitySchema);