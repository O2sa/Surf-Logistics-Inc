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
  return `${name} مطلوب!`;
}

export const validateRegisterInput = withValidationErrors([
  body("lastName").notEmpty().withMessage("الإسم مطلوب"),
  body("firstName").notEmpty().withMessage("الإسم مطلوب"),
  body("phone").notEmpty().withMessage("الإسم مطلوب"),
  body("email")
    .notEmpty()
    .withMessage("الإيميل مطوب!")
    .isEmail()
    .withMessage("صيفة الإيميل غير صحيحة")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("الإيميل موجود بالفعل!");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("كلمة السر مطلوبة")
    .isLength({ min: 8 })
    .withMessage("يجب أن تحتوي كلمة السر على 8 أحرف على الأقل!"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("lastName").notEmpty().withMessage("الإسم مطلوب"),
  body("firstName").notEmpty().withMessage("الإسم مطلوب"),
 
]);



export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("الإيميل مطوب!")
    .isEmail()
    .withMessage("صيفة الإيميل غير صحيحة"),
  body("password").notEmpty().withMessage("كلمة السر مطلوبة"),
]);

export const validateNameInput = withValidationErrors([
  body("name").notEmpty().withMessage(getInvalideMsg("الأسم")),
]);
