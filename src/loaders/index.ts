import expressLoader from "./express.loader";

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
};
