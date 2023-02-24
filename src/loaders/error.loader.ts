import { Request, Response, NextFunction } from "express";
export const errorHandler = (app) => {
  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
      status: false,
      statusCode: res.statusCode || 404,
      message: "Route Not found.",
    });
  });

  /// error handlers
  app.use((err, req: Request, res: Response, next: NextFunction) => {
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
  //joi error handling
  app.use((err, req: Request, res: Response, next: NextFunction) => {
    if (err && err.error) {
      console.log(err.error);
      res.error({
        errors: [err.error.toString()],
        status: false,
        statusCode: 400,
        message: err.error?.message,
      });
    } else {
      next(err);
    }
  });

  //generic error handler
  app.use((err, req: Request, res: Response, next: NextFunction) => {
    return res.status(400).json({
      errors: [err?.message],
      statusCode: res.statusCode || 500,
      message: err?.message || "Unknown Error",
    });
  });
};
