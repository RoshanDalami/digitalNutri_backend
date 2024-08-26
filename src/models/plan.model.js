import mongoose, { Schema } from "mongoose";

const planSchema = new Schema(
  {
    planTitle: {
      type: String,
    },
    planDuration: {
      type: Number,
    },
    planPrice: {
      type: Number,
    },
    isActive:{
        type:Boolean,
        default:true
    }
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);

export { Plan };
