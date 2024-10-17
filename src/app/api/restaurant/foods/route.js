import { connectDB } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  let success = false;
  const payload = await request.json();
  await mongoose.connect(connectDB, { useNewUrlParser: true });
  const foods = new foodSchema(payload);
  const result = await foods.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success: true });
}
