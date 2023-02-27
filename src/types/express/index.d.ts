import { ResponseType } from "@/types";
import express from "express";
import { SuccessType } from "..";

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
/**
 * Success response
 */
