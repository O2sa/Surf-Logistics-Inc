import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;

// Define the Exam schema
const message = new Schema(
  {
    name: { type: String },
    comments: { type: String },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", message);

export default Message;
