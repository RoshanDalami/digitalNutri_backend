import express from "express";
import { validateToken } from "../middlewares/verifyToken.js";
import {sevenDaysData , fourteenDaysData ,thirtyDaysData,customDateDaysData } from '../controllers/filter.controller.js';
const FilterRoute = express.Router()



FilterRoute.route('/sevenDaysData').get(validateToken,sevenDaysData)
FilterRoute.route('/fourteenDaysData').get(validateToken,fourteenDaysData)
FilterRoute.route('/thirtyDaysData').get(validateToken,thirtyDaysData)
FilterRoute.route('/customDateDaysData').get(validateToken,customDateDaysData)


export {FilterRoute}