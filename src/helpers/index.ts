const queryString = require("node:querystring");
import axios from "axios";
const jwt = require("jsonwebtoken");

import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
  ScanCommandOutput,
  AttributeValue,
  PutItemCommandOutput,
  PutItemCommandInput,
  PutItemCommand,
  GetItemCommandInput,
  GetItemCommand,
  GetItemCommandOutput,
} from "@aws-sdk/client-dynamodb";
const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_FETCH_URL = "https://api.github.com/user";
export const createGithubLoginQueryString = () => {
  const params = queryString.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URL,
    scope: ["read:user", "user:email"].join(" "), // space seperated string
    allow_signup: true,
  });
  const githubLoginUrl = `${GITHUB_OAUTH_URL}?${params}`;
  return githubLoginUrl;
};

export const getAccessTokenFromCode = async (code) => {
  const { data } = await axios({
    url: GITHUB_ACCESS_TOKEN_URL,
    method: "get",
    params: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: process.env.GITHUB_REDIRECT_URL,
      code,
    },
  });
  console.log(code);

  const parsedData = queryString.parse(data);
  console.log(parsedData); // { token_type, access_token, error, error_description }
  if (parsedData.error) throw new Error(parsedData.error_description);
  return parsedData.access_token;
};

export const getGithubUserProfile = async (accessToken: string) => {
  const { data } = await axios({
    url: GITHUB_USER_FETCH_URL,
    method: "get",
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  // console.log(data); // { id, email, name, login, avatar_url }
  return data;
};

export const dynamoItemToJson = <T>(
  dynamoItem: Record<string, AttributeValue>
): T => {
  return unmarshall(dynamoItem) as T;
};

export const dynamoItemsToJson = <T>(
  dynamoItems: Record<string, AttributeValue>[]
): T[] => {
  return dynamoItems.map((item) => dynamoItemToJson(item));
};

export const generateJWTToken = (accessToken: string) => {
  const payload = { accessToken };
  const secretKey = process.env.JWT_TOKEN_KEY;
  const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "1h" };
  const token = jwt.sign(payload, secretKey, options);
  console.log(token);
  return token;
};
