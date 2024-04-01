import mongoose from "mongoose";
const { Schema } = mongoose;

const loggedFoodSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    mealTime: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Snacks', 'Lunch', 'Dinner']
    },
    foodData:
    {
      name: {
        type: String,
        required: true,
      },
      calorieValue: {
        type: Number,
        required: true,
        default: 0,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
      carbs: {
        type: Number,
        required: true,
        default: 0,
      },
      protein: {
        type: Number,
        required: true,
        default: 0,
      },
      fat: {
        type: Number,
        required: true,
        default: 0,
      },
      fibre: {
        type: Number,
        required: true,
        default: 0,
      },
      iron: {
        type: Number,
        required: true,
        default: 0,
      },
      calcium: {
        type: Number,
        required: true,
        default: 0,
      },
      vitaminC: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const LoggedFood = mongoose.model("LoggedFood", loggedFoodSchema);
