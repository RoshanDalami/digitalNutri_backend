import mongoose from "mongoose";

const foodCompositionSchemaNepali = new mongoose.Schema(
  {
    foodCommodity: {
      type: String,
    },
    energy: {
      type: Number,
      default: 0,
    },
    carbohydrate: {
      type: Number,
      default: 0,
    },
    protein: {
      type: Number,
      default: 0,
    },
    fat: {
      type: Number,
      default: 0,
    },
    fibre: {
      type: Number,
      default: 0,
    },
    iron: {
      type: Number,
      default: 0,
    },
    calcium: {
      type: Number,
      default: 0,
    },
    vitaminC: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const FoodCompositionNepali = mongoose.model(
  "FoodCompositionNepali",
  foodCompositionSchemaNepali
);
