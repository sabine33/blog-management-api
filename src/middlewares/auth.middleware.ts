import { getGithubUserProfile } from "@/helpers";
const jwt = require("jsonwebtoken");

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_TOKEN_KEY;
    console.log(token);
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      } else {
        let { accessToken } = decoded;
        const user = await getGithubUserProfile(accessToken);
        req.user = user;
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  }
};
