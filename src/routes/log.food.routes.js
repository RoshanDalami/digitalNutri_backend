import express from "express";
import {  logFoodController, getLoggedFood , getValuesForBreakfast , getValuesForLunch,getValuesForSnacks,getValuesForDinner,getLoggedFoodPerDay } from "../controllers/logFood.controller.js";
import { validateToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/logfood").post(validateToken, logFoodController);
router.route("/getLogfood").get(validateToken, getLoggedFood);
router.route("/getLogfoodPerDay").get(validateToken, getLoggedFoodPerDay);
router.route('/getBreakfast').get(validateToken,getValuesForBreakfast)
router.route('/getLunch').get(validateToken,getValuesForLunch)
router.route('/getSnacks').get(validateToken,getValuesForSnacks)
router.route('/getDinner').get(validateToken,getValuesForDinner)

export default router;
