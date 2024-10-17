import { connectDB } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/models/delieveryPartnerModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  let success = false;
  let result = null; 

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(connectDB);
  }

  const user = new deliveryPartnerSchema(payload);

  try {
    result = await user.save();
    if (result) {
      success = true;
    }
  } catch (error) {
    return NextResponse.json({ error: "Error saving user", success: false });
  }

  return NextResponse.json({ result, success });
}
