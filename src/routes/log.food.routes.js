import express from "express";
import {
  logFoodController,
  getLoggedFood,
  getValuesForBreakfast,
  getValuesForLunch,
  getValuesForSnacks,
  getValuesForDinner,
  getLoggedFoodPerDay,
  getTotalValuesForBreakfast,
  getTotalValuesForLunch,
  getTotalValuesForSnacks,
  getTotalValuesForDinner,
} from "../controllers/logFood.controller.js";
import { validateToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/logfood").post(validateToken, logFoodController);
router.route("/getLogfood").get(validateToken, getLoggedFood);
router.route("/getLogfoodPerDay").get(validateToken, getLoggedFoodPerDay);
router.route("/getBreakfast").get(validateToken, getValuesForBreakfast);
router
  .route("/getTotalBreakfast")
  .get(validateToken, getTotalValuesForBreakfast);
router.route("/getLunch").get(validateToken, getValuesForLunch);
router.route("/getTotalLunch").get(validateToken, getTotalValuesForLunch);
router.route("/getSnacks").get(validateToken, getValuesForSnacks);
router.route("/getTotalSnacks").get(validateToken, getTotalValuesForSnacks);
router.route("/getDinner").get(validateToken, getValuesForDinner);
router.route("/getTotalDinner").get(validateToken, getTotalValuesForDinner);

export default router;
