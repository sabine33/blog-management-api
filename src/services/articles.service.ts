import { IArticleService, IRepository } from "@/interfaces";
import localRepository from "@/repositories/local.repository";
import { ArticleType } from "@/types";

class ArticleService implements IArticleService {
  private repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }

  listAllArticles = (): Promise<ArticleType[]> => {
    return this.repository.getAll();
  };

  getById = ({ articleId }: { articleId: number }): Promise<ArticleType> => {
    return this.repository.getById(articleId);
  };
  getByAuthor = ({
    authorId,
  }: {
    authorId: number;
  }): Promise<ArticleType[]> => {
    return this.repository.getByKey("authorId", authorId);
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
export default new ArticleService(localRepository);
