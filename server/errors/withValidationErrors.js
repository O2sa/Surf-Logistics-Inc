import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "./customErrors.js";

export const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith("not-authorized")) {
          throw new UnauthorizedError("غير مصرح لك إتمام هذه العملية!");
        }
        // if (errorMessages[0].startsWith("wrong")) {
        //   throw new UnauthorizedError("wrong input");
        // }

        // if (errorMessages[0].startsWith("teacher")) {
        //   throw new InputLogicError("wrong input");
        // }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const returnUnauthorized = () => {
  throw new UnauthorizedError("not-authorized");
};

export const returnNotFound = (value) => {
  throw new NotFoundError(`${value || "لا يوجد عنصر بهذا المعرف!"}`);
};

export const returnBadRequestError = (value) => {
  throw new BadRequestError(`${value}`);
};
