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
      required: [true, "Please provide name"],
    },
    consultationInterest: {
      type: Date,
      required: [true, "Please provide name"],
    },
    state: {
      type: String,
      enum: [ "approved", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Consultation = mongoose.model("Consultation", consultation);

export default Consultation;
