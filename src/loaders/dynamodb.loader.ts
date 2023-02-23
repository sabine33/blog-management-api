import { DynamoDB } from "@aws-sdk/client-dynamodb";
require("dotenv").config();

const dynamoClient = new DynamoDB({
  region: "us-west-2",
  endpoint: process.env.DYNAMODB_URL,
});

export default dynamoClient;
