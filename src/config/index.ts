require("dotenv").config();

export default {
  PORT: process.env.PORT,
  baseURL: process.env.BASE_URL,
  api: {
    prefix: "",
  },
};
