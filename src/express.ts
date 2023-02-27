import { ErrorType, SuccessType } from "./types";

// augment the `express-serve-static-core` module
declare module "express-serve-static-core" {
  // first, declare that we are adding a method to `Response` (the interface)
  export interface Response {
    success(data: SuccessType): this;
    error(resp: ErrorType): this;
  }
}
