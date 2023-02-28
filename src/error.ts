import { ErrorType } from "./types";

export class CustomError extends Error {
  statusCode: number;
  status: boolean;
  errors: string[];
  constructor(error: Partial<ErrorType>) {
    super(error.message);
    // this.name = this.constructor.name;
    this.errors = [error.message];
    this.status = error.status || false;
    this.statusCode = error.statusCode || 400;
  }
}
