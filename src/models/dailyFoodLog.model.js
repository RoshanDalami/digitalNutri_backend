import mongoose from "mongoose";

const { Schema } = mongoose;

const dailyFoodLogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  foods: [
    {
      name: { type: String, required: true },
      calorieValue: { type: Number, required: true },
      quantity: { type: Number, required: true },
      carbs: { type: Number, required: true },
      protein: { type: Number, required: true },
      fat: { type: Number, required: true },
      fibre: { type: Number, required: true },
      iron: { type: Number, required: true },
      calcium: { type: Number, required: true },
      vitaminC: { type: Number, required: true },
      mealTime: { type: String, required: true },
    },
  ],
});

// const DailyFoodLog = mongoose.model("DailyFoodLog", dailyFoodLogSchema);

// export default DailyFoodLog;

export const DailyFoodLog = mongoose.model("DailyFoodLog", dailyFoodLogSchema);
