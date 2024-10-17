const { default: mongoose } = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    foodItemIds: {
      type: String,
      required: true,
    },
    resto_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    deliveryBoy_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const orderSchema =
  mongoose.models.orders || mongoose.model("orders", orderModel);
