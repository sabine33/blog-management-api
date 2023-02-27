import { CustomError } from "@/error";
import { Request, Response, NextFunction } from "express";
export const errorHandler = (app) => {
  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    return res.status(404).json({
      status: false,
      statusCode: res.statusCode || 404,
      message: "Route Not found.",
    });
  });

  /// error handlers
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({
        status: false,
        errors: [err.message],
        statusCode: res.statusCode || 401,
        message: "Unauthorized.",
      });
    }
    return next(err);
  });
  //zod error handling
  app.use((err: CustomError, req, res, next) => {
    if (err) {
      res.status(err.statusCode).json({ ...err, message: err.message });
    } else {
      next(err);
    }
  });

  //generic error handler
  app.use((err, req, res, next) => {
    return res.status(400).json({ ...err });
  });
};
