import express from "express";
import { CreatePaymentRecord } from '../controllers/payment.controller.js'
import { validateToken } from "../middlewares/verifyToken.js";

const PaymentRoutes = express.Router();
PaymentRoutes.route('/createPayment').post(CreatePaymentRecord);
export default PaymentRoutes