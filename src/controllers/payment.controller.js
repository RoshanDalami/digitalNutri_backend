import { Payment } from "../models/payment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { User } from "../models/user.model.js";

export const CreatePaymentRecord = async (req, res) => {
  try {
    const {
      paymentStatus,
      userId,
      startDate,
      amountPaid,
      planDuration,
      priceBeforeDiscount,
      discountPercentage,
      code,
    } = req.body;

    if (!paymentStatus) {
      throw new ApiError(400, "Payment failed");
    }

    const startingDate = new Date(startDate);

    let expireDate = new Date(startDate);
    expireDate.setMonth(startingDate.getMonth() + planDuration);
    expireDate = JSON.stringify(expireDate).split("T")[0].slice(1);

    const newPayment = await Payment.create({
      userId: userId,
      paymentStatus: paymentStatus,
      subscriptionStartDate: startDate,
      subscriptionEndDate: expireDate,
      amountPaid: amountPaid,
      planDuration: planDuration,
      priceBeforeDiscount: priceBeforeDiscount,
      discountPercentage: discountPercentage,
      code: code?.toUpperCase(),
    });
    if (!newPayment) throw new ApiError(400, "Payment required failed");

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          isActive: true,
        },
      }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Payment recorded and user activited successfully"
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode)
      .json(new ApiError(error.statusCode, null, error.message));
  }
};

export const GetPaymentRecord = async (req, res) => {
  try {
    const response = await Payment.find({});
    return res.status(200).json(new ApiResponse(200, response, "fetched"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};
