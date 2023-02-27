import { DynamoDB } from "@aws-sdk/client-dynamodb";
require("dotenv").config();
const dynamoClient = new DynamoDB({
  region: "us-east-1",
  endpoint: process.env.DYNAMODB_URL,
});
//sort of health check to get started
dynamoClient
  .describeTable({ TableName: "BlogArticles" })
  .then(() => {
    console.log("Connected to DynamoDB");
  })
  .catch((error) => {
    console.error(`Unable to connect to DynamoDB: ${error.message}`);
    process.exit(1);
  });

export default dynamoClient;
