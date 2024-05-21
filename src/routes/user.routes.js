import express from "express";
import { registerUser, loginUser, currentUser, forgotPassword,updateUserName , verify } from "../controllers/user.controller.js";
import { validateToken } from "../middlewares/verifyToken.js"

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/').get(validateToken,currentUser);
router.route('/forgotPassword').post(forgotPassword)
router.route('/updateUsername').post(validateToken,updateUserName)
router.route('/verifyemail').post(verify)

export default router;
