import queryString from "query-string";

export const createGithubLoginURL = () => {
  const params = queryString.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: "http://127.0.0.1:4000/auth/github/success",
    scope: ["read:user", "user:email"].join(" "),
    allow_signup: true,
  });

  const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;
  return githubLoginUrl;
};
