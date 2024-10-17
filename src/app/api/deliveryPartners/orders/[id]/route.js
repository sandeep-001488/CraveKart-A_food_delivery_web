// import { connectDB } from "@/app/lib/db";
// import { orderSchema } from "@/app/lib/models/ordersModels";
// import { restaurantSchema } from "@/app/lib/models/RestaurantModel";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const payload = await request.json();
//   await mongoose.connect(connectDB);
//   let success = false;

//   const order = new orderSchema(payload);
//   const result = await order.save();

//   if (result) {
//     success = true;
//   }
//   return NextResponse.json({ result, success });
// }

// export async function GET(request,content) {
//   let success = false;
//   let  deliveryBoyId=content.params.id
//   await mongoose.connect(connectDB);

//   let result = await orderSchema.find({ deliveryBoy_id: deliveryBoyId});

//   if (result) {
//     let restoData = await Promise.all(
//       result.map(async (item) => {
//         let restoInfo = {};
//         restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
//         restoInfo.amount = item.amount;
//         restoInfo.status = item.status;
//         return restoInfo;
//       })
//     );
//     result = restoData;
//     success = true;
//   }

//   return NextResponse.json({ result, success });
// }

import { connectDB } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/models/ordersModels";
import { restaurantSchema } from "@/app/lib/models/RestaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ObjectId } from "mongoose";

// POST request handler for creating an order
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

// GET request handler for fetching delivery partner's orders
export async function GET(request, content) {
  let success = false;
  const deliveryBoyId = content.params.id;

  // Validate if deliveryBoyId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
    return NextResponse.json({
      success: false,
      message: "Invalid deliveryBoyId provided.",
    });
  }

  await mongoose.connect(connectDB);

  // Fetch orders for the delivery partner
  let result = await orderSchema.find({
    deliveryBoy_id: deliveryBoyId,
  });

  if (result.length > 0) {
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
