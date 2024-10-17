
const { default: mongoose } = require("mongoose");

const foodModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img_path: String,
  description: String,
  resto_id: mongoose.Schema.Types.ObjectId, // resto_id as ObjectId
},{timestamps:true});

// Use named export, not default
export const foodSchema =
  mongoose.models.foods || mongoose.model("foods", foodModel);
