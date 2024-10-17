import { connectDB } from "@/app/lib/db";
import { userSchema } from "@/app/lib/models/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  let result = null;  // Define `result` initially as `null`

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(connectDB);
  }

  const user = new userSchema(payload);

  try {
    result = await user.save();  // Assign the result of saving
    if (result) {
      success = true;
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error saving user', success: false });
  }

  return NextResponse.json({ result, success });
}