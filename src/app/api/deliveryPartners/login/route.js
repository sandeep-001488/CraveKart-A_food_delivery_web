import { connectDB } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/models/delieveryPartnerModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  let success = false;
  let result = null;

  const payload = await request.json();

  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(connectDB);
  }

  try {
    result = await deliveryPartnerSchema.findOne({
      mobile: payload.loginMobile,
      password: payload.loginPassword,
    });

    if (result) {
      success = true;
    }
  } catch (error) {
    return NextResponse.json({
      error: "Error during login from backend",
      success: false,
    });
  }

  return NextResponse.json({ result, success });
}
