import { Meals } from '../models/meals.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";

const mealController = async (req,res) => {
    try{
        const mealList = await Meals.find();
        res.status(200).json(new ApiResponse(200, mealList, "Success"));
    }catch(e){
        console.log(e);
    }
}

export { mealController };