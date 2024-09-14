import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide name"],
    },
    company: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Please provide name"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
