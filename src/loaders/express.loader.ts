import bodyParser from "body-parser";
import express, { Request } from "express";
import routes from "@/routes";
import config from "@/config";
require("express-async-errors");
import { errorHandler } from "./error.loader";
const ONE_DAY = 1000 * 60 * 60 * 24;
import cors from "cors";
const session = require("express-session");
const cookieSession = require("cookie-session");
console.log(process.env.FRONTEND_URL);

export default ({ app }: { app: express.Application }) => {
  app.get("/healthcheck", (req, res) => {
    res.status(200).json({ status: true });
  });
  app.set("trust proxy", 1); // trust first prox

  app.use(
    cookieSession({
      name: "session",
      keys: ["key1", "key2"],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
    })
  );

  app.use(cors());
  app.use(
    session({
      secret: "appleball",
      cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 100,
      },
      resave: false,
      saveUninitialized: true,
    })
  );
  // // app.use(proxy("http://127.0.0.1:4000"));

  // app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Credentials", true);
  //   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  //   res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-   Type, Accept, Authorization"
  //   );
  //   next();
  // });
  // app.set("trust proxy", 1);
  // app.use(cors());
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
