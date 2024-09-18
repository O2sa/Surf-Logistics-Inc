import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the Exam schema
const consultation = new Schema(
  {
    comments: { type: String },
    company: { type: String },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: [true, "Please provide date"],
    },
    // time: {
    //   type: String,
    //   required: [true, "Please provide name"],
    // },
    consultationInterest: {
      type: String,
      required: [true, "Please provide consultationInterest"],
    },
    state: {
      type: String,
      enum: ["approved", "pending", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Consultation = mongoose.model("Consultation", consultation);

export default Consultation;
