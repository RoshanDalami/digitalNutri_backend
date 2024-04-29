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
const updateDiabetic =async (req,res)=>{
    try {
        const {isDiabetic} = req.body;
        console.log(typeof(isDiabetic))
        if(isDiabetic === true){
            const response = await AdjustedCalorie.findOne({userId:req.user.id});
            const carbsIngram = (45/100 * (response.adjustedCalorieValue))/4
           const updated =  await AdjustedCalorie.findOneAndUpdate({userId:req.user.id},{
                $set:{isDiabetic:isDiabetic,carbsInGram:carbsIngram}
            },{new:true})
            return res.status(200).json(new ApiResponse(200,updated,"updated"))

        }
        const response =  await AdjustedCalorie.findOneAndUpdate({userId:req.user.id},{
            $set:{isDiabetic:isDiabetic,carbsInGram:0}
        },{new:true})
        return res.status(200).json(new ApiResponse(200,response,'diabetic'))
    } catch (error) {
    return res.status(500).json(new ApiResponse(500,null,"Internal Server Error"))
    }
}
export { updatedCalorieUpload, getUpdatedCalorie,updateDiabetic };