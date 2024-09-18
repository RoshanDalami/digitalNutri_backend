import { AdjustedCalorie } from "../models/adjustedCalorie.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Calorie } from "../models/calorie.model.js";
import { User } from "../models/user.model.js";
const updatedCalorieUpload = async (req, res) => {
  try {
    const { weightGoal, weightGoalValue, isDiabetic, adjustedCalorieValue } =
      req.body;
    console.log(weightGoal, weightGoalValue, isDiabetic, adjustedCalorieValue)
    if (!weightGoal || !weightGoalValue || !isDiabetic) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    let carbsInGram
    await AdjustedCalorie.deleteMany({ userId: req.user.id });
      if(isDiabetic == 'true'){
        carbsInGram = ((45 / 100) * adjustedCalorieValue) / 4;
      }else{
        carbsInGram = 0
      }
    const adjustedValues = await AdjustedCalorie.create({
      userId: req.user.id,
      weightGoal,
      weightGoalValue,
      isDiabetic,
      adjustedCalorieValue,
      carbsInGram:carbsInGram
    });

    if(adjustedValues){
      await User.findOneAndUpdate({_id:req.user.id},{
        $set:{
          isTargetSet:true
        }
      })
    }

    res.status(201).json(new ApiResponse(200, adjustedValues, "Created"));
  } catch (e) {
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

const getUpdatedCalorie = async (req, res) => {
  try {
    const userId = req.user.id;
    const adjustedValues = await AdjustedCalorie.find({ userId });

    res.status(201).json(new ApiResponse(200, adjustedValues, "Success"));
  } catch (e) {
    console.log(e);
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
const updateDiabetic = async (req, res) => {
  try {
    const { isDiabetic } = req.body;
    console.log(typeof isDiabetic);
    if (isDiabetic === true) {
      const response = await AdjustedCalorie.findOne({ userId: req.user.id });
      const requiredCalore = await Calorie.findOne({userId:req.user.id})
      console.log(requiredCalore.calorieRequirement)
      const carbsIngram = ((45 / 100) * response.adjustedCalorieValue) / 4;
      const updated = await AdjustedCalorie.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: { isDiabetic: isDiabetic, carbsInGram: carbsIngram },
        },
        { new: true }
      );
      return res.status(200).json(new ApiResponse(200, updated, "updated"));
    }
    const response = await AdjustedCalorie.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: { isDiabetic: isDiabetic, carbsInGram: 0 },
      },
      { new: true }
    );
    return res.status(200).json(new ApiResponse(200, response, "diabetic"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

const updateWeightGoal = async (req, res) => {
  const userId = req.user.id;
  const { weightGoal, weightGoalValue } = req.body;
  try {
    const calories = await Calorie.findOne({ userId });

    const weight = calories.weight;
    const targetWeight = calories.targetWeight;
    
    if (targetWeight == weight) {
      const response = await AdjustedCalorie.findOneAndUpdate(
        { userId },
        {
          $set: {
            weightGoal: "Maintenance",
            adjustedCalorieValue: parseInt(calories?.calorieRequirement),
            weightGoalValue: "",
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json(
          new ApiResponse(200, response, "Weight goal updated successfully")
        );
    } else if (targetWeight > weight) {
      console.log(weightGoalValue?.split(" ")[0] == "1")
      console.log(typeof(calories.calorieRequirement))
      const adjustedCalorieValue =
        (weightGoalValue?.split(" ")[0] == "1")
          ? parseInt(calories.calorieRequirement) + 1000
          : parseInt(calories.calorieRequirement) + 500;
          
      const response = await AdjustedCalorie.findOneAndUpdate(
        { userId },
        {
          $set: {
            weightGoal: "Gain",
            adjustedCalorieValue: adjustedCalorieValue,
            weightGoalValue: weightGoalValue,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json(
          new ApiResponse(200, response, "Weight goal updated successfully")
        );
    } else {
      const adjustedCalorieValue =
        weightGoalValue.split(" ")[0] == "1"
          ? parseInt(calories.calorieRequirement) - 1000
          : parseInt(calories.calorieRequirement) - 500;
      const response = await AdjustedCalorie.findOneAndUpdate(
        { userId },
        {
          $set: {
            weightGoal: "Lose",
            adjustedCalorieValue: adjustedCalorieValue,
            weightGoalValue: weightGoalValue,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json(
          new ApiResponse(200, response, "Weight goal updated successfully")
        );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
export {
  updatedCalorieUpload,
  getUpdatedCalorie,
  updateDiabetic,
  updateWeightGoal,
};
