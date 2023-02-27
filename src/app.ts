import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cluster from "cluster";
import "./express";
dotenv.config();
const app = express();

//If the cluster is primary/master, fork worker nodes.
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  const numWorkers = require("os").cpus().length;
  for (let i = 0; i < numWorkers; i++) {
    console.log("Forking new worker...");
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} process died with code ${code} and signal ${signal} !`
    );
    console.log("Initiating new worker...");
    cluster.fork();
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
