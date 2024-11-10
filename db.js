import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbString = process.env.DB;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbString);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with a failure code
  }
};

export default connectDB;
