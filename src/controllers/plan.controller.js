import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Plan } from "../models/plan.model.js";
export const CreatePlan = async (req, res) => {
  try {
    const { id, planTitle, planDuration, planPrice } = req.body;
    console.log(id, planTitle, planDuration, planPrice);
    if (!planTitle || !planDuration || !planPrice)
      throw new ApiError(400, "All Fields are required");

    if (id) {
      const updatedPlan = await Plan.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            planDuration: planDuration,
            planPrice: planPrice,
            planTitle: planTitle,
          },
        },
        { new: true }
      );
      if (!updatedPlan) throw new ApiError(400, "Error while updating plan");
      return res
        .status(200)
        .json(new ApiResponse(200, updatedPlan, "Plan updated successfully"));
    }

    const newPlan = await Plan.create({
      planDuration: planDuration,
      planPrice: planPrice,
      planTitle: planTitle,
    });
    if (!newPlan) throw new ApiError(400, "Error while creating plan");
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Plan created successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error"
        )
      );
  }
};

export const GetPlan = async (req, res) => {
  try {
    const response = await Plan.find();
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Plan successfully fetched"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
export const GetActivePlan = async (req, res) => {
  try {
    const response = await Plan.find({
      isActive: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Plan successfully fetched"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error"
        )
      );
  }
};

export const GetPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Plan.findOne({ _id: id });
    if (!response) throw new ApiError(400, "Error while getting plan");
    return res.status(200).json(new ApiResponse(200, response, "Plan by ids"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const resposne = await Plan.findOne({ _id: id });
    const updateStatus = await Plan.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          isActive: !resposne?.isActive,
        },
      },
      { new: true }
    );

    if (!updateStatus) throw new ApiError(400, "Error while updating status");

    return res
      .status(200)
      .json(new ApiResponse(200, updateStatus, "status updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
