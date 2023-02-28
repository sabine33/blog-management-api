import { Router } from "express";
const router = Router();
const swaggerUi = require("swagger-ui-express");
import * as swaggerDocument from "../../swagger.json";

export default () => {
  var options = {
    explorer: true,
  };
  router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
  router.get("/", swaggerUi.setup(swaggerDocument, options));
  return router;
};
