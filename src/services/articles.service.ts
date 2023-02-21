import { IArticleService } from "@/interfaces";
import { ArticleType } from "@/types";

class ArticleService implements IArticleService {
  constructor() {}
  listAllArticles(): Promise<ArticleType[]> {
    throw new Error("Method not implemented.");
  }
  listById({ articleId }: { articleId: number }): Promise<ArticleType> {
    throw new Error("Method not implemented.");
  }
  listByAuthor({ authorId }: { authorId: number }): Promise<ArticleType> {
    throw new Error("Method not implemented.");
  }
}
export default new ArticleService();
