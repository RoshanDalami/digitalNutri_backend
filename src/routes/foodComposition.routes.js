import express from "express";
// import { validateToken } from '../middlewares/verifyToken.js';
import { getFoodComposition } from "../controllers/foodComposition.controller.js";

const router = express.Router();

router.route("/getFoodComposition").get(getFoodComposition);

export default router;
