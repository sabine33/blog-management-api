import { DynamoDB } from "@aws-sdk/client-dynamodb";
require("dotenv").config();

const dynamoClient = new DynamoDB({
  region: "us-east-1",
  endpoint: process.env.DYNAMODB_URL,
});

export default dynamoClient;
