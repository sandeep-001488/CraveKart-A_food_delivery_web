require("dotenv").config();
const mongoose = require("mongoose");

const { NAME, PASSWORD, DB_NAME } = process.env;


export const connectDB = `mongodb+srv://${NAME}:${PASSWORD}@cluster0.hcf5r.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(connectDB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

connectToDatabase();
