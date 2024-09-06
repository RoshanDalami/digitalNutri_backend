import express from "express";
import {
  CreatePaymentRecord,
  GetPaymentRecord,
} from "../controllers/payment.controller.js";
import { validateToken } from "../middlewares/verifyToken.js";

const PaymentRoutes = express.Router();
PaymentRoutes.route("/createPayment").post(CreatePaymentRecord);
PaymentRoutes.route("/getAllPaymentRecord").get(
  validateToken,
  GetPaymentRecord
);
export default PaymentRoutes;
