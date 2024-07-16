import express from "express";
import {
  GetUserList,
  GetAdjustedCalorieOfUser,
  getTotalValuesForBreakfastByUser,
  getTotalValuesForLunchByUser,
  getTotalValuesForSnacksByUser,
  getTotalValuesForDinnerByUser,
} from "../controllers/admin.controller.js";
import { CreateFoodComposition , DeleteFoodComposition ,GetFoodCompositionById} from "../controllers/foodComposition.controller.js";
import {
    CreatePormoCode,
    GetPromoCodeList,
    GetPromoCodeById,
    DeletePromoCode
} from '../controllers/promo.controller.js'
import { validateToken } from "../middlewares/verifyToken.js";

const AdminRoutes = express.Router();

AdminRoutes.route("/getAllUser").get(validateToken, GetUserList);
AdminRoutes.route("/adjustedCalorieByUser/:id").get(
  validateToken,
  GetAdjustedCalorieOfUser
);
AdminRoutes.route("/totalBreakfastConsumptionByUser/:id").get(
  validateToken,
  getTotalValuesForBreakfastByUser
);
AdminRoutes.route("/totalLunchConsumptionByUser/:id").get(
  validateToken,
  getTotalValuesForLunchByUser
);
AdminRoutes.route("/totalSnacksConsumptionByUser/:id").get(
  validateToken,
  getTotalValuesForSnacksByUser
);
AdminRoutes.route("/totalDinnerConsumptionByUser/:id").get(
  validateToken,
  getTotalValuesForDinnerByUser
);

AdminRoutes.route("/createFoodComposition").post(
  validateToken,
  CreateFoodComposition
);
AdminRoutes.route("/getFoodCompositionById/:id").get(
  validateToken,
  GetFoodCompositionById
);
AdminRoutes.route("/deleteFoodComposition/:id").delete(
  validateToken,
  DeleteFoodComposition
);
AdminRoutes.route("/createPromo").post(
  validateToken,
  CreatePormoCode
);
AdminRoutes.route("/getPromoCodeList").get(
  validateToken,
  GetPromoCodeList
);
AdminRoutes.route("/getPromoCodeById/:id").get(
  validateToken,
  GetPromoCodeById
);
AdminRoutes.route("/deletePromoCode/:id").delete(
  validateToken,
  DeletePromoCode
);

export default AdminRoutes;
