import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected: boolean = false;

export const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    const connection = mongoose.connection;

    if (isConnected) {
      console.log("Using existing connection");
      return;
    }

    connection.on("connected", () => {
      isConnected = true;
      console.log("MongoDB connected");
    });

    connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
      process.exit(1);
    });

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected now");
    });
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
