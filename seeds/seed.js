const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const data = process.env.NODE_ENV === "test" ? "testData" : "devData";
const {
  formatTopics,
  formatUsers,
  formatArticles,
  formatComments
} = require("../utils");
const articleData = require(`./${data}/articles.json`);
const commentData = require(`./${data}/comments.json`);
const topicData = require(`./${data}/topics.json`);
const userData = require(`./${data}/users.json`);

//REFACTOR THE ABOVE

module.exports = seedDB = () => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(formatTopics(topicData)),
        User.insertMany(formatUsers(userData))
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      return Promise.all([
        Article.insertMany(formatArticles(articleData, userDocs)),
        topicDocs,
        userDocs
      ]);
    })
    .then(([articleDocs, topicDocs, userDocs]) => {
      return Promise.all([
        Comment.insertMany(formatComments(commentData, articleDocs, userDocs)),
        articleDocs,
        topicDocs,
        userDocs
      ]);
    })
    .catch(console.log);
};
