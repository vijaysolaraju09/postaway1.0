import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB is connected using mongoose");
  } catch (err) {
    console.log("Error while connecting to DB: " + err);
  }
};
