import mongoose from "mongoose";

const foodCompositionSchema = new mongoose.Schema({
    foodCommodity: {
        type: String,
    },
    energy: {
        type: Number,
    },
    carbohydrate: {
        type: Number,
    },
    protein: {
        type: Number,
    },
    fat: {
        type: Number,
    },
    fibre: {
        type: Number,
    },
    iron: {
        type: Number,
    },
    calcium: {
        type: Number,
    },
    vitaminC: {
        type: Number,
    }
},
    {
        timestamps: true,
    },
);

export const FoodComposition = mongoose.model('FoodComposition', foodCompositionSchema);
