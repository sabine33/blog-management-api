import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import "./express";

dotenv.config();
const app = express();

app
  .listen(process.env.PORT || 4000, async () => {
    await require("./loaders").default({ expressApp: app });

    console.info(`
      ################################################
      🛡️  Server listening on port: ${process.env.PORT} 🛡️
      ################################################
    `);
  })
  .on("error", async (err) => {
    console.error(err);
    process.exit(1);
  });
