import authController from "@/controllers/auth.controller";
import { isAuthenticated } from "@/middlewares/auth.middleware";

import { Request, Response, Router } from "express";

const router = Router();
export default () => {
  router.get("/github", authController.loginWithGithub);
  router.get("/github/success", authController.onGithubLoginSuccess);
  router.get("/profile", isAuthenticated, authController.getUserProfile);

  return router;
};
