import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { CustomError } from "./CustomError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;

  const errorResponse: any = {
    success: false,
    message: "Something went wrong",
    error: {},
  };

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    errorResponse.message = "Validation failed";
    errorResponse.error = {
      name: err.name,
      errors: {},
    };
    for (const key in err.errors) {
      const validationErr = err.errors[key];
      if (validationErr instanceof mongoose.Error.ValidatorError) {
        errorResponse.error.errors[key] = {
          message: validationErr.message,
          name: validationErr.name,
          properties: validationErr.properties,
          kind: validationErr.kind,
          path: validationErr.path,
          value: validationErr.value,
        };
      } else {
        errorResponse.error.errors[key] = {
          message: validationErr.message,
          name: validationErr.name,
        };
      }
    }
  } else if (err instanceof CustomError) {
    statusCode = err.statusCode;
    errorResponse.message = err.message;
    errorResponse.error = {
      name: "CustomError",
    };
  } else {
    errorResponse.message = err.message || "Internal Server Error";
    errorResponse.error = {
      name: err.name || "Error",
    };
  }

  res.status(statusCode).json(errorResponse);
};
