import { IArticleService, IArticleRepository } from "@/interfaces";
import dynamoRepository from "@/repositories/article.repository";
import { ArticleType } from "@/types";

class ArticleService {
  private repository: IArticleRepository;
  constructor(repository) {
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

  updateById = ({
    id,
    article,
  }: {
    id: number;
    article: ArticleType;
  }): Promise<ArticleType[]> => {
    return this.repository.updateById(id, article);
  };
  deleteById = (id: number): Promise<ArticleType> => {
    return this.repository.deleteById(id);
  };
  add = (article: ArticleType): Promise<ArticleType[]> => {
    return this.repository.add(article);
  };
}
export default new ArticleService(dynamoRepository);
