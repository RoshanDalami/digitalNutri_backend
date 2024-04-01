import { AdjustedCalorie } from '../models/adjustedCalorie.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const updatedCalorieUpload = async (req, res) => {
    try{
        const { weightGoal, weightGoalValue, isDiabetic, adjustedCalorieValue } = req.body;

        if( !weightGoal || !weightGoalValue || !isDiabetic){
            return res.status(400).json({message: "All Fields are Required"});
        }

        await AdjustedCalorie.deleteMany({ userId: req.user.id });

        const adjustedValues = await AdjustedCalorie.create({
            userId: req.user.id,
            weightGoal,
            weightGoalValue,
            isDiabetic,
            adjustedCalorieValue
        });

        res.status(201).json(new ApiResponse(200, adjustedValues, "Created"));
    }
    catch(e){
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
}

const getUpdatedCalorie = async (req, res) => {
    try{
        const userId = req.user.id;
        const adjustedValues = await AdjustedCalorie.find({userId});

        res.status(201).json(new ApiResponse(200, adjustedValues, "Success"));
    }
    catch(e){
        console.log(e);
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
}

export { updatedCalorieUpload, getUpdatedCalorie };