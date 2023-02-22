import { IRepository } from "@/interfaces";
import { ArticleType } from "@/types";

let articlesList: ArticleType[] = [
  {
    id: 1,
    title: "Hello World",
    content: "Hello World details.",
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
    authorId: 1,
  },
  {
    id: 2,
    title: "Hello World 2",
    content: "Hello World details 2.",
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
    authorId: 2,
  },
  {
    id: 2,
    title: "Hello World 3",
    content: "Hello World details 3.",
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
    authorId: 2,
  },
];

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
    articlesList = [...articlesList, article];

    return new Promise((resolve, reject) => {
      resolve(articlesList);
    });
  }
  updateById(id: number, article: ArticleType): Promise<ArticleType[]> {
    let index = articlesList.findIndex((article) => article.id === id);
    articlesList[index] = article;
    return new Promise((resolve, reject) => {
      resolve(articlesList);
    });
  }

  deleteById(id: any): Promise<ArticleType> {
    let index = articlesList.findIndex((article) => article.id === id);
    articlesList = articlesList.splice(index, 1);
    return new Promise((resolve, reject) => {
      if (!articlesList) {
        reject("No articles found.");
      }
      resolve(articlesList[index]);
    });
  }
  getByKey(key: string, value: any): Promise<ArticleType[]> {
    let articles: ArticleType[] = articlesList.filter(
      (article: ArticleType) => article[`${key}`] === value
    );
    return new Promise((resolve, reject) => {
      if (!articles) return reject("No articles found with given key.");
      return resolve(articles);
    });
  }
  getAll = async (): Promise<ArticleType[]> => {
    return new Promise((resolve, reject) => {
      if (articlesList.length < 1) reject("Articles list is empty");
      resolve(articlesList);
    });
  };

  getById = (id: number): Promise<ArticleType> => {
    let article = articlesList.find(
      (article: ArticleType) => article.id === +id
    );
    return new Promise((resolve, reject) => {
      if (!article) return reject("No article found with given ID");
      return resolve(article);
    });
  };
}
export default new LocalRepository();
