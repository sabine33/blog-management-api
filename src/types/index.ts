export type UserType = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type ArticleType = {
  id: string;
  userId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: number;
  updatedAt?: number | null;
  deletedAt?: number | null;
  status: boolean;
  isFeatured?: boolean;
  category?: string;
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

export type GetAllResponse = {
  items: ArticleType[];
  lastEvaluatedKey?: { id: number };
};

export type ResponseType = {
  message: string;
  status?: boolean;
  statusCode?: number;
};
export type ErrorType = ResponseType & {
  errors: any[];
};
export type SuccessType = ResponseType & {
  data: any;
};
