import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
  DynamoDB,
  DeleteTableCommand,
  DeleteTableCommandInput,
} from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDB({
  region: "us-west-2",
  endpoint: "http://127.0.0.1:8000",
});

const input: CreateTableCommandInput = {
  TableName: "Articles",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },
    { AttributeName: "title", KeyType: "RANGE" },
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "N" },
    { AttributeName: "title", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

const createTables = async function () {
  try {
    const results = await dynamoClient.send(new CreateTableCommand(input));
    console.log(results);
  } catch (err) {
    console.error(err);
  }
};
const deleteTableParams: DeleteTableCommandInput = {
  TableName: "Articles",
};
const deleteTables = async function () {
  try {
    const results = await dynamoClient.send(
      new DeleteTableCommand(deleteTableParams)
    );
    console.log(results);
  } catch (err) {
    console.error(err);
  }
};

createTables();
// deleteTables();
