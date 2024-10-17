import { connectDB } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  let success = false;
  const id = content.params.id;

  try {
    await mongoose.connect(connectDB);

    const objectId = new mongoose.Types.ObjectId(id); // Correct usage

    // Find food items based on the restaurant ID (resto_id)
    const result = await foodSchema.find({ resto_id: objectId });

    if (result.length > 0) {
      success = true;
    }

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error fetching food items:", error);
    return NextResponse.json({ result: [], success: false });
  }
}

export async function DELETE(request, content) {
  try {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectDB);
    const result = await foodSchema.deleteOne({ _id: id });
    if (result.deletedCount>0) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    console.log("error while deleting item", error);

    return NextResponse.json({ result: [], success: false });
  }
}
