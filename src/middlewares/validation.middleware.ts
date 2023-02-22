import { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      let errorMessages = error?.issues?.map((x) => x?.message);
      console.log(errorMessages);
      return res.error({
        statusCode: 400,
        message: errorMessages.join(" . "),
        errors: [...errorMessages],
      });
    }
  };
};
