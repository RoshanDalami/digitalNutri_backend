import express from "express";
// import { validateToken } from '../middlewares/verifyToken.js';
import {
  getFoodComposition,
  getFoodCompositionNepali,
} from "../controllers/foodComposition.controller.js";

const router = express.Router();

router.route("/getFoodComposition").get(getFoodComposition);
router.route("/getFoodCompositionNepali").get(getFoodCompositionNepali);

export default router;
