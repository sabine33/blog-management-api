import {
  DynamoDBClient,
  CreateTableCommand,
  PutItemCommand,
  GetItemCommand,
  QueryCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  DynamoDB,
} from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDB({
  region: "us-east-1",
  endpoint: "http://127.0.0.1:8000",
});

const TABLE_NAME = "BlogArticles";

async function createTable(): Promise<void> {
  try {
    const command = new CreateTableCommand({
      TableName: TABLE_NAME,
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "createdAt", AttributeType: "N" },
        { AttributeName: "userId", AttributeType: "N" },
        { AttributeName: "category", AttributeType: "S" },
      ],
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        // { AttributeName: "createdAt", KeyType: "RANGE" },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: "GSI1",
          KeySchema: [
            { AttributeName: "userId", KeyType: "HASH" },
            { AttributeName: "createdAt", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
        {
          IndexName: "GSI2",
          KeySchema: [
            { AttributeName: "category", KeyType: "HASH" },
            { AttributeName: "createdAt", KeyType: "RANGE" },
          ],
          Projection: { ProjectionType: "ALL" },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    });
    await dynamoDBClient.send(command);
    console.log(`Table ${TABLE_NAME} created successfully!`);
  } catch (error) {
    console.error(`Error creating table ${TABLE_NAME}: ${error}`);
  }
}

createTable();
