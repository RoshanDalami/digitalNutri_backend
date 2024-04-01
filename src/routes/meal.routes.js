import express  from "express";
import { mealController } from "../controllers/meal.controller.js"

const router = express.Router();

router.route('/').get(mealController);

export default router;
