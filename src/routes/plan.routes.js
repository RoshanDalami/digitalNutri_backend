import express from "express";
import {
  CreatePlan,
  GetPlan,
  GetPlanById,
  updateStatus,
} from "../controllers/plan.controller.js";
import { validateToken } from "../middlewares/verifyToken.js";
const planRoutes = express.Router();

planRoutes.route("/createPlan").post(validateToken, CreatePlan);
planRoutes.route("/getPlan").get(validateToken, GetPlan);
planRoutes.route("/getPlanById/:id").get(validateToken, GetPlanById);
planRoutes.route("/updateActiveStatus/:id").patch(validateToken, updateStatus);

export default planRoutes;
