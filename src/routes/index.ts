import { Request, Router } from "express";
import helloRoutes from "./hello.route";

export default () => {
  const router = Router();
  router.use("/", helloRoutes());

  return router;
};
