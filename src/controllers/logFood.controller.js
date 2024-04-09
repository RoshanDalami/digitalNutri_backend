import { LoggedFood } from "../models/logFood.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const logFoodController = async (req, res) => {
  try {
    const { mealTime, foodData, _id,date } = req.body;
    console.log(mealTime, foodData);

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
    if (_id) {
      const response = await LoggedFood.findByIdAndUpdate(
        _id,
        { userId, foodData, mealTime ,date },
        { new: true }
      );
      return res
        .status(200)
        .json(new ApiResponse(200, response, "Item has been updated"));
    }
    const loggedFood = new LoggedFood({ userId, mealTime, foodData ,date });
    console.log(loggedFood);
    await loggedFood.save();

    if (!loggedFood) {
      return res.status(400).json(new ApiResponse(400, "Some Error Occurred"));
    } else {
      // const currentDate = new Date.toLocaleString();
      return res
        .status(201)
        .json(new ApiResponse(200, "", "Logged Successfully"));
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
    console.log(error, "error");
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};
const getLoggedFoodPerDay = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));

    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return item.createdAt.toISOString().split("T")[0] === date;
    });

    if (!loggedFoodForDay || loggedFoodForDay.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No data found for the user"));
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, loggedFoodForDay, "Success"));
    }
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json(new ApiResponse(500, "Internal Server Error"));
  }
};
const getValuesForBreakfast = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return (
        item.createdAt.toISOString().split("T")[0] === date &&
        item.mealTime === "Breakfast"
      );
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Breakfast",
      totalCalorieValuePerDay: totalCalorieValue.toFixed(1),
      totalCarbsPerDay: totalCarbs.toFixed(1),
      totalProteinPerDay: totalProtein.toFixed(1),
      totalFatPerDay: totalFat.toFixed(1),
      totalFiberPerDay: totalFiber.toFixed(1),
      totalIronPerDay: totalIron.toFixed(1),
      totalCalciumPerDay: totalCalcium.toFixed(1),
      totalVitaminCPerDay: totalVitaminC.toFixed(1),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getValuesForBreakfastWithFoodDetails = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return (
        item.createdAt.toISOString().split("T")[0] === date &&
        item.mealTime === "Breakfast"
      );
    });

    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Breakfast",
      totalCalorieValuePerDay: totalCalorieValue.toFixed(1),
      totalCarbsPerDay: totalCarbs.toFixed(1),
      totalProteinPerDay: totalProtein.toFixed(1),
      totalFatPerDay: totalFat.toFixed(1),
      totalFiberPerDay: totalFiber.toFixed(1),
      totalIronPerDay: totalIron.toFixed(1),
      totalCalciumPerDay: totalCalcium.toFixed(1),
      totalVitaminCPerDay: totalVitaminC.toFixed(1),
      foodDetails: loggedFoodForDay.map((item) => item.foodData),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getTotalValuesForBreakfast = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return item.mealTime === "Breakfast";
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Breakfast",
      totalCalorieValue: totalCalorieValue.toFixed(1),
      totalCarbs: totalCarbs.toFixed(1),
      totalProtein: totalProtein.toFixed(1),
      totalFat: totalFat.toFixed(1),
      totalFiber: totalFiber.toFixed(1),
      totalIron: totalIron.toFixed(1),
      totalCalcium: totalCalcium.toFixed(1),
      totalVitaminC: totalVitaminC.toFixed(1),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getValuesForLunch = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return (
        item.createdAt.toISOString().split("T")[0] === date &&
        item.mealTime === "Lunch"
      );
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Lunch",
      totalCalorieValuePerDay: totalCalorieValue.toFixed(1),
      totalCarbsPerDay: totalCarbs.toFixed(1),
      totalProteinPerDay: totalProtein.toFixed(1),
      totalFatPerDay: totalFat.toFixed(1),
      totalFiberPerDay: totalFiber.toFixed(1),
      totalIronPerDay: totalIron.toFixed(1),
      totalCalciumPerDay: totalCalcium.toFixed(1),
      totalVitaminCPerDay: totalVitaminC.toFixed(1),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getValuesForLunchWithFoodDetails = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return (
        item.createdAt.toISOString().split("T")[0] === date &&
        item.mealTime === "Lunch"
      );
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Lunch",
      totalCalorieValuePerDay: totalCalorieValue.toFixed(1),
      totalCarbsPerDay: totalCarbs.toFixed(1),
      totalProteinPerDay: totalProtein.toFixed(1),
      totalFatPerDay: totalFat.toFixed(1),
      totalFiberPerDay: totalFiber.toFixed(1),
      totalIronPerDay: totalIron.toFixed(1),
      totalCalciumPerDay: totalCalcium.toFixed(1),
      totalVitaminCPerDay: totalVitaminC.toFixed(1),
      foodDetails: loggedFoodForDay?.map((item) => item?.foodData),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getTotalValuesForLunch = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return item.mealTime === "Lunch";
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Lunch",
      totalCalorieValue: totalCalorieValue.toFixed(1),
      totalCarbs: totalCarbs.toFixed(1),
      totalProtein: totalProtein.toFixed(1),
      totalFat: totalFat.toFixed(1),
      totalFiber: totalFiber.toFixed(1),
      totalIron: totalIron.toFixed(1),
      totalCalcium: totalCalcium.toFixed(1),
      totalVitaminC: totalVitaminC.toFixed(1),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getValuesForSnacks = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return (
        item.createdAt.toISOString().split("T")[0] === date &&
        item.mealTime === "Snacks"
      );
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Snacks",
      totalCalorieValuePerDay: totalCalorieValue.toFixed(1),
      totalCarbsPerDay: totalCarbs.toFixed(1),
      totalProteinPerDay: totalProtein.toFixed(1),
      totalFatPerDay: totalFat.toFixed(1),
      totalFiberPerDay: totalFiber.toFixed(1),
      totalIronPerDay: totalIron.toFixed(1),
      totalCalciumPerDay: totalCalcium.toFixed(1),
      totalVitaminCPerDay: totalVitaminC.toFixed(1),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getValuesForSnacksWithFoodDetails = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return (
        item.createdAt.toISOString().split("T")[0] === date &&
        item.mealTime === "Snacks"
      );
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Snacks",
      totalCalorieValuePerDay: totalCalorieValue.toFixed(1),
      totalCarbsPerDay: totalCarbs.toFixed(1),
      totalProteinPerDay: totalProtein.toFixed(1),
      totalFatPerDay: totalFat.toFixed(1),
      totalFiberPerDay: totalFiber.toFixed(1),
      totalIronPerDay: totalIron.toFixed(1),
      totalCalciumPerDay: totalCalcium.toFixed(1),
      totalVitaminCPerDay: totalVitaminC.toFixed(1),
      foodDetails: loggedFoodForDay?.map((item) => item?.foodData),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getTotalValuesForSnacks = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return item.mealTime === "Snacks";
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Snacks",
      totalCalorieValue: totalCalorieValue.toFixed(1),
      totalCarbs: totalCarbs.toFixed(1),
      totalProtein: totalProtein.toFixed(1),
      totalFat: totalFat.toFixed(1),
      totalFiber: totalFiber.toFixed(1),
      totalIron: totalIron.toFixed(1),
      totalCalcium: totalCalcium.toFixed(1),
      totalVitaminC: totalVitaminC.toFixed(1),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getValuesForDinner = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return (
        item.createdAt.toISOString().split("T")[0] === date &&
        item.mealTime === "Dinner"
      );
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Dinner",
      totalCalorieValuePerDay: totalCalorieValue.toFixed(1),
      totalCarbsPerDay: totalCarbs.toFixed(1),
      totalProteinPerDay: totalProtein.toFixed(1),
      totalFatPerDay: totalFat.toFixed(1),
      totalFiberPerDay: totalFiber.toFixed(1),
      totalIronPerDay: totalIron.toFixed(1),
      totalCalciumPerDay: totalCalcium.toFixed(1),
      totalVitaminCPerDay: totalVitaminC.toFixed(1),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getValuesForDinnerWithFoodDetails = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return (
        item.createdAt.toISOString().split("T")[0] === date &&
        item.mealTime === "Dinner"
      );
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Dinner",
      totalCalorieValuePerDay: totalCalorieValue.toFixed(1),
      totalCarbsPerDay: totalCarbs.toFixed(1),
      totalProteinPerDay: totalProtein.toFixed(1),
      totalFatPerDay: totalFat.toFixed(1),
      totalFiberPerDay: totalFiber.toFixed(1),
      totalIronPerDay: totalIron.toFixed(1),
      totalCalciumPerDay: totalCalcium.toFixed(1),
      totalVitaminCPerDay: totalVitaminC.toFixed(1),
      foodDetails: loggedFoodForDay?.map((item) => item?.foodData),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};
const getTotalValuesForDinner = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json(new ApiResponse(400, null, "Invalid User"));
    const loggedFoodDetails = await LoggedFood.find({ userId: userId });
    const loggedFoodForDay = loggedFoodDetails.filter((item) => {
      return item.mealTime === "Dinner";
    });
    const totalCalorieValue = loggedFoodForDay
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = loggedFoodForDay
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = loggedFoodForDay
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = loggedFoodForDay
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = loggedFoodForDay
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = loggedFoodForDay
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = loggedFoodForDay
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = loggedFoodForDay
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const totalFoodComp = {
      mealTime: "Dinner",
      totalCalorieValue: totalCalorieValue.toFixed(1),
      totalCarbs: totalCarbs.toFixed(1),
      totalProtein: totalProtein.toFixed(1),
      totalFat: totalFat.toFixed(1),
      totalFiber: totalFiber.toFixed(1),
      totalIron: totalIron.toFixed(1),
      totalCalcium: totalCalcium.toFixed(1),
      totalVitaminC: totalVitaminC.toFixed(1),
    };

    return res.status(200).json(new ApiResponse(200, totalFoodComp, true));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};

export {
  logFoodController,
  getLoggedFood,
  getValuesForBreakfast,
  getValuesForLunch,
  getValuesForSnacks,
  getValuesForDinner,
  getLoggedFoodPerDay,
  getTotalValuesForBreakfast,
  getTotalValuesForLunch,
  getTotalValuesForSnacks,
  getTotalValuesForDinner,
  getValuesForBreakfastWithFoodDetails,
  getValuesForLunchWithFoodDetails,
  getValuesForSnacksWithFoodDetails,
  getValuesForDinnerWithFoodDetails,
};
