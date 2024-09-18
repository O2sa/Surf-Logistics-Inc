import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Exam schema
const quote = new Schema(
  {
    shippingOption: { type: String },
    type: { type: String },
    quantity: { type: Number },
    lenght: { type: Number },
    width: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    pickupServices: { type: String },
    deliveryServices: { type: String },
    price: {
      type: Number,
      default: null,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
      pickupPostalCode: {
        type: String,
        required: true,
      },
      pickupDate: {
        type: Date,
        required: true,
      },
      deliveryPostalCode: {
        type: String,
        required: true,
      },
      deliveryDate: {
        type: Date,
        required: true,
      },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quote);

export default Quote;
