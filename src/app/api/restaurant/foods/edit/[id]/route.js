import { connectDB } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  try {
    const id = content.params.id; // Access the dynamic id here
    await mongoose.connect(connectDB);

   
    const result = await foodSchema.findOne({ _id:id });

    const success = result !== null; 

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error fetching food item:", error);
    return NextResponse.json({ result: [], success: false });
  }
}

export async function PUT(request, content) {
  try {
    const id = content.params.id; // Access the dynamic id here
    await mongoose.connect(connectDB);

    const objectId = new mongoose.Types.ObjectId(id);

    const body = await request.json(); // Assuming it's a JSON payload

    const updatedFields = {
      name: body.name,
      price: body.price,
      img_path: body.img_path,
      description: body.description,
    };

    const result = await foodSchema.updateOne(
      { _id: objectId },
      { $set: updatedFields }
    );

    const success = result.modifiedCount > 0; // Check if the document was modified

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error updating food item details", error);
    return NextResponse.json({ result: [], success: false });
  }
}