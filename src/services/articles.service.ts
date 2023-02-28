import { IArticleService, IArticleRepository } from "@/interfaces";
import { ArticleType } from "@/types";

export default class ArticleService implements IArticleService {
  private repository: IArticleRepository;
  constructor(repository: IArticleRepository) {
    this.repository = repository;
  }

  listAllArticles = (): Promise<ArticleType[]> => {
    return this.repository.getAll();
  };

  getById = ({ id }: { id: string }): Promise<ArticleType> => {
    return this.repository.getById(id);
  };
  getByAuthor = ({ userId }: { userId: number }): Promise<ArticleType[]> => {
    return this.repository.getByKey("userId", userId);
  };
  getByCategory = ({
    category,
  }: {
    category: string;
  }): Promise<ArticleType[]> => {
    return this.repository.getByCategory(category);
  };

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
  }): Promise<ArticleType> {
    return this.repository.updateById(id, article);
  }
  deleteById = (id: string): Promise<boolean> => {
    return this.repository.deleteById(id);
  };
  add = (article: ArticleType): Promise<ArticleType> => {
    return this.repository.add(article);
  };
}
