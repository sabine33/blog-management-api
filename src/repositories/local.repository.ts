import { IArticleRepository } from "@/interfaces";
import { ArticleType, GetAllResponse } from "@/types";
import { articles as articlesList } from "../constants/articles";
let articles = Object.assign(articlesList);
/**
 * Local repository
 */
class LocalArticleRepository implements IArticleRepository {
  /**
   * Adds new article
   * @param article
   * @returns
   */
  add(article: ArticleType): Promise<ArticleType> {
    article.id = articles.length + 1;
    article.createdAt = Date.now();
    article.updatedAt = Date.now();
    article.userId = 1;

    articles = [...articles, article];
    return new Promise((resolve, reject) => {
      resolve(article);
    });
  }
  updateById(id: string, article: ArticleType): Promise<ArticleType> {
    return new Promise((resolve, reject) => {
      let index = articles.findIndex((article) => article.id === +id);
      console.log(index);

      if (index >= 0) {
        article.updatedAt = Date.now();
        articles[index] = { ...articles[index], ...article };
        console.log(article.title);
        return resolve(article);
      } else reject("No article found for update.");
    });
  }
  getByKey(key: keyof ArticleType, value: any): Promise<ArticleType[]> {
    let articlesList: ArticleType[] = articles.filter(
      (article: ArticleType) => article[key] == value
    );
    return new Promise((resolve, reject) => {
      if (!articlesList || articlesList.length < 1) return resolve([]);
      return resolve(articlesList);
    });
  }
  getByCategory(category: string): Promise<ArticleType[]> {
    return this.getByKey("category", category);
  }

  deleteById(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let index = articles.findIndex(
        (article: ArticleType) => article.id == id
      );
      console.log(index);

      articles.splice(index, 1);
      if (!index || index < 0) {
        reject("No articles found.");
      }
      resolve(true);
    });
  }
  getAll = async (): Promise<ArticleType[]> => {
    return new Promise((resolve, reject) => {
      if (articles.length < 1) reject("Articles list is empty");
      resolve(articles);
    });
  };

  getById = (id: string): Promise<ArticleType> => {
    let article = articles.find((article: ArticleType) => article.id === id);
    return new Promise((resolve, reject) => {
      if (!article) return reject("No article found with given ID");
      return resolve(article);
    });
  };
}
export default new LocalArticleRepository();
