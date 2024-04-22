import express from "express";
import { validateToken } from '../middlewares/verifyToken.js';
import { calculateCalorie, getCalorie, changeCalorie , updateAge , updateHeight, updateWeight , updateTargetWeight , updateActivity , updateGender } from "../controllers/calorie.controller.js";
import { updatedCalorieUpload, getUpdatedCalorie } from "../controllers/adjustedCalorie.controller.js";

const router = express.Router();

router.route("/calculate").post(validateToken,calculateCalorie);
router.route("/getCaorie").get(validateToken, getCalorie);
router.route("/adjustValue").post(validateToken, updatedCalorieUpload);
router.route("/adjustValue").get(validateToken, getUpdatedCalorie);
router.route("/updateAge").post(validateToken,updateAge)
router.route("/updateHeight").post(validateToken,updateHeight)
router.route("/updateWeight").post(validateToken,updateWeight)
router.route("/updateTargetWeight").post(validateToken,updateTargetWeight)
router.route("/updateActivity").post(validateToken,updateActivity)
router.route("/updateGender").post(validateToken,updateGender)

export default router;
