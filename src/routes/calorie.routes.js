import express from "express";
import { validateToken } from '../middlewares/verifyToken.js';
import { calculateCalorie, getCalorie, changeCalorie } from "../controllers/calorie.controller.js";
import { updatedCalorieUpload, getUpdatedCalorie } from "../controllers/adjustedCalorie.controller.js";

const router = express.Router();

router.route("/calculate").post(validateToken,calculateCalorie);
router.route("/getCaorie").get(validateToken, getCalorie);
router.route("/adjustValue").post(validateToken, updatedCalorieUpload);
router.route("/adjustValue").get(validateToken, getUpdatedCalorie);

export default router;
