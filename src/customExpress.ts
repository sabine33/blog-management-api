import { ErrorType, SuccessType } from "./types";
import { SuccessResponse, ErrorResponse } from "./types/express";

export default {
  success: {
    value: function (success: SuccessType) {
      const successResponse = new SuccessResponse(success);
      return this.status(successResponse.response.statusCode || 200).json(
        successResponse.response
      );
    },
  },
  error: {
    value: function (error: ErrorType) {
      const errorResponse = new ErrorResponse(error);
      return this.status(errorResponse.response.statusCode || 400).json({
        status: errorResponse.response.status || false,
        ...errorResponse.response,
      });
    },
  },
};
