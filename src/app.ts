import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cluster from "cluster";
dotenv.config();
import customExpress from "./customExpress";
const app = express();
// const numWorkers = require("os").cpus().length;
const WORKER_COUNT = 1;
const customExpressResponse = Object.create(app.response, customExpress);
app.response = Object.create(customExpressResponse);

//If the cluster is primary/master, fork worker nodes.
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < WORKER_COUNT; i++) {
    console.log("Forking new worker...");
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} process died with code ${code} and signal ${signal} !`
    );
    // console.log("Initiating new worker...");
    // cluster.fork();
  });
} else {
  // If the node is worker : run the app instance.
  app.listen(process.env.PORT || 4000, async () => {
    await require("./loaders").default({ expressApp: app });

    console.info(`
      ################################################
      🛡️  Server listening on port: ${process.env.PORT} 🛡️
      ################################################
    `);
    console.log(`Worker ${process.pid} started`);
  });
}

export default app;
