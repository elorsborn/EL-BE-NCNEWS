const app = require("../app");
const { expect } = require("chai");
const mongoose = require("mongoose");
const seedDB = require("../seeds/seed.js");
const request = require("supertest")(app);

describe("northcoders-news-test", () => {
  let topics, users, articles, comments;
  beforeEach(() => {
    return seedDB().then(docs => {
      [topics, users, articles, comments] = docs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("/topics", () => {
    it("GET returns 200 and an array of topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics.length).to.equal(2);
          expect(res.body.topics[0].title).to.equal("Mitch");
        });
    });
    it("GET /:topic/articles should return all articles corresponding to that topic", () => {
      return request
        .get("/api/topics/cats/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[1].body).to.equal(
            "Bastet walks amongst us, and the cats are taking arms!"
          );
        });
    });
    it("GET /:topic/articles should redirect to error page if topic does not exist", () => {
      return request
        .get("/api/topics/dogs/articles")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Page Not Found");
        });
    });
    it("POST /:topic/articles should enable a user to post a new article for a specific topic", () => {
      return request
        .post("/api/topics/cats/articles")
        .send({ title: "Cats suck. Dogs rule.", body: "Nuff said" })
        .expect(201)
        .then(res => {
          expect(res.body.article.title).to.equal("Cats suck. Dogs rule.");
          expect(res.body.article.body).to.equal("Nuff said");
          return request.get("/api/topics/cats/articles");
        })
        .then(res => {
          expect(res.body.articles.length).to.equal(3);
        });
    });
  });
});
