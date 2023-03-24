import { articles } from "@/constants/articles";
import ArticlesController from "@/controllers/articles.controller";
import { CustomError } from "@/error";
import localRepository from "@/repositories/local.repository";
import ArticleService from "@/services/articles.service";
import { ArticleType } from "@/types";
import sinon from "sinon";
const assert = require("assert");
import * as redisMiddleware from "@/middlewares/redis.middleware";

//paths

const articleService = new ArticleService(localRepository);
const controller = new ArticlesController(articleService);

describe("ArticlesController", function () {
  describe("#index()", function () {
    it("should return a success response with a list of articles", async function () {
      const storeToCacheStub = sinon
        .stub(redisMiddleware, "storeToCache")
        .resolves(true);

      const res = {
        status: sinon.stub().returnsThis(),
        success: sinon.stub(),
      } as any;

      const req = { originalUrl: "/articles" };

      let listAllArticlesStub = sinon
        .stub(articleService, "listAllArticles")
        .resolves(articles);

      await controller.index(req, res);

      sinon.assert.calledOnce(storeToCacheStub);
      assert.deepEqual(res.success.firstCall.args[0].data, articles);
      assert.equal(
        res.success.firstCall.args[0].message,
        "List of articles loaded successfully."
      );

      listAllArticlesStub.restore();
    });

    it("should throw an error if unable to fetch articles", async function () {
      const error = new Error("Unable to fetch articles");
      const storeToCacheStub = sinon.stub();
      const res = {
        success: sinon.stub(),
      };

      let stubbed = sinon
        .stub(articleService, "listAllArticles")
        .rejects(error);

      const req = { originalUrl: "/articles" };

      try {
        await controller.index(req, res);
      } catch (ex) {
        assert.strictEqual(
          ex.message,
          "Unable to fetch articles:Unable to fetch articles"
        );
        
        assert.strictEqual(ex.status, false);
        assert.strictEqual(ex.statusCode, 403);
      }

      sinon.assert.notCalled(res.success);
      sinon.assert.notCalled(storeToCacheStub);

      stubbed.restore();
    });
  });
  describe("#getById()", function () {
    it("should return a article given an ID", async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        success: sinon.stub(),
      } as any;
      const req = {
        params: {
          id: "1",
        },
      };
      let expectedArticle = articles.find((item) => item.id == "1");

      let getByIdStub = sinon
        .stub(articleService, "getById")
        .resolves(expectedArticle);
      await controller.getById(req, res);

      assert.deepEqual(res.success.firstCall.args[0].data, expectedArticle);
      assert.equal(
        res.success.firstCall.args[0].message,
        "Particular article loaded successfully."
      );

      getByIdStub.restore();
    });
    it("should throw an error given an invalid ID", async function () {
      const error = new CustomError({
        message: "Article with given ID not found.",
        statusCode: 404,
        status: false,
      });

      const storeToCacheStub = sinon.stub();
      const res = {
        success: sinon.stub(),
        error: sinon.stub(),
      };

      let stubbed = sinon.stub(articleService, "getById").rejects(error);

      const req = {
        params: {
          id: "111",
        },
      };
      try {
        await controller.getById(req, res);
      } catch (ex) {
        assert.strictEqual(ex.message, "Article with given ID not found.");
        assert.strictEqual(ex.status, false);
        assert.strictEqual(ex.statusCode, 404);
      }

      sinon.assert.notCalled(res.success);
      sinon.assert.notCalled(storeToCacheStub);

      stubbed.restore();
    });
  });
  describe("#getByKey()", function () {
    it("should return a articles given an key", async function () {
      const res = {
        status: sinon.stub().returnsThis(),
        success: sinon.stub(),
      } as any;
      const req = {
        params: {
          category: "world",
        },
      };
      let expectedArticles = articles.filter(
        (item) => item.category == "world"
      );

      let getByKeyStub = sinon
        .stub(articleService, "getByCategory")
        .resolves(expectedArticles);
      await controller.getByCategory(req, res);

      sinon.assert.calledWithExactly(getByKeyStub, { category: "world" });
      assert.deepEqual(res.success.firstCall.args[0].data, expectedArticles);
      assert.equal(
        res.success.firstCall.args[0].message,
        "Articles loaded successfully."
      );

      getByKeyStub.restore();
    });
  });
});
