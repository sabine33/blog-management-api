import { SuccessType, ErrorType, ResponseType } from "@/types";

export class SuccessResponse {
  _response: SuccessType;
  constructor(response: SuccessType) {
    this._response = {
      status: true,
      statusCode: response.statusCode || 200,
      data: Array.isArray(response.data)
        ? response.data
        : { ...response.data } || "{}",
      message: response.message || "Success",
    };
  }
  public get response(): SuccessType {
    return this._response;
  }
}

export class ErrorResponse {
  _response: ErrorType;
  constructor(response: ErrorType) {
    this._response = {
      status: false,
      statusCode: response.statusCode || 400,
      message: response.message || "Error Occured",
      errors: [response.errors || "Error Occured."],
    };
  }

  public get response(): ErrorType {
    return this.response;
  }
}
