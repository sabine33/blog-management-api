import authController from "@/controllers/auth.controller";

import { Request, Response, Router } from "express";

const router = Router();
export default () => {
  router.get("/github", authController.loginWithGithub);
  router.get("/github/success", authController.onGithubLoginSuccess);

  return router;
};
