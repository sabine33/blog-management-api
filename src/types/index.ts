export type UserType = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type ArticleType = {
  id: number;
  title: string;
  authorId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type LoginDTO = {
  email: string;
  password: string;
};
export type SignupDTO = {
  email: string;
  password: string;
  fullName: string;
};

export type DynamoDBParams = {
  TableName: string;
  Item: any;
};
