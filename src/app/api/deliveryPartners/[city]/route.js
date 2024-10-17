import { connectDB } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/models/delieveryPartnerModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const city = content.params.city;
  let success = false;
  await mongoose.connect(connectDB);
  const filter={city:{$regex:new RegExp(city,"i")}}
  const result=await deliveryPartnerSchema.find(filter)
  return NextResponse.json({result});
}
