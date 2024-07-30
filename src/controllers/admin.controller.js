import { User } from "../models/user.model.js";
import { AdjustedCalorie } from "../models/adjustedCalorie.model.js";
import {FoodComposition} from "../models/foodComposition.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Calorie } from "../models/calorie.model.js";
import { LoggedFood } from "../models/logFood.model.js";
import {Promo} from "../models/promocode.model.js";

export async function GetUserList(req, res) {
  try {
    const response = await User.find({});
    if (!response) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "No user found !!!"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, response, "User list generated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}

export async function GetAdjustedCalorieOfUser(req, res) {
  const { id } = req.params;
  try {
    const response = await AdjustedCalorie.findOne({ userId: id });
    if (!response) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, "User doesn't found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, response, "Adjusted Calorie of user is generated")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}

export const getTotalValuesForBreakfastByUser = async (req, res) => {
  const { id } = req.params;
  const date = new Date().toISOString().split("T")[0];
  try {
    const loggedFoodDetails = await LoggedFood.find({ userId: id });
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
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, false, "Internal Server Error", false));
  }
};

export const getTotalValuesForLunchByUser = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const loggedFoodDetails = await LoggedFood.find({ userId: req.params.id });
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

export const getTotalValuesForSnacksByUser = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const loggedFoodDetails = await LoggedFood.find({ userId: req.params.id });
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

export const getTotalValuesForDinnerByUser = async (req, res) => {
  const date = new Date().toISOString().split("T")[0];
  try {
    const loggedFoodDetails = await LoggedFood.find({ userId: req.params.id });
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

export const dashboardItems = async(req,res)=>{
  try{
    const totalActiveUser = await User.countDocuments({
      isActive: true
    });
    const totalInactiveUsers = await User.countDocuments({isActive: false});
    const totalUser = await User.countDocuments({});
    const totalNumberOfFoods = await FoodComposition.countDocuments({});
    const PromoCodeCount = await Promo.countDocuments({});
    const result = [
      {
        title:"Total Active User",
        value: totalActiveUser
      }, {
        title:"Total InActive User",
        value: totalInactiveUsers
      },
      {
        title:"Total Registered User",
        value: totalUser
      },
      {
        title:"Total Listed Food",
        value:totalNumberOfFoods
      },
      {
        title:"Total Promo codes",
        value: PromoCodeCount
      },

    ];
    return res.status(200).json(new ApiResponse(200,result,"Data generated successfullly"));
  }catch (error){
return res.status(error.statusCode).json(new ApiResponse(error.statusCode,null,error.messages))
  }
}
