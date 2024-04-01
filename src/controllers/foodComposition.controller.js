import { FoodComposition } from '../models/foodComposition.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getFoodComposition = async (req, res) => {
    try{
          const foodComposition = await FoodComposition.find();
          res.status(200).json(new ApiResponse(200, foodComposition, "Success"));
      }catch(e){
          console.log(e);
      }
  }

export { getFoodComposition };