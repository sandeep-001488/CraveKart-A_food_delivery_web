import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";
import mongoose from "mongoose";
import { connectDB } from "@/app/lib/db"; // Correct path to your database connection
import { paymentSchema } from "@/app/lib/models/paymentMode"; // Assuming you have defined a payment schema model

// Razorpay instance initialization with correct environment variables
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET, // Corrected this to match your env variable name
});

export async function POST(req) {
  try {
    // Parse the request body to get the Razorpay payment details
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    // Create the signature string to validate the response from Razorpay
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log("ID and Payment ID Body:", body);

    // Generate the expected signature using HMAC SHA256 and your Razorpay secret
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("Expected Signature:", expectedSignature);

    // Compare the generated signature with the received signature
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Connect to MongoDB
      await connectDB();

      // Create a new payment record in the database
      const paymentRecord = await paymentSchema.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      console.log("Payment record saved:", paymentRecord);

      // Redirect to the payment success page after saving the payment record
      return NextResponse.redirect(new URL("/paymentsuccess", req.url));
    } else {
      // Return failure response if the signature is not authentic
      return NextResponse.json(
        {
          message: "Payment verification failed",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error processing payment:", error);

    // Return error response if something went wrong
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
