import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const isEnvFound = dotenv.config();
if (isEnvFound.error) {
  throw new Error("Unable to load .env file");
}

export default {
  PORT: process.env.PORT,
  baseURL: process.env.BASE_URL,
  api: {
    prefix: "",
  },
};
