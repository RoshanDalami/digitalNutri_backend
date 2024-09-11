import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sendMail, sendMailForgotPassword } from "../utils/mailer.js";
import { Code } from "../models/code.model.js";

const sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ $or: [{ email: email }] });
    if (userExist) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "User already exist with this email"));
    }
    const mail = await sendMail(email);
    if (!mail)
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Code sending Failed"));
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Code sent to email"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, username, mobile, password, role } = req.body;

    //Validat for all fields not to be empty
    if (!email || !username || !mobile || !password) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    //Check if the user already exists
    const existedUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existedUser) {
      res.status(409).json({
        message: "User with same email, username or mobile already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //Creating the user
    const user = await User.create({
      email,
      username,
      mobile,
      password: hashedPassword,
      role,
    });

    //Removing password field in response
    const createdUser = await User.findById(user._id).select("-password");

    //Check if user is created or not
    if (!createdUser) {
      res.status(500).json({
        message: "Somthing went wrong while registering user",
      });
    }
    const accessToken = await jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          mobile: user.mobile,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );
    //Returning the registered user
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { token: accessToken, user: createdUser },
          "Signup Successfull"
        )
      );
  } catch (err) {
    console.log(err);
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User does not exists",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid Email or password ",
      });
    } else {
      //Sign user with jwt
      const userWOPassword = await User.findById(user._id).select("-password");
      const accessToken = await jwt.sign(
        {
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            mobile: user.mobile,
            role: user.role,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "30d" }
      );
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { token: accessToken, user: userWOPassword },
            "Login Successfull"
          )
        );
    }
  } catch (err) {
    console.log(err);
  }
};

//Singout user
const singOut = async (req, res) => {
  try {
  } catch (e) {
    console.log(err);
  }
};

//Test Data
const currentUser = async (req, res) => {
  res.json({ message: "Get all users" });
};
//verify code .
const verify = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token, "Verify");
    if (!token)
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Token not found"));

    const currentDate = Date.now();

    // Query to check if the token exists and is still valid
    const user = await Code.findOne({
      $and: [
        { code: token },
        {
          validTime: {
            $gt: currentDate, // Token should be valid if the validTime is greater than current time
          },
        },
      ],
    });

    console.log(user); // Check what this returns

    if (!user) throw new ApiError(400, "Invalid or Expired Verification Code");

    return res.status(200).json(new ApiResponse(200, null, "Verified"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          null,
          error.message || "Internal Server Error"
        )
      );
  }
};

const sendVerificationCode = async (req, res) => {
  try {
    function generateOTP() {
      const otp = Math.floor(100000 + Math.random() * 900000);
      return otp.toString();
    }

    const hashedToken = generateOTP();
    await sendMail();
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

//Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const isUserExist = await User.findOne({ email: email });
    if (!isUserExist)
      throw new ApiError(400, "User doesn't exit with this email");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const changedPassword = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    if (!changedPassword)
      throw new ApiError(400, "Error while changing password");

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Password changed successfully"));
  } catch (error) {
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, null, error.message));
  }
};
const updateUserName = async (req, res) => {
  try {
    const { username } = req.body;
    const id = req.user.id;
    const response = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { username: username } },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Username updated successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

const checkUserWithEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) throw new ApiError(400, "User not found !!!");
    const mail = await sendMailForgotPassword(email);
    if (!mail) throw new ApiError(400, "Error while sending email");
    return res
      .status(200)
      .json(new ApiResponse(200, null, "User Found and OTP send successfully"));
  } catch (error) {
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, null, error.message));
  }
};
export {
  registerUser,
  loginUser,
  currentUser,
  singOut,
  forgotPassword,
  updateUserName,
  verify,
  sendVerificationCode,
  sendCode,
  checkUserWithEmail,
};
