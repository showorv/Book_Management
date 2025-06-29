import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { CustomError } from "./CustomError";

type ValidationErrorDetail = {
  message: string;
  name: string;
  properties?:unknown;
  kind?: string;
  path?: string;
  value?: unknown;
};

type ErrorResponseType = {
  success: boolean;
  message: string;
  error: {
    name?: string;
    errors?: Record<string, ValidationErrorDetail>;
  };
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction 
) => {
  let statusCode = 500;

  const errorResponse: ErrorResponseType = {
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
        errorResponse.error.errors![key] = {
          message: validationErr.message,
          name: validationErr.name,
          properties: validationErr.properties,
          kind: validationErr.kind,
          path: validationErr.path,
          value: validationErr.value,
        };
      } else {
        errorResponse.error.errors![key] = {
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
  } else if (err && typeof err === "object" && "message" in err) {
    const error = err as { message?: string; name?: string };
    errorResponse.message = error.message || "Internal Server Error";
    errorResponse.error = {
      name: error.name || "Error",
    };
  }

  res.status(statusCode).json(errorResponse);
};
