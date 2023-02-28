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
  getById({ id }: { id: string }): Promise<ArticleType>;
  getByAuthor({ userId }: { userId: number }): Promise<ArticleType[]>;
  getByCategory({ category }: { category: string }): Promise<ArticleType[]>;

  updateById({
    id,
    article,
  }: {
    id: string;
    article: Pick<
      ArticleType,
      | "title"
      | "content"
      | "thumbnailUrl"
      | "updatedAt"
      | "status"
      | "isFeatured"
      | "category"
    >;
  }): Promise<ArticleType>;
  deleteById(id: string): Promise<boolean>;
  add(article: ArticleType): Promise<ArticleType>;
}
export interface IRepository {
  getAll(): Promise<ArticleType[]>;
  getById(id: string): Promise<ArticleType>;
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
  deleteById(id: string): Promise<boolean>;
  getByKey(key: keyof ArticleType, value: any): Promise<ArticleType[]>;
}
export interface IArticleRepository extends IRepository {
  getByCategory(category: string): Promise<ArticleType[]>;
}
