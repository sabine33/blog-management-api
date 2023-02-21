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

class LocalRepository implements IRepository {
  add(article: ArticleType): Promise<ArticleType[]> {
    articlesList = [...articlesList, article];
    return new Promise((resolve, reject) => {
      resolve(articlesList);
    });
  }
  updateById(id: number, article: ArticleType): Promise<ArticleType[]> {
    let articlesWithoutCurrent = articlesList.filter(
      (article) => article.id !== id
    );
    articlesList = [...articlesWithoutCurrent, article];
    return new Promise((resolve, reject) => {
      resolve(articlesList);
    });
  }

  deleteById(id: any): Promise<ArticleType> {
    articlesList = articlesList.filter((article) => article.id !== id);
    return new Promise((resolve, reject) => {
      if (!articlesList) {
        reject("No articles found.");
      }
      resolve(null);
    });
  }
  getByAuthor(authorId: number): Promise<ArticleType[]> {
    let articles: ArticleType[] = articlesList.filter(
      (article: ArticleType) => article.authorId === +authorId
    );
    return new Promise((resolve, reject) => {
      if (!articles) return reject("No article found with given author ID.");
      return resolve(articles);
    });
  }
  getAll = async (): Promise<ArticleType[]> => {
    return new Promise((resolve, reject) => {
      if (articlesList.length > 0) {
        resolve(articlesList);
      } else {
        reject("Articles list is empty.");
      }
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
