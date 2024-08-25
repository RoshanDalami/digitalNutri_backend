import mongoose from "mongoose";

const foodCompositionSchemaNepali = new mongoose.Schema({
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

export const FoodCompositionNepali = mongoose.model('FoodCompositionNepali', foodCompositionSchemaNepali);
