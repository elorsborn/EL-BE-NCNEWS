const app = require("../app");
const { expect } = require("chai");
const mongoose = require("mongoose");
const seedDB = require("../seeds/seed.js");
const request = require("supertest")(app);

describe("northcoders-news-test", () => {
  let topics, users, articles, comments;
  beforeEach(() => {
    return seedDB().then(docs => {
      [comments, articles, topics, users] = docs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("/", () => {
    it("GET returns 200 and the homepage", () => {
      return request
        .get("/api")
        .expect(200)
        .then(res => {
          expect(res.body.msg).to.equal("WELCOME TO NORTHCODERS NEWS");
        });
    });
    it("GET returns 404 if user types non-existing page on api route", () => {
      return request
        .get("/api/random")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Page Not Found");
        });
    });
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
    it("GET /:topic/articles returns 200 and returns all articles corresponding to that topic", () => {
      return request
        .get(`/api/topics/cats/articles`)
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(2);
          expect(res.body.articles[1].body).to.equal(
            "Bastet walks amongst us, and the cats are taking arms!"
          );
        });
    });
    it("GET /:topic/articles returns 404 should redirect to error page if topic does not exist", () => {
      return request
        .get("/api/topics/dogs/articles")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Page Not Found");
        });
    });
    it("POST /:topic/articles returns 201 and enables the posting of an article on a specific topic", () => {
      return request
        .post("/api/topics/cats/articles")
        .send({ title: "Cats are lame. Dogs rule.", body: "Nuff said" })
        .expect(201)
        .then(res => {
          expect(res.body.article.title).to.equal("Cats are lame. Dogs rule.");
          expect(res.body.article.body).to.equal("Nuff said");
          return request.get("/api/topics/cats/articles");
        })
        .then(res => {
          expect(res.body.articles[2].created_by.username).to.equal(
            "butter_bridge"
          );
          expect(res.body.articles.length).to.equal(3);
        });
    });
    it("POST /:topic/articles returns 400 and error message if user inputs incorrectly", () => {
      return request
        .post("/api/topics/cats/articles")
        .send({ title: "Cats are lame. Dogs rule." })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal("Bad request");
          return request.get("/api/topics/cats/articles");
        });
    });
  });
  describe("/articles", () => {
    it("GET returns 200 and an array of articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.equal(4);
          expect(res.body.articles[0].title).to.equal(
            "Living in the shadow of a great man"
          );
        });
    });
    it("GET /:article_id returns 200 and returns a specific article corresponding to its ID", () => {
      return request
        .get(`/api/articles/${articles[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article.body).to.equal(
            "I find this existence challenging"
          );
        });
    });
    it("GET /:article_id returns 404 and error message when invalid article_id is inputted", () => {
      return request
        .get(`/api/articles/${articles[0]._id} + '10'`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Page Not Found");
        });
    });
    it("PUT /:article_id returns 200 and enables voting on an article", () => {
      return request
        .put(`/api/articles/${articles[2]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body.article.title).to.equal(
            "They're not exactly dogs, are they?"
          );
          expect(res.body.article.votes).to.equal(-1);
        });
    });
    it("GET /:article_id/comments returns 200 and gets all the comments on an article", () => {
      return request
        .get(`/api/articles/${articles[3]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body.comments.length).to.equal(2);
          expect(res.body.comments[0].body).to.equal(
            "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge."
          );
        });
    });
    it("GET /:article_id/comments returns 404 and error message if invalid article_ID is inputted", () => {
      return request
        .get(`/api/articles/${articles[3]._id} + '1' /comments`)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Page Not Found");
        });
    });
    it("POST returns 201 and allows the posting of a comment on a specific article", () => {
      return request
        .post(`/api/articles/${articles[1]._id}/comments`)
        .send({
          body: "Mitch counted to infinity. Twice."
        })
        .expect(201)
        .then(res => {
          expect(res.body.comment.body).to.equal(
            "Mitch counted to infinity. Twice."
          );
          return request.get(`/api/articles/${articles[1]._id}/comments`);
        })
        .then(res => {
          expect(res.body.comments[2].created_by.username).to.equal(
            "butter_bridge"
          );
          expect(res.body.comments.length).to.equal(3);
        });
    });
  });
  describe("/users", () => {
    it("GET /api/users/:username returns 200 and returns the user", () => {
      return request
        .get(`/api/users/${users[0].username}`)
        .expect(200)
        .then(res => {
          expect(res.body.user.username).to.equal("butter_bridge");
        });
    });
    it("GET /api/users/:username returns 404 and error message if invalid username is inputted", () => {
      return request
        .get(`/api/users/${users[0].username}` + "a")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Page Not Found");
        });
    });
  });
  describe("/comments", () => {
    it("PUT /:comment_id returns 200 and enables voting on a comment", () => {
      return request
        .put(`/api/comments/${comments[7]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.comment.body).to.equal(
            "I am 100% sure that we're not completely sure."
          );
          expect(res.body.comment.votes).to.equal(2);
        });
    });
    it("DELETE /:comment_id returns 200 and enables the deletion of a user's comment", () => {
      return request
        .delete(`/api/comments/${comments[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.msg).to.equal("Comment deleted");
          return request.get(`/api/articles/${articles[0]._id}/comments`);
        })
        .then(res => {
          expect(res.body.comments.length).to.equal(1);
        });
    });
  });
});
