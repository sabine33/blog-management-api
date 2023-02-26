export const isAuthenticated = (req, res, next) => {
  console.log(req.session.user);
  if (!req.session.user) {
    return res.error({
      message: "You are not authenticated.",
      statusCode: 403,
    });
  }
  return next();
};
