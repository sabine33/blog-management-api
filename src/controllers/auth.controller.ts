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
    //store it to redis cache and if not found in cache fetch again
    let accessToken = await getAccessTokenFromCode(code);
    if (accessToken) {
      let userProfile = await getGithubUserProfile(accessToken);
      req.session.user = userProfile;
      req.session.code = code;
      req.session.save();
      res.success({
        status: true,
        message: "Github user info fetched successfully.",
        data: userProfile,
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
    let accessToken = await getAccessTokenFromCode(code);
    let userProfile = await getGithubUserProfile(accessToken);
    //set into session
    req.session.user = userProfile;
    req.session.userId = uuid4();
    req.session.save();

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
