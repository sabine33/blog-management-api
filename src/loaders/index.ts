import dynamoClient from "./dynamodb.loader";
import expressLoader from "./express.loader";

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log("Express loaded...");
};
