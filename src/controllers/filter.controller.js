import { LoggedFood } from "../models/logFood.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

async function sevenDaysData(req, res) {
  const userId = req.user.id;
  const date = new Date();
  const sevenDataBack = new Date(new Date().setDate(new Date().getDate() - 7));
  console.log(date, sevenDataBack);
  try {
    const loggedFood = await LoggedFood.find({ userId: userId });
    const filterData = loggedFood.filter(
      (item) => item.createdAt === date || item.createdAt >= sevenDataBack
    );
    const breakfastData = filterData?.filter(
      (item) => item.mealTime === "Breakfast"
    );
    const totalBreakfastCalorieValue = breakfastData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastCarbs = breakfastData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastProtein = breakfastData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastFat = breakfastData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastFiber = breakfastData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastIron = breakfastData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastCalcium = breakfastData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastVitaminC = breakfastData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const lunchData = filterData?.filter((item) => item.mealTime === "Lunch");
    const totalLunchCalorieValue = lunchData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchCarbs = lunchData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchProtein = lunchData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchFat = lunchData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchFiber = lunchData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchIron = lunchData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchCalcium = lunchData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchVitaminC = lunchData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);
    const snacksData = filterData?.filter((item) => item.mealTime === "Snacks");

    const totalSnacksCalorieValue = snacksData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksCarbs = snacksData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksProtein = snacksData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksFat = snacksData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksFiber = snacksData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksIron = snacksData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksCalcium = snacksData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksVitaminC = snacksData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //dinner
    const dinnerData = filterData?.filter(
      (item) => item.mealTime === "Dinnter"
    );
    const totalDinnerCalorieValue = dinnerData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerCarbs = dinnerData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerProtein = dinnerData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerFat = dinnerData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerFiber = dinnerData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerIron = dinnerData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerCalcium = dinnerData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerVitaminC = dinnerData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //total for 7 days
    const totalCalorieValue = filterData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = filterData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = filterData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = filterData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = filterData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = filterData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = filterData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = filterData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //response data
    const responseData = {
      breakfast: {
        foodData: breakfastData,
        totalBreakfastCalorieValue,
        totalBreakfastCalcium,
        totalBreakfastCarbs,
        totalBreakfastProtein,
        totalBreakfastIron,
        totalBreakfastFiber,
        totalBreakfastVitaminC,
        totalBreakfastFat,
      },
      lunch: {
        foodData: lunchData,
        totalLunchCalcium,
        totalLunchCalorieValue,
        totalLunchCarbs,
        totalLunchFat,
        totalLunchFiber,
        totalLunchIron,
        totalLunchProtein,
        totalLunchVitaminC,
      },
      snacks: {
        foodData: snacksData,
        totalSnacksCalcium,
        totalSnacksCalorieValue,
        totalSnacksCarbs,
        totalSnacksFat,
        totalSnacksFiber,
        totalSnacksIron,
        totalSnacksProtein,
        totalSnacksVitaminC,
      },
      dinner: {
        foodData: dinnerData,
        totalDinnerCalcium,
        totalDinnerCalorieValue,
        totalDinnerCarbs,
        totalDinnerFat,
        totalDinnerFiber,
        totalDinnerIron,
        totalDinnerProtein,
        totalDinnerVitaminC,
      },
      totalCalcium,
      totalCalorieValue,
      totalVitaminC,
      totalIron,
      totalFiber,
      totalFat,
      totalProtein,
      totalCarbs,
    };
    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "List generated!!!"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}
async function fourteenDaysData(req, res) {
  const userId = req.user.id;
  const date = new Date();
  const sevenDataBack = new Date(new Date().setDate(new Date().getDate() - 14));
  try {
    const loggedFood = await LoggedFood.find({ userId: userId });
    const filterData = loggedFood.filter(
      (item) => item.createdAt === date || item.createdAt >= sevenDataBack
    );
    const breakfastData = filterData?.filter(
      (item) => item.mealTime === "Breakfast"
    );
    const totalBreakfastCalorieValue = breakfastData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastCarbs = breakfastData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastProtein = breakfastData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastFat = breakfastData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastFiber = breakfastData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastIron = breakfastData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastCalcium = breakfastData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastVitaminC = breakfastData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const lunchData = filterData?.filter((item) => item.mealTime === "Lunch");
    const totalLunchCalorieValue = lunchData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchCarbs = lunchData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchProtein = lunchData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchFat = lunchData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchFiber = lunchData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchIron = lunchData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchCalcium = lunchData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchVitaminC = lunchData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);
    const snacksData = filterData?.filter((item) => item.mealTime === "Snacks");

    const totalSnacksCalorieValue = snacksData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksCarbs = snacksData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksProtein = snacksData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksFat = snacksData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksFiber = snacksData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksIron = snacksData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksCalcium = snacksData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksVitaminC = snacksData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //dinner
    const dinnerData = filterData?.filter(
      (item) => item.mealTime === "Dinnter"
    );
    const totalDinnerCalorieValue = dinnerData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerCarbs = dinnerData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerProtein = dinnerData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerFat = dinnerData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerFiber = dinnerData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerIron = dinnerData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerCalcium = dinnerData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerVitaminC = dinnerData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //total for 7 days
    const totalCalorieValue = filterData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = filterData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = filterData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = filterData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = filterData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = filterData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = filterData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = filterData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //response data
    const responseData = {
      breakfast: {
        foodData: breakfastData,
        totalBreakfastCalorieValue,
        totalBreakfastCalcium,
        totalBreakfastCarbs,
        totalBreakfastProtein,
        totalBreakfastIron,
        totalBreakfastFiber,
        totalBreakfastVitaminC,
        totalBreakfastFat,
      },
      lunch: {
        foodData: lunchData,
        totalLunchCalcium,
        totalLunchCalorieValue,
        totalLunchCarbs,
        totalLunchFat,
        totalLunchFiber,
        totalLunchIron,
        totalLunchProtein,
        totalLunchVitaminC,
      },
      snacks: {
        foodData: snacksData,
        totalSnacksCalcium,
        totalSnacksCalorieValue,
        totalSnacksCarbs,
        totalSnacksFat,
        totalSnacksFiber,
        totalSnacksIron,
        totalSnacksProtein,
        totalSnacksVitaminC,
      },
      dinner: {
        foodData: dinnerData,
        totalDinnerCalcium,
        totalDinnerCalorieValue,
        totalDinnerCarbs,
        totalDinnerFat,
        totalDinnerFiber,
        totalDinnerIron,
        totalDinnerProtein,
        totalDinnerVitaminC,
      },
      totalCalcium,
      totalCalorieValue,
      totalVitaminC,
      totalIron,
      totalFiber,
      totalFat,
      totalProtein,
      totalCarbs,
    };
    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "List generated!!!"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}
async function thirtyDaysData(req, res) {
  const userId = req.user.id;
  const date = new Date();
  const sevenDataBack = new Date(new Date().setDate(new Date().getDate() - 30));
  try {
    const loggedFood = await LoggedFood.find({ userId: userId });
    const filterData = loggedFood.filter(
      (item) => item.createdAt === date || item.createdAt >= sevenDataBack
    );
    const breakfastData = filterData?.filter(
      (item) => item.mealTime === "Breakfast"
    );
    const totalBreakfastCalorieValue = breakfastData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastCarbs = breakfastData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastProtein = breakfastData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastFat = breakfastData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastFiber = breakfastData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastIron = breakfastData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastCalcium = breakfastData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastVitaminC = breakfastData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const lunchData = filterData?.filter((item) => item.mealTime === "Lunch");
    const totalLunchCalorieValue = lunchData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchCarbs = lunchData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchProtein = lunchData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchFat = lunchData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchFiber = lunchData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchIron = lunchData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchCalcium = lunchData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchVitaminC = lunchData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);
    const snacksData = filterData?.filter((item) => item.mealTime === "Snacks");

    const totalSnacksCalorieValue = snacksData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksCarbs = snacksData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksProtein = snacksData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksFat = snacksData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksFiber = snacksData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksIron = snacksData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksCalcium = snacksData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksVitaminC = snacksData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //dinner
    const dinnerData = filterData?.filter(
      (item) => item.mealTime === "Dinnter"
    );
    const totalDinnerCalorieValue = dinnerData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerCarbs = dinnerData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerProtein = dinnerData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerFat = dinnerData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerFiber = dinnerData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerIron = dinnerData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerCalcium = dinnerData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerVitaminC = dinnerData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //total for 7 days
    const totalCalorieValue = filterData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = filterData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = filterData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = filterData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = filterData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = filterData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = filterData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = filterData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //response data
    const responseData = {
      breakfast: {
        foodData: breakfastData,
        totalBreakfastCalorieValue,
        totalBreakfastCalcium,
        totalBreakfastCarbs,
        totalBreakfastProtein,
        totalBreakfastIron,
        totalBreakfastFiber,
        totalBreakfastVitaminC,
        totalBreakfastFat,
      },
      lunch: {
        foodData: lunchData,
        totalLunchCalcium,
        totalLunchCalorieValue,
        totalLunchCarbs,
        totalLunchFat,
        totalLunchFiber,
        totalLunchIron,
        totalLunchProtein,
        totalLunchVitaminC,
      },
      snacks: {
        foodData: snacksData,
        totalSnacksCalcium,
        totalSnacksCalorieValue,
        totalSnacksCarbs,
        totalSnacksFat,
        totalSnacksFiber,
        totalSnacksIron,
        totalSnacksProtein,
        totalSnacksVitaminC,
      },
      dinner: {
        foodData: dinnerData,
        totalDinnerCalcium,
        totalDinnerCalorieValue,
        totalDinnerCarbs,
        totalDinnerFat,
        totalDinnerFiber,
        totalDinnerIron,
        totalDinnerProtein,
        totalDinnerVitaminC,
      },
      totalCalcium,
      totalCalorieValue,
      totalVitaminC,
      totalIron,
      totalFiber,
      totalFat,
      totalProtein,
      totalCarbs,
    };
    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "List generated!!!"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}
async function customDateDaysData(req, res) {
  const userId = req.user.id;
  const date1 = req.query.date1;
  const date2 = req.query.date2;

  // console.log(new Date(date1.split('T')[0]))
  //   const date = new Date();
  //   const sevenDataBack = new Date(new Date().setDate(new Date().getDate() - 30));
  try {
    const loggedFood = await LoggedFood.find({ userId: userId });
    const filterData = loggedFood.filter((item) => {
        
      return (
        new Date(item.createdAt.toISOString().split("T")[0]) >= new Date(date1) &&
        new Date(item.createdAt.toISOString().split("T")[0]) <= new Date(date2) 
      );
     
    });
    // console.log(filterData)
    const breakfastData = filterData?.filter(
      (item) => item.mealTime === "Breakfast"
    );
    const totalBreakfastCalorieValue = breakfastData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastCarbs = breakfastData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastProtein = breakfastData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastFat = breakfastData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastFiber = breakfastData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastIron = breakfastData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastCalcium = breakfastData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalBreakfastVitaminC = breakfastData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    const lunchData = filterData?.filter((item) => item.mealTime === "Lunch");
    const totalLunchCalorieValue = lunchData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchCarbs = lunchData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchProtein = lunchData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchFat = lunchData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchFiber = lunchData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchIron = lunchData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchCalcium = lunchData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalLunchVitaminC = lunchData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);
    const snacksData = filterData?.filter((item) => item.mealTime === "Snacks");

    const totalSnacksCalorieValue = snacksData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksCarbs = snacksData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksProtein = snacksData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksFat = snacksData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksFiber = snacksData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksIron = snacksData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksCalcium = snacksData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalSnacksVitaminC = snacksData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //dinner
    const dinnerData = filterData?.filter(
      (item) => item.mealTime === "Dinnter"
    );
    const totalDinnerCalorieValue = dinnerData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerCarbs = dinnerData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerProtein = dinnerData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerFat = dinnerData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerFiber = dinnerData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerIron = dinnerData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerCalcium = dinnerData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalDinnerVitaminC = dinnerData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //total for 7 days
    const totalCalorieValue = filterData
      ?.map((item) => item?.foodData?.calorieValue)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCarbs = filterData
      ?.map((item) => item?.foodData?.carbs)
      .reduce((acc, amount) => acc + amount, 0);
    const totalProtein = filterData
      ?.map((item) => item?.foodData?.protein)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFat = filterData
      ?.map((item) => item?.foodData?.fat)
      .reduce((acc, amount) => acc + amount, 0);
    const totalFiber = filterData
      ?.map((item) => item?.foodData?.fibre)
      .reduce((acc, amount) => acc + amount, 0);
    const totalIron = filterData
      ?.map((item) => item?.foodData?.iron)
      .reduce((acc, amount) => acc + amount, 0);
    const totalCalcium = filterData
      ?.map((item) => item?.foodData?.calcium)
      .reduce((acc, amount) => acc + amount, 0);
    const totalVitaminC = filterData
      ?.map((item) => item?.foodData?.vitaminC)
      .reduce((acc, amount) => acc + amount, 0);

    //response data
    const responseData = {
      breakfast: {
        foodData: breakfastData,
        totalBreakfastCalorieValue,
        totalBreakfastCalcium,
        totalBreakfastCarbs,
        totalBreakfastProtein,
        totalBreakfastIron,
        totalBreakfastFiber,
        totalBreakfastVitaminC,
        totalBreakfastFat,
      },
      lunch: {
        foodData: lunchData,
        totalLunchCalcium,
        totalLunchCalorieValue,
        totalLunchCarbs,
        totalLunchFat,
        totalLunchFiber,
        totalLunchIron,
        totalLunchProtein,
        totalLunchVitaminC,
      },
      snacks: {
        foodData: snacksData,
        totalSnacksCalcium,
        totalSnacksCalorieValue,
        totalSnacksCarbs,
        totalSnacksFat,
        totalSnacksFiber,
        totalSnacksIron,
        totalSnacksProtein,
        totalSnacksVitaminC,
      },
      dinner: {
        foodData: dinnerData,
        totalDinnerCalcium,
        totalDinnerCalorieValue,
        totalDinnerCarbs,
        totalDinnerFat,
        totalDinnerFiber,
        totalDinnerIron,
        totalDinnerProtein,
        totalDinnerVitaminC,
      },
      totalCalcium,
      totalCalorieValue,
      totalVitaminC,
      totalIron,
      totalFiber,
      totalFat,
      totalProtein,
      totalCarbs,
    };
    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "List generated!!!"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}

export { sevenDaysData, fourteenDaysData, thirtyDaysData, customDateDaysData };
