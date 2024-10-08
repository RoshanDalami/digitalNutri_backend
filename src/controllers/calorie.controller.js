import { UserActivity } from "../constant.js";
import { Calorie } from "../models/calorie.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AdjustedCalorie } from "../models/adjustedCalorie.model.js";

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
      targetWeightUnit,
    } = req.body;
    console.log(
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
      "calculatecalorie"
    );
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
      weightUnit.toLowerCase() === "lbs" ? weight * 0.4535924 : weight;
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
    console.log(bmrValue, "BMR value");
    // Calculate Calorie Requirement
    let calorieRequirement = calorieCalculate(bmrValue, activity.trim());

    if (pregnancy.toLowerCase() === "true") {
      calorieRequirement += 350;
    } else if (isLactate.toLowerCase() === "true") {
      calorieRequirement += lactationPeriod <= 6 ? 600 : 520;
    }

    // Create Calorie entry
    const calorieValue = await Calorie.create({
      userId: req.user.id,
      weight: convertWeight(
        typeof weight === "string" ? parseInt(weight) : weight,
        weightUnit
      ),
      height: convertHeight(
        typeof height === "string" ? parseInt(height) : height,
        heightUnit
      ),
      age,
      gender,
      activity,
      pregnancy,
      isLactate,
      lactationPeriod,
      calorieRequirement,
      targetWeight: convertWeight(
        typeof targetWeight === "string"
          ? parseInt(targetWeight)
          : targetWeight,
        targetWeightUnit
      ),
      weightUnit: weightUnit,
      heightUnit: heightUnit,
      targetWeightUnit: targetWeightUnit,
    });

    return res.status(201).json(new ApiResponse(200, calorieValue, "Created"));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

// Calculate Calorie
const calorieCalculate = (bmr, activity) => {
  switch (activity) {
    case "Sedentary":
      return bmr * 1.4;

    case "Moderate":
      return bmr * 1.8;

    case "Heavy":
      return bmr * 2.3;
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
    console.log(values, "from changeCalorie");
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
    const userId = req.user.id;
    const prevStatus = await Calorie.findOne({ userId: userId });

    // Conversion functions

    const isFemale = prevStatus?.gender === "female";
    const bmrValue = isFemale
      ? 10 * prevStatus?.weight + 6.25 * prevStatus?.height - 5 * age - 161
      : 10 * prevStatus?.weight + 6.25 * prevStatus?.height - 5 * age + 5;

    // Calculate Calorie Requirement

    let calorieRequirement = calorieCalculate(bmrValue, prevStatus?.activity);
    if (prevStatus?.pregnancy === true) {
      calorieRequirement += 350;
    } else if (prevStatus?.isLactate === true) {
      calorieRequirement += prevStatus?.lactationPeriod <= 6 ? 600 : 520;
    } else {
    }

    const response = await Calorie.findOneAndUpdate(
      { $and: [{ userId: userId }] },
      {
        $set: { age: age, calorieRequirement: calorieRequirement },
      },
      { new: true }
    );
    if (!response) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "No Data available"));
    }
    if (response) {
      const adjCal = await AdjustedCalorie.findOne({ userId: req.user.id });
      const newCal = await Calorie.findOne({ userId: userId });
      if (prevStatus?.targetWeight < prevStatus?.weight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Lose",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(newCal?.calorieRequirement) - 1000
                  : parseInt(newCal?.calorieRequirement) - 500,
            },
          }
        );
      } else if (prevStatus?.targetWeight > prevStatus?.weight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Gain",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(newCal?.calorieRequirement) + 1000
                  : parseInt(newCal?.calorieRequirement) + 500,
            },
          }
        );
      } else {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Maintenance",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue: parseInt(newCal?.calorieRequirement),
            },
          }
        );
      }
    }
    if (response) {
      const adjustedCalorie = await AdjustedCalorie.findOne({
        userId: req.user.id,
      });
      if (adjustedCalorie?.isDiabetic) {
        const updating = await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              carbsInGram: (calorieRequirement * 0.45) / 4,
            },
          }
        );
      }
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
    const { height, heightUnit } = req.body;
    const userId = req.user.id;
    const prevStatus = await Calorie.findOne({ userId: userId });

    // Conversion functions
    console.log(
      height,
      heightUnit,
      heightUnit.toLowerCase(),
      heightUnit.toLowerCase() === "feet",
      "from server"
    );
    const convertHeight = (height, heightUnit) =>
      heightUnit.toLowerCase() == "feet" ? height * 30.48 : height;
    const isFemale = prevStatus?.gender == "female";
    const bmrValue = isFemale
      ? 10 * prevStatus?.weight +
        6.25 * convertHeight(height, heightUnit) -
        5 * prevStatus?.age -
        161
      : 10 * prevStatus?.weight +
        6.25 * convertHeight(height, heightUnit) -
        5 * prevStatus?.age +
        5;

    // Calculate Calorie Requirement

    let calorieRequirement = calorieCalculate(bmrValue, prevStatus?.activity);
    if (prevStatus?.pregnancy === true) {
      calorieRequirement += 350;
    } else if (prevStatus?.isLactate === true) {
      calorieRequirement += prevStatus?.lactationPeriod <= 6 ? 600 : 520;
    } else {
    }

    const response = await Calorie.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          height: convertHeight(
            typeof height === "string" ? parseInt(height) : height,
            heightUnit
          ),
          calorieRequirement: calorieRequirement,
          heightUnit: heightUnit,
        },
      },
      { new: true }
    );
    if (response) {
      const adjCal = await AdjustedCalorie.findOne({ userId: req.user.id });
      const newCal = await Calorie.findOne({ userId: userId });
      if (prevStatus?.targetWeight < prevStatus?.weight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Lose",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(newCal?.calorieRequirement) - 1000
                  : parseInt(newCal?.calorieRequirement) - 500,
            },
          }
        );
      } else if (prevStatus?.targetWeight > prevStatus?.weight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Gain",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(newCal?.calorieRequirement) + 1000
                  : parseInt(newCal?.calorieRequirement) + 500,
            },
          }
        );
      } else {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Maintenance",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue: parseInt(newCal?.calorieRequirement),
            },
          }
        );
      }
    }
    if (response) {
      const adjustedCalorie = await AdjustedCalorie.findOne({
        userId: req.user.id,
      });
      if (adjustedCalorie?.isDiabetic) {
        const updating = await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              carbsInGram: (calorieRequirement * 0.45) / 4,
            },
          }
        );
      }
    }
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
    const { weight, weightUnit } = req.body;

    const userId = req.user.id;
    const prevStatus = await Calorie.findOne({ userId: userId });

    // Conversion functions
    const convertWeight = (weight, weightUnit) =>
      weightUnit.toLowerCase() == "lbs" ? weight * 0.4535924 : weight;
    const isFemale = prevStatus?.gender === "female";
    const bmrValue = isFemale
      ? 10 * convertWeight(weight, weightUnit) +
        6.25 * prevStatus?.height -
        5 * prevStatus?.age -
        161
      : 10 * convertWeight(weight, weightUnit) +
        6.25 * prevStatus?.height -
        5 * prevStatus?.age +
        5;

    // Calculate Calorie Requirement

    let calorieRequirement = calorieCalculate(bmrValue, prevStatus?.activity);
    if (prevStatus?.pregnancy === true) {
      calorieRequirement += 350;
    } else if (prevStatus?.isLactate === true) {
      calorieRequirement += prevStatus?.lactationPeriod <= 6 ? 600 : 520;
    } else {
    }

    const response = await Calorie.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          weight: convertWeight(
            typeof weight === "string" ? parseInt(weight) : weight,
            weightUnit
          ),
          calorieRequirement: calorieRequirement,
          weightUnit: weightUnit,
        },
      },
      { new: true }
    );
    if (response) {
      const adjCal = await AdjustedCalorie.findOne({ userId: req.user.id });
      const newCal = await Calorie.findOne({ userId: userId });
      if (prevStatus?.targetWeight < weight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Lose",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(newCal?.calorieRequirement) - 1000
                  : parseInt(newCal?.calorieRequirement) - 500,
            },
          }
        );
      } else if (prevStatus?.targetWeight > weight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Gain",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(newCal?.calorieRequirement) + 1000
                  : parseInt(newCal?.calorieRequirement) + 500,
            },
          }
        );
      } else {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Maintenance",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue: parseInt(newCal?.calorieRequirement),
            },
          }
        );
      }
    }
    if (response) {
      const adjustedCalorie = await AdjustedCalorie.findOne({
        userId: req.user.id,
      });
      if (adjustedCalorie?.isDiabetic) {
        const updating = await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              carbsInGram: (calorieRequirement * 0.45) / 4,
            },
          }
        );
      }
    }
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
    const { targetWeight, weightUnit } = req.body;
    const userId = req.user.id;
    const prevStatus = await Calorie.findOne({ userId: userId });
    const convertWeight = (weight, weightUnit) =>
      weightUnit.toLowerCase() == "lbs" ? weight * 0.4535924 : weight;
    const response = await Calorie.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          targetWeight: convertWeight(
            typeof targetWeight === "string"
              ? parseInt(targetWeight)
              : targetWeight,
            weightUnit
          ),
          targetWeightUnit: weightUnit,
        },
      },
      { new: true }
    );
    if (response) {
      const adjCal = await AdjustedCalorie.findOne({ userId: req.user.id });
      if (prevStatus?.weight > targetWeight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Lose",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(prevStatus?.calorieRequirement) - 1000
                  : parseInt(prevStatus?.calorieRequirement) - 500,
            },
          }
        );
      } else if (prevStatus?.weight < targetWeight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Gain",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(prevStatus?.calorieRequirement) + 1000
                  : parseInt(prevStatus?.calorieRequirement) + 500,
            },
          }
        );
      } else {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Maintenance",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue: parseInt(prevStatus?.calorieRequirement),
            },
          }
        );
      }
    }
    if (response) {
      const adjustedCalorie = await AdjustedCalorie.findOne({
        userId: req.user.id,
      });
      if (adjustedCalorie?.isDiabetic) {
        const updating = await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              carbsInGram: (prevStatus?.calorieRequirement * 0.45) / 4,
            },
          }
        );
      }
    }
    return res.status(200).json(new ApiResponse(200, response, "Age updated"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

const updateActivity = async (req, res) => {
  try {
    const { activity, lactationPeriod } = req.body;
    const userId = req.user.id;
    const response = await Calorie.findOne({ userId: req.user.id });

    // let weightUnit = "kg";
    // let heightUnit = "feet";
    const isFemale = response?.gender === "female";
    // // Conversion functions
    // const convertWeight = (weight) =>
    //   weightUnit.toLowerCase() === "pound" ? weight * 0.4535924 : weight;
    // const convertHeight = (height) =>
    //   heightUnit.toLowerCase() === "feet" ? height * 30.48 : height;
    const bmrValue = isFemale
      ? 10 * response?.weight +
        6.25 * response?.height -
        5 * response?.age -
        161
      : 10 * response?.weight + 6.25 * response?.height - 5 * response?.age + 5;

    // Calculate Calorie Requirement

    let calorieRequirement = calorieCalculate(bmrValue, activity);

    if (response?.pregnancy === true) {
      calorieRequirement += 350;
    } else if (response?.isLactate === true) {
      calorieRequirement += prevStatus?.lactationPeriod <= 6 ? 600 : 520;
    } else {
    }
    let updateCalorie;
    if (response?.gender.toLowerCase() === "female") {
      updateCalorie = await Calorie.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: {
            activity: activity,
            calorieRequirement: calorieRequirement,
          },
        },
        { new: true }
      );
    } else {
      updateCalorie = await Calorie.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: {
            activity: activity,
            pregnancy: false,
            isLactate: false,
            calorieRequirement: calorieRequirement,
          },
        },
        { new: true }
      );
    }
    if (updateCalorie) {
      const adjCal = await AdjustedCalorie.findOne({ userId: req.user.id });
      if (response?.weight > response?.targetWeight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Lose",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(calorieRequirement) - 1000
                  : parseInt(calorieRequirement) - 500,
            },
          }
        );
      } else if (response?.weight > response?.targetWeight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Gain",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(calorieRequirement) + 1000
                  : parseInt(calorieRequirement) + 500,
            },
          }
        );
      } else {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Maintain",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue: parseInt(calorieRequirement),
            },
          }
        );
      }
    }
    if (updateCalorie) {
      const adjustedCalorie = await AdjustedCalorie.findOne({
        userId: req.user.id,
      });
      if (adjustedCalorie?.isDiabetic) {
        const updating = await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              carbsInGram: (calorieRequirement * 0.45) / 4,
            },
          }
        );
      }
    }
    return res
      .status(200)
      .json(new ApiResponse(200, updateCalorie, "Age updated"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
const updateGender = async (req, res) => {
  try {
    const { gender, pregnancy, isLactate, lactationPeriod } = req.body;
    // Calculate BMR
    const isFemale = gender.toLowerCase() === "female";
    const response = await Calorie.findOne({ userId: req.user.id });

    const bmrValue = isFemale
      ? 10 * response?.weight +
        6.25 * response?.height -
        5 * response?.age -
        161
      : 10 * response?.weight + 6.25 * response?.height - 5 * response?.age + 5;

    // Calculate Calorie Requirement

    let calorieRequirement = calorieCalculate(bmrValue, response?.activity);

    if (pregnancy === true) {
      calorieRequirement += 350;
    } else if (isLactate === true) {
      calorieRequirement += lactationPeriod <= 6 ? 600 : 520;
    } else {
    }
    let updateCalorie;
    if (gender.toLowerCase() === "female") {
      updateCalorie = await Calorie.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: {
            gender: gender,
            pregnancy: pregnancy,
            isLactate: isLactate,
            lactationPeriod: lactationPeriod,
            calorieRequirement: calorieRequirement,
          },
        },
        { new: true }
      );
    } else {
      updateCalorie = await Calorie.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: {
            gender: gender,
            pregnancy: false,
            isLactate: false,
            lactationPeriod: 0,
            calorieRequirement: calorieRequirement,
          },
        },
        { new: true }
      );
    }
    if (updateCalorie) {
      const adjCal = await AdjustedCalorie.findOne({ userId: req.user.id });
      if (response?.weight > response?.targetWeight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Lose",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(calorieRequirement) - 1000
                  : parseInt(calorieRequirement) - 500,
            },
          }
        );
      } else if (response?.weight > response?.targetWeight) {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Gain",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue:
                adjCal?.weightGoalValue?.split(" ")[0] == "1"
                  ? parseInt(calorieRequirement) + 1000
                  : parseInt(calorieRequirement) + 500,
            },
          }
        );
      } else {
        await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              weightGoal: "Maintain",
              weightGoalValue: adjCal?.weightGoalValue,
              adjustedCalorieValue: parseInt(calorieRequirement),
            },
          }
        );
      }
    }

    if (updateCalorie) {
      const adjustedCalorie = await AdjustedCalorie.findOne({
        userId: req.user.id,
      });
      if (adjustedCalorie?.isDiabetic) {
        const updating = await AdjustedCalorie.findOneAndUpdate(
          { userId: req.user.id },
          {
            $set: {
              carbsInGram: (calorieRequirement * 0.45) / 4,
            },
          }
        );
      }
    }
    return res
      .status(200)
      .json(new ApiResponse(200, updateCalorie, "Updated age"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export {
  calculateCalorie,
  getCalorie,
  changeCalorie,
  updateAge,
  updateHeight,
  updateWeight,
  updateTargetWeight,
  updateActivity,
  updateGender,
};
