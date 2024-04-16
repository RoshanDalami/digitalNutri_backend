import { UserActivity } from "../constant.js";
import { Calorie } from "../models/calorie.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const calculateCalorie = async (req, res) => {
  try {
    // Calculate calorie
    // Take input values
    const {
      weight,
      weightUnit,
      height,
      heightUnit,
      age,
      gender,
      activity,
      pregnancy,
      isLactate,
      lactationPeriod,
      targetWeight,
    } = req.body;

    // Checks if null
    if (
      !weight ||
      !weightUnit ||
      !height ||
      !heightUnit ||
      !age ||
      !gender ||
      !activity
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Calorie.deleteMany({ userId: req.user.id });

    // Conversion functions
    const convertWeight = (weight, weightUnit) =>
      weightUnit.toLowerCase() === "pound" ? weight * 0.4535924 : weight;
    const convertHeight = (height, heightUnit) =>
      heightUnit.toLowerCase() === "feet" ? height * 30.48 : height;

    // Calculate BMR
    const isFemale = gender.toLowerCase() === "female";
    const bmrValue = isFemale
      ? 10 * convertWeight(weight, weightUnit) +
        6.25 * convertHeight(height, heightUnit) -
        5 * age -
        161
      : 10 * convertWeight(weight, weightUnit) +
        6.25 * convertHeight(height, heightUnit) -
        5 * age +
        5;

    // Calculate Calorie Requirement
    let calorieRequirement = calorieCalculate(bmrValue, activity);

    if (pregnancy.toLowerCase() === "true") {
      calorieRequirement += 350;
    } else if (isLactate.toLowerCase() === "true") {
      calorieRequirement += lactationPeriod < 6 ? 600 : 520;
    } else {
    }

    // Create Calorie entry
    const calorieValue = await Calorie.create({
      userId: req.user.id,
      weight,
      height,
      age,
      gender,
      activity,
      pregnancy,
      isLactate,
      lactationPeriod,
      calorieRequirement,
      targetWeight,
    });

    res.status(201).json(new ApiResponse(200, calorieValue, "Created"));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

// Calculate Calorie
const calorieCalculate = (bmr, activity) => {
  switch (activity) {
    case "Sedentary":
      return bmr * UserActivity.Sedentary;

    case "Moderate":
      return bmr * UserActivity.Moderate;

    case "Light":
      return bmr * UserActivity.Light;

    case "Very":
      return bmr * UserActivity.Very;

    case "Extra":
      return bmr * UserActivity.Extra;

    default:
      console.log("Invalid activity value");
      return 0;
  }
};

const getCalorie = async (req, res) => {
  try {
    const userId = req.user.id;
    const calorie = await Calorie.find({ userId });
    res.status(200).json(new ApiResponse(200, calorie, "This is "));
  } catch (e) {
    console.log(e);
  }
};

const changeCalorie = async (req, res) => {
  try {
    const values = await Calorie.findOne({ userId: req.user.id });
    console.log(req.body);
    const {
      weight,
      height,
      age,
      gender,
      activity,
      pregnancy,
      isLactate,
      lactationPeriod,
      calorieRequirement,
      targetWeight,
    } = req.body;
    // const toUpdate = {
    //   userId: req.user.id,
    //   weight,
    //   height,
    //   age,
    //   gender,
    //   activity,
    //   pregnancy,
    //   isLactate,
    //   lactationPeriod,
    //   calorieRequirement: adjustedValue,
    //   targetWeight,
    // }

    const updatedCalorie = await Calorie.findByIdAndUpdate(values, {
      userId: req.user.id,
      weight,
      height,
      age,
      gender,
      activity,
      pregnancy,
      isLactate,
      lactationPeriod,
      calorieRequirement,
      targetWeight,
    });

    res.status(201).json(new ApiResponse(200, updatedCalorie, "Updated"));
  } catch (e) {
    console.error(e);
  }
};
const updateAge = async (req, res) => {
  try {
    const { age } = req.body;
    const userId = req.user.id
    const response = await Calorie.findOneAndUpdate(
     {$and: [{userId:userId}]},
      {
        $set: { age: age },
      },
      { new: true }
    );
    if(!response){
      return res.status(400).json(new ApiResponse(400,null,'No Data available'))
    }
    return res.status(200).json(new ApiResponse(200, response, "Age updated"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
const updateHeight = async (req, res) => {
  try {
    const { height } = req.body;
    const userId = req.user.id;
    const response = await Calorie.findOneAndUpdate(
      { userId:userId },
      {
        $set: { height: height },
      },
      { new: true }
    );
    return res.status(200).json(new ApiResponse(200, response, "Age updated"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
const updateWeight = async (req, res) => {
  try {
    const { weight } = req.body;
    const userId = req.user.id
    const response = await Calorie.findOneAndUpdate(
      { userId: userId },
      {
        $set: { weight: weight },
      },
      { new: true }
    );
    return res.status(200).json(new ApiResponse(200, response, "Age updated"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
const updateTargetWeight = async (req, res) => {
  try {
    const { targetWeight } = req.body;
    const userId = req.user.id
    const response = await Calorie.findOneAndUpdate(
      { userId: userId },
      {
        $set: { targetWeight: targetWeight },
      },
      { new: true }
    );
    return res.status(200).json(new ApiResponse(200, response, "Age updated"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

const updateActivity = async(req,res)=>{
  try {
    const { activity } = req.body;
    const userId = req.user.id
    const response = await Calorie.findOneAndUpdate(
      { userId:userId },
      {
        $set: { activity: activity },
      },
      { new: true }
    );
    return res.status(200).json(new ApiResponse(200, response, "Age updated"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}

export {
  calculateCalorie,
  getCalorie,
  changeCalorie,
  updateAge,
  updateHeight,
  updateWeight,
  updateTargetWeight,
  updateActivity
};
