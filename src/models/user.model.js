import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    role:{
      type:String,
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpire: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    referredBy: {
      type: String,
    },
    isTargetSet :{
      type:Boolean,
      required:true,
      default : false
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
