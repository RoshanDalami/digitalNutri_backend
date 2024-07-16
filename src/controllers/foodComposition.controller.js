import { FoodComposition } from "../models/foodComposition.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getFoodComposition = async (req, res) => {
  try {
    const foodComposition = await FoodComposition.find();
    res.status(200).json(new ApiResponse(200, foodComposition, "Success"));
  } catch (e) {
    console.log(e);
  }
};

export const CreateFoodComposition = async (req, res) => {
  try {
    const {
      id,
      foodCommodity,
      energy,
      carbohydrate,
      protein,
      fat,
      fibre,
      iron,
      calcium,
      vitaminC,
    } = req.body;

    if (id) {
      try {
        const response = await FoodComposition.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              foodCommodity,
              energy,
              carbohydrate,
              protein,
              fat,
              fibre,
              iron,
              calcium,
              vitaminC,
            },
          },
          { new: true }
        );
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              response,
              "Food composition updated successfully"
            )
          );
      } catch (error) {
        return res
          .status(200)
          .json(
            new ApiResponse(200, null, "Error while updating food composition")
          );
      }
    }

    const savedFood = await FoodComposition.create({
      foodCommodity,
      energy,
      carbohydrate,
      protein,
      fat,
      fibre,
      iron,
      calcium,
      vitaminC,
    });
    if (!savedFood)
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "Something want wrong will creating food composition"
          )
        );
    return res
      .status(200)
      .json(
        new ApiResponse(200, savedFood, "Food composition created successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error !!!"));
  }
};

export const DeleteFoodComposition = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await FoodComposition.findOneAndDelete({ _id: id });
    if (!response)
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Error will delete food composition"));
    return res
      .status(200)
      .json(
        new ApiResponse(200, null, "Food composition deleted successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const GetFoodCompositionById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await FoodComposition.findOne({ _id: id });
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Food composition by Id"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export { getFoodComposition };
