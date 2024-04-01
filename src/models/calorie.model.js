import mongoose from "mongoose";
const { Schema } = mongoose;

const calorieSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    weight: {
      type: Number,
      required: true,
    },
    weightUnit:{
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    heightUnit: {
      type: String
    },
    gender: {
      type: String,
      required: true,
    },
    pregnancy: {
      type: Boolean,
    },
    isLactate: {
      type: Boolean,
    },
    lactationPeriod: {
      type: Number,
      default: 0.0,
    },
    activity: {
      type: String,
      required: true
    },
    calorieRequirement:{
      type: String
    },
    targetWeight:{
      type: Number 
    },
  },
  {
    timestamps: true,
  }
);

export const Calorie = mongoose.model("Calorie", calorieSchema);
