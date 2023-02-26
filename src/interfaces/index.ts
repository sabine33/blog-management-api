import { ArticleType, GetAllResponse, UserType } from "@/types";

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
  getByAuthor({ userId }: { userId: number }): Promise<ArticleType[]>;
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
  add(article: ArticleType): Promise<ArticleType>;
  updateById(
    id: string,
    article: Pick<
      ArticleType,
      | "title"
      | "content"
      | "thumbnailUrl"
      | "updatedAt"
      | "status"
      | "isFeatured"
      | "category"
    >
  ): Promise<ArticleType>;
  deleteById(id: number): Promise<void>;
  getByKey(key: keyof ArticleType, value: any): Promise<ArticleType[]>;
}
export interface IArticleRepository extends IRepository {
  getAllByCategory(category: string): Promise<ArticleType[]>;
}
