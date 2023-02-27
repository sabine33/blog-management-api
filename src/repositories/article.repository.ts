import { dynamoItemsToJson } from "@/helpers";
import { IArticleRepository } from "@/interfaces";
import dynamoClient from "@/loaders/dynamodb.loader";
import { ArticleType, GetAllResponse } from "@/types";
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
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { SalesforceCustomKnowledgeArticleTypeName } from "aws-sdk/clients/kendra";
import uuid4 from "uuid4";
const TABLE_NAME = "BlogArticles";

class ArticleRepository implements IArticleRepository {
  async getAll(): Promise<ArticleType[]> {
    try {
      const params = {
        TableName: TABLE_NAME,
      };
      const { Items } = await dynamoClient.send(new ScanCommand(params));
      return dynamoItemsToJson<ArticleType>(Items);
    } catch (ex) {
      throw new Error("Unable to fetch articles.");
    }
  }
  async getById(id: string): Promise<ArticleType> {
    const command = new GetItemCommand({
      TableName: TABLE_NAME,
      Key: {
        id: { S: id },
      },
    });
    const response = await dynamoClient.send(command);
    return response.Item
      ? (unmarshall(response.Item) as ArticleType)
      : undefined;
  }
  async add(
    article: Omit<ArticleType, "id" | "createdAt" | "updatedAt" | "deletedAt">
  ): Promise<ArticleType> {
    const id = uuid4();
    const createdAt = Date.now();
    const item = {
      ...article,
      id,
      createdAt,
      status: true,
    };
    const command = new PutItemCommand({
      TableName: TABLE_NAME,
      Item: marshall(item),
    });
    await dynamoClient.send(command);
    return item;
    w;
  }
  async updateById(
    id: string,
    article: Pick<
      ArticleType,
      | "title"
      | "content"
      | "thumbnailUrl"
      | "updatedAt"
      | "status"
      | "isFeatured"
      | "category"
    >
  ): Promise<ArticleType> {
    const command = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ id }),
      UpdateExpression:
        "SET #title = :title, #content = :content, #thumbnailUrl = :thumbnailUrl, #updatedAt = :updatedAt, #status = :status, #isFeatured = :isFeatured, #category = :category",
      ExpressionAttributeNames: {
        "#title": "title",
        "#content": "content",
        "#thumbnailUrl": "thumbnailUrl",
        "#updatedAt": "updatedAt",
        "#status": "status",
        "#isFeatured": "isFeatured",
        "#category": "category",
      },
      ExpressionAttributeValues: marshall(
        {
          ":title": article.title,
          ":content": article.content,
          ":thumbnailUrl": article.thumbnailUrl ?? "",
          ":status": article.status || true,
          ":updatedAt": Date.now(),
          ":isFeatured": article.isFeatured || false,
          ":category": article.category,
        },
        { removeUndefinedValues: true }
      ),
      ReturnValues: "ALL_NEW",
    });
    const response = await dynamoClient.send(command);
    return unmarshall(response.Attributes!) as ArticleType;
  }
  async deleteById(id: number): Promise<void> {
    try {
      const command = new DeleteItemCommand({
        TableName: TABLE_NAME,
        Key: marshall({ id }),
      });
      await dynamoClient.send(command);
    } catch (error) {
      throw new Error(`Error deleting articles by id: ${error}`);
    }
  }
  async getByKey(
    key: keyof ArticleType,
    value: any,
    limit?: number,
    skip?: number
  ): Promise<ArticleType[]> {
    try {
      const command = new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "#userId = :userId",
        ExpressionAttributeNames: {
          "#userId": "userId",
        },
        ExpressionAttributeValues: marshall({
          ":userId": +value,
        }),
      });
      const { Items } = await dynamoClient.send(command);
      return dynamoItemsToJson<ArticleType>(Items);
    } catch (error) {
      console.error(`Error listing articles by key: ${error}`);
      return [];
    }
  }
  async getByCategory(
    category: string,
    limit: number = 10
  ): Promise<ArticleType[]> {
    try {
      const command = new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "GSI2",
        KeyConditionExpression: "#category = :category",
        ExpressionAttributeNames: {
          "#category": "category",
        },
        ExpressionAttributeValues: marshall({
          ":category": category,
        }),
      });
      const { Items } = await dynamoClient.send(command);
      return dynamoItemsToJson<ArticleType>(Items);
    } catch (ex) {
      console.error(ex);
    }
  }
}

export default new ArticleRepository();
