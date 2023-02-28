import {
  createGithubLoginQueryString,
  getGithubUserProfile,
  getAccessTokenFromCode,
  generateJWTToken,
} from "@/helpers";
import uuid4 from "uuid4";
const jwt = require("jsonwebtoken");

class AuthController {
  loginWithGithub = async (req, res, next) => {
    const githubRedirectionURL = createGithubLoginQueryString();
    res.redirect(githubRedirectionURL);
  };
  getUserProfile = async (req, res, next) => {
    const user = req.user;
    return res.success({ data: user });
  };

  onGithubLoginSuccess = async (req, res, next) => {
    let { code } = req.query;
    let accessToken = await getAccessTokenFromCode(code);
    const jwtToken = generateJWTToken(accessToken);
    const userProfile = await getGithubUserProfile(accessToken);

    res.success({
      message: "Github login success.",
      data: {
        token: jwtToken,
        user: userProfile,
      },
    });
  };
}

export default new AuthController();
