import express from "express";
import { ErrorType, SuccessType } from "../../types/index";
import { SuccessResponse, ErrorResponse } from "../../types/express/index";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }

    interface Response {
      success(resp: ResponseType): SuccessResponse;
      error(resp: ErrorType): ErrorResponse;
    }
  }
}
