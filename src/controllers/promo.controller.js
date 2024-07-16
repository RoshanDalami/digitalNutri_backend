import { ApiResponse } from "../utils/ApiResponse.js";

import { Promo } from "../models/promocode.model.js";
export async function CreatePormoCode(req, res) {
  try {
    const { id, code, discount } = req.body;
    if (!code && !discount) return new Error("All fields are required");
    if (id) {
      const response = await Promo.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            code: code.toUpperCase(),
            discount: discount,
          },
        },
        { new: true }
      );
      if (!response) return new Error("Error while updating");

      return res
        .status(200)
        .json(new ApiResponse(200, response, "Updated successfully"));
    }

    const savedPromo = await Promo.create({
      code: code.toUpperCase(),
      discount: discount,
    });
    if (!savedPromo) return new Error("Error while creating promo code.");
    return res
      .status(201)
      .json(new ApiResponse(200, savedPromo, "Promo created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}

export async function GetPromoCodeList(req, res) {
  try {
    const resposne = await Promo.find({});
    return res
      .status(200)
      .json(
        new ApiResponse(200, resposne, "Promo code list generated successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
}

export async function GetPromoCodeById(req,res){
    try {
        const {id} = req.params;
        const response = await Promo.findOne({_id:id});
        return res.status(200).json(new ApiResponse(200,response,"Promo code by Id"))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500,null,"Internal Server Error"))
    }
}

export async function DeletePromoCode(req,res){
    try {
        const {id} = req.params;
        const response = await Promo.findOneAndDelete({_id:id});
        return res.status(200).json(new ApiResponse(200,response,"Deleted successfully"))
    } catch (error) {
        return res.status(500).json(new ApiResponse(500,null,"Internal Server Error"))
    }
}

// export async function Promo(req, res) {
//   try {
//     const { price, code } = req.body;
//     let priceAfterDiscount = 0;

//     for (let i = 0; i < ReferralCodes.length; i++) {
//       if (ReferralCodes[i].code === code) {
//         priceAfterDiscount = price - (price * ReferralCodes[i].discount) / 100;
//       }
//     }

//     return res
//       .status(200)
//       .json(new ApiResponse(200, priceAfterDiscount, "Promo code applied"));
//   } catch (error) {
//     return res
//       .status(500)
//       .json(new ApiResponse(500, null, "Internal Server Error"));
//   }
// }
