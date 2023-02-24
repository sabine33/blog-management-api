import { articles as articlesList } from "@/constants/articles";
import { IRepository } from "@/interfaces";
import { ArticleType } from "@/types";

let articles = Object.assign(articlesList);
/**
 * Local repository
 */
class LocalRepository implements IRepository {
  /**
   * Adds new article
   * @param article
   * @returns
   */
  add(article: ArticleType): Promise<ArticleType[]> {
    article.id = articles.length + 1;
    article.createdAt = new Date();
    article.updatedAt = new Date();
    article.userId = 1;

    articles = [...articles, article];
    return new Promise((resolve, reject) => {
      resolve(articles);
    });
  }
  updateById(id: number, article: ArticleType): Promise<ArticleType[]> {
    return new Promise((resolve, reject) => {
      let index = articles.findIndex((article) => article.id === +id);
      console.log(index);

      if (index >= 0) {
        article.updatedAt = new Date();
        articles[index] = { ...articles[index], ...article };
        console.log(article.title);
        return resolve(articles);
      } else reject("No article found for update.");
    });
  }

  deleteById(id: number): Promise<ArticleType> {
    return new Promise((resolve, reject) => {
      let index = articles.findIndex(
        (article: ArticleType) => article.id == id
      );
      console.log(index);

      articles.splice(index, 1);
      if (!index || index < 0) {
        reject("No articles found.");
      }
      resolve(articles);
    });
  }
  getByKey(key: string, value: any): Promise<ArticleType[]> {
    let articlesList: ArticleType[] = articles.filter(
      (article: ArticleType) => article[key] == value
    );
    return new Promise((resolve, reject) => {
      if (!articlesList || articlesList.length < 1)
        return reject("No articles found with given key.");
      return resolve(articlesList);
    });
  }
  getAll = async (): Promise<ArticleType[]> => {
    return new Promise((resolve, reject) => {
      if (articles.length < 1) reject("Articles list is empty");
      resolve(articles);
    });
  };

  getById = (id: number): Promise<ArticleType> => {
    let article = articles.find((article: ArticleType) => article.id === +id);
    return new Promise((resolve, reject) => {
      if (!article) return reject("No article found with given ID");
      return resolve(article);
    });
  };
}
export default new LocalRepository();
