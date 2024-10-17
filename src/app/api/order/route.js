import { connectDB } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/models/ordersModels";
import { restaurantSchema } from "@/app/lib/models/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectDB);
  let success = false;

  const order = new orderSchema(payload);
  const result = await order.save();

  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function GET(request) {
  let success = false;
  let userId = request.nextUrl.searchParams.get("id");
  await mongoose.connect(connectDB);

  let result = await orderSchema.find({ user_id: userId });

  if (result) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        return restoInfo;
      })
    );
    result = restoData;
    success = true;
  }

  return NextResponse.json({ result, success });
}
