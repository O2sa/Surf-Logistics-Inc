import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { returnUnauthorized } from "../errors/withValidationErrors.js";
import User from "../models/User.js";
import { verifyJWT } from "../utils/tokenUtils.js";
import url from "url";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError("غير مخول لك الدخول!");

  try {
    const { userId } = verifyJWT(token);
    // const testUser = userId === "64b2c07ccac2efc972ab0eca";

    const user = await User.findById(userId).select("-password");
    if (!user) {
      returnUnauthorized();
    }

    req.user = user;

    next();
  } catch (error) {
    throw new UnauthenticatedError("غير مخول لك الدخول!");
  }
};

export const authorizePermissions = (permittedRoles) => {
  return (req, res, next) => {
    const role = req.user.role;

    if (permittedRoles.includes(role)) {
      next();
    } else {
      returnUnauthorized();
    }
  };
};

export const checkTestUser = (req, res, next) => {
  const user = req.user;
  const testUsersEmail = [
    "student@test.com",
    "teacher@tech.com",
    "admin@test.com",
  ];

  const method = req.method;

  if (testUsersEmail.includes(user.email) && method !== "GET")
    returnUnauthorized();
  next();
};

function hasAnyElement(arr1, arr2) {
  // Use some() to check if at least one element passes the test
  return arr1.some((element) => arr2.includes(element));
}
