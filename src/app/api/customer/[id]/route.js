import { connectDB } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/models/foodsModel";
import { restaurantSchema } from "@/app/lib/models/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    const id =content.params.id;
    await mongoose.connect(connectDB)

    const restaurantDetails=await restaurantSchema.findOne({_id:id})
    const foodItemsFromRestaurant=await foodSchema.find({resto_id:id})
    return NextResponse.json({restaurantDetails,foodItemsFromRestaurant,success:true})
    
}