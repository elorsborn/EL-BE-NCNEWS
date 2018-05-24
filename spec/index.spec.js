const app = require("../app");
const { expect } = require("chai");
const mongoose = require("mongoose");
const seedDB = require("../seeds/seed.js");
const testData = require("../seeds/testData");
const request = require("supertest")(app);

describe("NORTHCODERS NEWS", () => {
  let topics, users, articles, comments;
  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [topics, users, articles, comments] = docs;
    });
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("/topics", () => {
    it("GET returns 200 and an array of topics", () => {
      return request
        .get("/topics")
        .expect(200)
        .then(res => {
          console.log(res.body);
          expect(res.body.topics.length).to.equal();
        });
    });
  });
});
