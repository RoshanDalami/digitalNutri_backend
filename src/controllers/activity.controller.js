import { Activities } from '../models/activity.model.js';
import { ApiResponse } from "../utils/ApiResponse.js";

const activityController = async (req,res) => {
    try{
        const activityList = await Activities.find();
        res.status(200).json(new ApiResponse(200, {data:activityList}, "Success"));
    }catch(e){
        console.log(e);
    }
}

export { activityController };