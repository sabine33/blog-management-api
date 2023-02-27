import { Request, Response, NextFunction } from "express";

class HelloController {
  async index(req, res, next) {
    res.success({ message: "Hello From Blog API.", data: null });
  }
  async error(req, res, next) {
    res.error({ message: "Unknown error occured.", errors: ["No Error"] });
  }
}

export default new HelloController();
