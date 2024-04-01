import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Connection Successfull: ${connection.connection.db.databaseName}`
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDB;
