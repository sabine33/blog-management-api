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
  listById({ articleId }: { articleId: number }): Promise<ArticleType>;
  listByAuthor({ authorId }: { authorId: number }): Promise<ArticleType>;
}
