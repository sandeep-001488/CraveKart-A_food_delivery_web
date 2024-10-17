import { connectDB } from "@/app/lib/db";
import { userSchema } from "@/app/lib/models/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  let success = false;
  let result = null;

  // Parse the request body to get the payload
  const payload = await request.json();

  // Ensure the database connection is established
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(connectDB);
  }

  try {
    result = await userSchema.findOne({
      email: payload.email,
      password: payload.password,
    });

    // If a user is found, set success to true
    if (result) {
      success = true;
    }
  } catch (error) {
    // Return a proper error response if something goes wrong
    return NextResponse.json({ error: "Error during login from backend", success: false });
  }

  return NextResponse.json({ result, success });
}
