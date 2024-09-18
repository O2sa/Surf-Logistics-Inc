import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT, verifyJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  let user;
  if (isFirstAccount) {
    user = await User.create({ ...req.body, role: "admin" });
  } else {
    user = await User.create(req.body);
  }

  const token = createJWT({ userId: user._id });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",

    // sameSite: 'None', // This allows the cookie to be sent cross-origin
  });

  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // const testUser = userId === "64b2c07ccac2efc972ab0eca";
  let isAuthenticated = true;

  if (!token) {
    isAuthenticated = false;
  } else {
    const { userId } = verifyJWT(token);
    const user = await User.findById(userId).select("-password");

    if (!user) isAuthenticated = false;
  }
  res.status(StatusCodes.OK).json({ isAuthenticated: isAuthenticated });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("password");

  // console.log("user", user);
  // console.log("body", req.body);

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("Invalid data!");

  const token = createJWT({ userId: user._id });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",

    // sameSite: 'None', // This allows the cookie to be sent cross-origin
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in", role: user.__t });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
