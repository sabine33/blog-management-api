import { Response } from "express-serve-static-core";
import { response } from "express";

type ResponseType = {
  message: string;
  status?: boolean;
  statusCode?: number;
};
type ErrorType = ResponseType & {
  errors: any[];
};
type SuccessType = ResponseType & {
  data: any;
};

// augment the `express-serve-static-core` module
declare module "express-serve-static-core" {
  // first, declare that we are adding a method to `Response` (the interface)
  export interface Response {
    success(data: SuccessType): this;
    error(resp: ErrorType): this;
  }
}

response.success = function ({
  message = "",
  status = true,
  statusCode = 200,
  data,
}: SuccessType) {
  return this.json({ message, status, statusCode, data });
};

response.error = function ({
  message = "Error occured",
  status = false,
  statusCode = 400,
  errors = [],
}: ErrorType) {
  return this.json({ message, status, statusCode, errors });
};
