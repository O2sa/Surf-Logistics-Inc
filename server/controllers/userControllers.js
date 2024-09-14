import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).select("-password");

  res.status(StatusCodes.OK).json(user);
};

export const updateUser = async (req, res) => {
  const { lastName, firstName, company, phone} = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { firstName, lastName, company,phone },
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json();
};

export const changePss = async (req, res) => {
  const user = await User.findById(req.user._id);
  const isValidUser =
    user &&
    (await comparePassword(req.body.oldPassword, user.password)) &&
    req.body.password === req.body.confirmPassword;
  if (!isValidUser) throw new UnauthenticatedError("البيانات غير صحيحة!");
  const hashedPassword = await hashPassword(req.body.password);

  await User.findByIdAndUpdate(user._id, { password: hashedPassword });
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json(updateUser);
};
