import { LoggedFood } from "../models/logFood.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const logFoodController = async (req, res) => {
  try {
    const { mealTime, foodData } = req.body;
    
    
    const userId = req.user.id;

    // Check if mealTime is provided and is one of the allowed values
    if (
      !mealTime ||
      !["Breakfast", "Snacks", "Lunch", "Dinner"].includes(mealTime)
    ) {
      return res.status(400).json({ error: "Invalid or missing meal time" });
    }

    const requiredFields = [
      "name",
      "calorieValue",
      "quantity",
      "carbs",
      "protein",
      "fat",
      "fibre",
      "iron",
      "calcium",
      "vitaminC",
    ];
    for (const field of requiredFields) {
      if (!(field in foodData) || !foodData[field]) {
        return res
          .status(400)
          .json({ error: `Missing or invalid value for field: ${field}` });
      }
    }

    const loggedFood = await LoggedFood.create({ userId, mealTime, foodData });
    console.log(loggedFood);
    if (!loggedFood) {
      return res.status(400).json(new ApiResponse(400, "Some Error Occurred"));
    } else {
      // const currentDate = new Date.toLocaleString();
      return res
        .status(201)
        .json(new ApiResponse(200, loggedFood, "Logged Successfully"));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getLoggedFood = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));

    const loggedFoodDetails = await LoggedFood.find({ userId: userId });

    if (!loggedFoodDetails || loggedFoodDetails.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No data found for the user"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, loggedFoodDetails, "Success"));
    }
  } catch (error) {
    console.log(error,'error');
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};

export { logFoodController, getLoggedFood };
