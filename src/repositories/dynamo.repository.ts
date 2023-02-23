import { IRepository } from "@/interfaces";
import dynamoClient from "@/loaders/dynamodb.loader";
import { ArticleType } from "@/types";

class DynamoDBRepository implements IRepository {
  getAll(): Promise<ArticleType[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: number): Promise<ArticleType> {
    throw new Error("Method not implemented.");
  }
  add(article: ArticleType): Promise<ArticleType[]> {
    throw new Error("Method not implemented.");
  }
  updateById(id: number, article: ArticleType): Promise<ArticleType[]> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: number): Promise<ArticleType> {
    throw new Error("Method not implemented.");
  }
  getByKey(key: string, value: any): Promise<ArticleType[]> {
    throw new Error("Method not implemented.");
  }
}

export default new DynamoDBRepository();
