import helloController from "@/controllers/hello.controller";
import { Request, Response, Router } from "express";

const router = Router();
export default () => {
  router.get("/", helloController.index);
  router.get("/error", helloController.error);

  return router;
};
