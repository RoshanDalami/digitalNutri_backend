import express from "express";
import { logFoodController, getLoggedFood } from "../controllers/logFood.controller.js";
import { validateToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/logfood").post(validateToken, logFoodController);
router.route("/getLogfood").get(validateToken, getLoggedFood);

export default router;
