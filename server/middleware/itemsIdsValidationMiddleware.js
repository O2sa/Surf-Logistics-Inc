import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  InputLogicError,
} from "../errors/customErrors.js";
import mongoose from "mongoose";

import User from "../models/User.js";

import {
  returnBadRequestError,
  returnNotFound,
  returnUnauthorized,
  withValidationErrors,
} from "../errors/withValidationErrors.js";


export const validateUserIdParam = withValidationErrors([
  param("userId").custom(async (value, { req }) => {
    const elem = await User.findById(value);
    const method = req.method;

    if (!elem) returnNotFound();
    const userRole = req.user.role;

    if (userRole == "school-admin") {
      if (
        !req.user?.school.equals(elem?.school) ||
        (!isAuthorised(req.user, "users") && method !== "GET")
      )
        returnUnauthorized();
    }
  }),
]);

export const validateCurrentUserIdParam = withValidationErrors([
  param("userId").custom(async (value, { req }) => {
    const elem = await User.findById(value);

    if (!elem) returnNotFound();
    const userRole = req.user.role;

    if (!req.user._id.equals(elem._id)) returnUnauthorized();
  }),
]);
