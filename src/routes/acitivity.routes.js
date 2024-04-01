import express from "express";
import { activityController } from "../controllers/activity.controller.js";

const router = express.Router();

router.route('/').get(activityController);

export default router;