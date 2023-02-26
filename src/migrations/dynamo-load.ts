import { articles } from "../constants/articles";
import { ArticleType } from "../types";
import {
  DynamoDBClient,
  DynamoDB,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import uuid4 from "uuid4";
import { marshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDB({
  region: "us-east-1",
  endpoint: "http://127.0.0.1:8000",
});
console.log("Importing articles into DynamoDB. Please wait.");

articles.forEach((article: ArticleType) => {
  const params: PutItemCommandInput = {
    TableName: "BlogArticles",
    Item: marshall({
      id: uuid4(),
      userId: article.userId ?? -1,
      title: article.title ?? "Test title",
      content: article.content ?? "Test Content",
      category: article.category ?? "Test Category",
      thumbnailUrl: article.thumbnailUrl ?? "https://google.com",
      status: article.status || true,
      createdAt: Date.now(),
    }),
  };

  const createArticle = async function () {
    try {
      const results = await client.send(new PutItemCommand(params));
      console.log(results);
    } catch (err) {
      console.error(err);
    }
  };

  createArticle();
});
