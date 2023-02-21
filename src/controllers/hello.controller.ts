import { Request, Response, NextFunction } from "express";

class HelloController {
  async index(req: Request, res: Response, next: NextFunction) {
    res.success({ message: "Hello From Blog API.", data: null });
  }
  async error(req: Request, res: Response, next: NextFunction) {
    res.error({ message: "Unknown error occured.", errors: ["No Error"] });
  }
}

export default new HelloController();
