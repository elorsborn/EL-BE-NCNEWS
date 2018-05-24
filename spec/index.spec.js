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
          console.log(res.body);
          expect(res.body.topics.length).to.equal(2);
          expect(res.body.topics[0].title).to.equal("Mitch");
        });
    });
  });
});
