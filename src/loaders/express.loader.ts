import bodyParser from "body-parser";
import express, { Request } from "express";
import cors from "cors";
import routes from "@/routes";
import config from "@/config";
require("express-async-errors");
import { errorHandler } from "./error.loader";

export default ({ app }: { app: express.Application }) => {
  app.get("/healthcheck", (req, res) => {
    res.status(200).json({ status: true });
  });

  app.enable("trust proxy");
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());

  app.use(
    bodyParser.json({
      type: "application/*.json",
    })
  );

  app.all("/media/*", (req, res, next) => {
    res.status(403).send({
      message: "Access Forbidden",
    });
  });

  app.use("/", express.static("public"));
  errorHandler(app);
};
