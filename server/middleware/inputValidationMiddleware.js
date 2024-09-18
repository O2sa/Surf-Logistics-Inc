import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  InputLogicError,
} from "../errors/customErrors.js";

import User from "../models/User.js";

import {
  returnBadRequestError,
  returnNotFound,
  returnUnauthorized,
  withValidationErrors,
} from "../errors/withValidationErrors.js";

function getInvalideMsg(name) {
  return `${name} required!`;
}

export const validateRegisterInput = withValidationErrors([
  body("lastName").notEmpty().withMessage(getInvalideMsg("Last name")),
  body("firstName").notEmpty().withMessage(getInvalideMsg("First name")),
  body("phone")
    .notEmpty()
    .withMessage(getInvalideMsg("Phone number"))
    .isMobilePhone()
    .withMessage(getInvalideMsg("Phone number")),
  body("email")
    .notEmpty()
    .withMessage(getInvalideMsg("Email"))
    .isEmail()
    .withMessage(getInvalideMsg("Email"))
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exist!");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage(getInvalideMsg("Password"))
    .isLength({ min: 8 })
    .withMessage(getInvalideMsg("Password should be at least length of 8!")),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage(getInvalideMsg("Email"))
    .isEmail()
    .withMessage(getInvalideMsg("Email")),
  body("password").notEmpty().withMessage(getInvalideMsg("Password")),
]);

export const validateConsultationInput = withValidationErrors([
  body("comments")
    .notEmpty()
    .withMessage(getInvalideMsg("consultationInterest")),
  body("date")
    .notEmpty()
    .withMessage(getInvalideMsg("date"))
    // .isDate()
    // .withMessage(getInvalideMsg("Consultation"))
    .custom(async (value) => {
      if (new Date(value) < new Date()) {
        throw new BadRequestError("Date should be bigger than now!");
      }
    }),
]);

export const validateMessageInput = withValidationErrors([
  body("comments")
    .notEmpty()
    .withMessage(getInvalideMsg("comments")),
  body("name")
    .notEmpty()
    .withMessage(getInvalideMsg("name")),
  body("email")
    .notEmpty()
    .withMessage(getInvalideMsg("Email"))
    .isEmail()
    .withMessage(getInvalideMsg("Email"))
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exist!");
      }
    }),
]);

export const validateQuoteInput = withValidationErrors([
  body("shippingOption")
    .notEmpty()
    .withMessage(getInvalideMsg("shippingOption")),
  body("deliveryServices")
    .notEmpty()
    .withMessage(getInvalideMsg("deliveryServices")),
  body("pickupServices")
    .notEmpty()
    .withMessage(getInvalideMsg("pickupServices")),
  // body("deliveryPostalCode")
  //   .isPostalCode()
  //   .withMessage(getInvalideMsg("Consultation")),
  // body("pickupPostalCode")
  //   .isPostalCode()
  //   .withMessage(getInvalideMsg("Consultation")),
  body("pickupDate")
    .notEmpty()
    .withMessage(getInvalideMsg("pickup.date"))
    // .isISO()
    // .withMessage(getInvalideMsg("pickup.date"))
    .custom(async (value, { req }) => {
      if (new Date(value) < new Date()) {
        throw new BadRequestError("Date should be bigger than now!");
      }
      // console.log(req.body)
    }),
  body("deliveryDate")
    .notEmpty()
    .withMessage(getInvalideMsg("Consultation"))
    // .isDate()
    // .withMessage(getInvalideMsg("Consultation"))
    .custom(async (value, { req }) => {
      if (
        new Date(value) < new Date() ||
        value < new Date(req?.body?.pickupDate)
      ) {
        throw new BadRequestError("Date should be bigger than now!");
      }
    }),
]);

export const validateNameInput = withValidationErrors([
  body("name").notEmpty().withMessage(getInvalideMsg("الأسم")),
]);
