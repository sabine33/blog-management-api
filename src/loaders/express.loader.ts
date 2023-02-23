import bodyParser from "body-parser";
import express, { Request } from "express";
import cors from "cors";
import routes from "@/routes";
import config from "@/config";
require("express-async-errors");
import { errorHandler } from "./error.loader";
import sessions from "express-session";
import cookieParser from "cookie-parser";
const ONE_DAY = 1000 * 60 * 60 * 24;

export default ({ app }: { app: express.Application }) => {
  app.get("/healthcheck", (req, res) => {
    res.status(200).json({ status: true });
  });
  app.use(
    sessions({
      secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
      saveUninitialized: true,
      cookie: { maxAge: ONE_DAY },
      resave: true,
    })
  );
  app.use(cookieParser());

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
