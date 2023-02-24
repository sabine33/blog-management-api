import authController from "@/controllers/auth.controller";

import { Request, Response, Router } from "express";

const router = Router();
export default () => {
  router.get("/github", authController.loginWithGithub);
  router.get("/logout", authController.logout);

  router.get("/github/success", authController.onGithubLoginSuccess);
  router.get("/profile", authController.getUserProfile);

  return router;
};
