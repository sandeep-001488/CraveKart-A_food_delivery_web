import { connectDB } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/models/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectDB, { useNewUrlParser: true });
    console.log("connection sucessful");
    const data = await restaurantSchema.find();

    return NextResponse.json({ result: data });
  } catch (error) {
    console.log("error", error);
  }
}

export async function POST(request) {
  let payload = await request.json();
  let result;
  let success = false;
  await mongoose.connect(connectDB, { useNewUrlParser: true });

  if (payload.login) {
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    const restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true;
    }
  }
  return NextResponse.json({ result, success: true });
}
