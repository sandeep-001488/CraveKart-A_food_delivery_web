const { default: mongoose } = require("mongoose");

const deliveryPartnerModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

export const deliveryPartnerSchema =
  mongoose.models.deliverypartners ||
  mongoose.model("deliverypartners", deliveryPartnerModel);
