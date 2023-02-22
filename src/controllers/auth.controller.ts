import { Request, Response, NextFunction } from "express";

class AuthController {
  loginWithGithub = async (req: Request, res: Response, next: NextFunction) => {
    res.redi({ message: "Github login route.", data: null });
  };

  onGithubLoginSuccess = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.success({ message: "Github login success.", data: null });
  };
}

export default new AuthController();
