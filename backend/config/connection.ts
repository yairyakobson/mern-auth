import "colors"
import "dotenv/config";
import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

export const connectDB = async() =>{
  const connect = await mongoose.connect(MONGO_URI);
  console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
}