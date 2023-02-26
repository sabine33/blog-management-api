import { Request, Response, NextFunction } from "express";
import {
  createGithubLoginQueryString,
  getGithubUserProfile,
  getAccessTokenFromCode,
} from "@/helpers";
import uuid4 from "uuid4";

class AuthController {
  loginWithGithub = async (req: Request, res: Response, next: NextFunction) => {
    const githubRedirectionURL = createGithubLoginQueryString();
    res.redirect(githubRedirectionURL);
  };
  getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    let { code } = req.query;

    if (req.session.user) {
      return res.success({
        status: true,
        message: "Github user info fetched successfully.",
        data: req.session.user,
      });
    }
    //store it to redis cache and if not found in cache fetch again
    let accessToken = await getAccessTokenFromCode(code);
    console.log(accessToken);

    if (accessToken) {
      let user = await getGithubUserProfile(accessToken);
      console.log(user.id);

      req.session.user = { ...user };

      console.log({ accessToken });
      return res.success({
        status: true,
        message: "Github user info zfetched successfully.",
        data: user,
      });
    } else {
      throw new Error("Unable to return profile.");
    }
  };

  onGithubLoginSuccess = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { code } = req.query;

    res.success({
      message: "Github login success.",
      data: {
        code,
      },
    });
  };
  logout = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy("user");
    res.success({
      message: "Logout successful.",
      status: true,
      data: null,
    });
  };
}

export default new AuthController();
