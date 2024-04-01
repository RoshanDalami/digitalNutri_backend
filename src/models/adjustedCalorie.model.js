import mongoose from "mongoose";

const { Schema } = mongoose;

const adjustedCalorieSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    weightGoal: {
        type: String,
        required: true,
    },
    weightGoalValue: {
        type: String,
        required: true
    },
    isDiabetic: {
        type: Boolean,
    },
    adjustedCalorieValue: {
        type: Number,
        required: true
    }
});

export const AdjustedCalorie = mongoose.model('adjustedCalorie', adjustedCalorieSchema);