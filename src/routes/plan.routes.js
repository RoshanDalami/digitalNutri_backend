import express from "express";
import {
  CreatePlan,
  GetPlan,
  GetPlanById,
  updateStatus,
  GetActivePlan
} from "../controllers/plan.controller.js";
import { validateToken } from "../middlewares/verifyToken.js";
const planRoutes = express.Router();

planRoutes.route("/createPlan").post(validateToken, CreatePlan);
planRoutes.route("/getPlan").get(validateToken, GetPlan);
planRoutes.route("/getPlanById/:id").get(validateToken, GetPlanById);
planRoutes.route("/updateActiveStatus/:id").patch(validateToken, updateStatus);
planRoutes.route("/getActivePlan").get(validateToken,GetActivePlan)

export default planRoutes;
