import {
  DeleteTableCommand,
  DeleteTableCommandInput,
  DynamoDB,
} from "@aws-sdk/client-dynamodb";
const deleteTableParams: DeleteTableCommandInput = {
  TableName: "BlogArticles",
};
const client = new DynamoDB({
  region: "us-east-1",
  endpoint: "http://127.0.0.1:8000",
});

const deleteTables = async function () {
  try {
    const results = await client.send(
      new DeleteTableCommand(deleteTableParams)
    );
    console.log(results);
  } catch (err) {
    console.error(err);
  }
};
deleteTables();
