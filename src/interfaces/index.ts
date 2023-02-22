import { ArticleType, UserType } from "@/types";

export interface IUserService {
  getById(int): Promise<UserType>;
  getAllUsers(): Promise<UserType[]>;
}

export interface IAuthService {
  login({ email, password }): Promise<UserType>;
  register({ email, password, fullName }): Promise<UserType>;
}

export interface IArticleService {
  listAllArticles(): Promise<ArticleType[]>;
  getById({ articleId }: { articleId: number }): Promise<ArticleType>;
  getByAuthor({ authorId }: { authorId: number }): Promise<ArticleType[]>;
  updateById({
    id,
    article,
  }: {
    id: number;
    article: ArticleType;
  }): Promise<ArticleType[]>;
  deleteById(id: number): Promise<ArticleType>;
  add(article: ArticleType): Promise<ArticleType[]>;
}
export interface IRepository {
  getAll(): Promise<ArticleType[]>;
  getById(id: number): Promise<ArticleType>;
  add(article: ArticleType): Promise<ArticleType[]>;
  updateById(id: number, article: ArticleType): Promise<ArticleType[]>;
  deleteById(id: number): Promise<ArticleType>;
  getByKey(key: string, value: any): Promise<ArticleType[]>;
}
